import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findJarPDA, findSupporterIndexPDA, findUserPDA } from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

export interface TipInfo {
  currency: number;
  amount: number;
}

export interface Supporter {
  signer: PublicKey;
  jar: PublicKey;
  tips: TipInfo[];
  tipCount: number;
  createdAt: number;
}

export function useSupporters(initialPage = 0) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["supporters", userPublicKey?.toString()],
    queryFn: async ({ pageParam = initialPage }) => {
      if (!program || !userPublicKey)
        return { supporters: [], totalPages: 0, totalSupporters: 0 };

      // Get necessary PDAs
      const jarPda = findJarPDA(program, userPublicKey);
      const jar = await program.account.jar.fetch(jarPda);

      // Fetch the index account to get total supporters and current page

      const totalPages = Math.ceil(jar.supporterCount / 50);

      // Calculate the page number from the end (reverse order)
      const reversedPageParam = totalPages - 1 - pageParam;

      // Fetch supporter index for the requested page
      const supporterIndexPda = findSupporterIndexPDA(
        program,
        jarPda,
        reversedPageParam
      );

      const supporterIndex = await program.account.supporterIndex.fetch(
        supporterIndexPda
      );

      // Fetch all supporters from the current page
      const supporterPromises = supporterIndex.supporters
        .slice(0, supporterIndex.totalItems)
        .reverse() // Reverse the array to get newest first
        .map((pubkey: PublicKey) => program.account.supporter.fetch(pubkey));

      const supporters = await Promise.all(supporterPromises);

      try {
        const formattedSupporters = supporters.map((supporter: any) => {
          return {
            signer: supporter.signer,
            jar: supporter.jar,
            tips: supporter.tips.map((tip: any) => ({
              currency: tip.currency,
              amount: tip.amount.toNumber() / 1e9,
            })),
            tipCount: supporter.tipCount,
            createdAt: supporter.createdAt.toNumber(),
          };
        });
        console.log("Formatted supporters:", formattedSupporters);
        return {
          supporters: formattedSupporters,
          totalPages,
          currentPage: pageParam,
          hasMore: pageParam < totalPages - 1,
        };
      } catch (error) {
        console.error("Error formatting supporters:", error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (
        !lastPage?.currentPage ||
        lastPage.currentPage >= lastPage.totalPages - 1
      ) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    initialPageParam: initialPage,
  });

  // Flatten the pages and maintain reverse chronological order
  const supporters = data?.pages.flatMap((page) => page.supporters) ?? [];

  return {
    data: { supporters },
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isLoading,
  };
}
