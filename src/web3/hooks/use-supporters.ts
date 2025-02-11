import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import {
  findIndexPDA,
  findJarPDA,
  findSupporterIndexPDA,
  findUserPDA,
} from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

interface Supporter {
  signer: PublicKey;
  jar: PublicKey;
  mint: PublicKey;
  tipLink: PublicKey;
  amount: number;
  createdAt: number;
  updatedAt: number;
  tipCount: number;
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
      const userPda = findUserPDA(program, userPublicKey);
      const jarPda = findJarPDA(program, userPda);
      const indexPda = findIndexPDA(program, jarPda);

      // Fetch the index account to get total supporters and current page
      const index = await program.account.index.fetch(indexPda);
      const totalPages = Math.ceil(index.totalSupporters / 50);

      // Fetch supporter index for the requested page
      const supporterIndexPda = findSupporterIndexPDA(
        program,
        indexPda,
        pageParam
      );
      const supporterIndex = await program.account.supporterIndex.fetch(
        supporterIndexPda
      );

      // Fetch all supporters from the current page
      const supporterPromises = supporterIndex.supporters
        .slice(0, supporterIndex.totalItems)
        .map((pubkey: PublicKey) => program.account.supporter.fetch(pubkey));

      const supporters = await Promise.all(supporterPromises);

      // Format the supporter data
      const formattedSupporters = supporters.map((supporter: any) => ({
        signer: supporter.signer,
        jar: supporter.jar,
        mint: supporter.mint,
        tipLink: supporter.tipLink,
        amount: supporter.amount.toNumber() / 1e9, // Convert from lamports
        createdAt: supporter.createdAt.toNumber(),
        updatedAt: supporter.updatedAt.toNumber(),
        tipCount: supporter.tipCount,
      }));

      return {
        supporters: formattedSupporters,
        totalPages,
        totalSupporters: index.totalSupporters,
        currentPage: pageParam,
      };
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

  // Flatten the pages
  const supporters = data?.pages.flatMap((page) => page.supporters) ?? [];
  const totalSupporters = data?.pages[0]?.totalSupporters ?? 0;

  return {
    data: { supporters, totalSupporters },
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isLoading,
  };
}
