import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findJarPDA, findSupporterIndexPDA, findUserPDA } from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

export interface TipInfo {
  currency: string;
  amount: number;
}

export interface Supporter {
  signer: PublicKey;
  jar: PublicKey;
  tips: TipInfo[];
  tipCount: number;
  createdAt: number;
  updatedAt: number;
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
      const jarPda = findJarPDA(program, userPublicKey!);

      // Fetch the jar account to get total supporters
      const jar = await program.account.jar.fetch(jarPda);
      const totalPages = jar.supporterIndex + 1; // Add 1 since supporterIndex is zero-based

      // Calculate the page number from the end (reverse order)
      const reversedPageParam = totalPages - pageParam - 1;

      // Skip if we're trying to fetch a non-existent page
      if (reversedPageParam < 0 || reversedPageParam >= totalPages) {
        return {
          supporters: [],
          totalPages,
          totalSupporters: jar.supporterCount,
          currentPage: pageParam,
        };
      }

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

      // Format the supporter data
      const formattedSupporters = supporters.map((supporter: any) => ({
        signer: supporter.signer,
        jar: supporter.jar,
        tips: supporter.tips.map((tip: any) => ({
          currency: tip.currency,
          amount: tip.amount.toNumber() / 1e9, // Convert from lamports
        })),
        tipCount: supporter.tipCount,
        createdAt: supporter.createdAt.toNumber(),
        updatedAt: supporter.updatedAt.toNumber(),
      }));

      return {
        supporters: formattedSupporters,
        totalPages,
        totalSupporters: jar.supporterCount,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) => {
      if (
        !lastPage?.currentPage ||
        lastPage.currentPage >= Math.max(0, lastPage.totalPages - 1)
      ) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    initialPageParam: initialPage,
  });

  // Flatten the pages and maintain reverse chronological order
  const supporters = data?.pages.flatMap((page) => page.supporters) ?? [];
  const totalSupporters = data?.pages[0]?.totalSupporters ?? 0;

  return {
    data: { supporters, totalSupporters },
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isLoading,
  };
}
