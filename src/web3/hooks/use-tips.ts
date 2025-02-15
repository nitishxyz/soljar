import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import {
  findDepositIndexPDA,
  findIndexPDA,
  findJarPDA,
  findUserPDA,
} from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";
import { getCurrencyFromMint } from "../utils";

interface Tip {
  signer: PublicKey;
  tipLink: PublicKey;
  currency: string;
  amount: number;
  createdAt: number;
  referrer: string;
  memo: string;
}

export function useTips(initialPage = 0) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["tips", userPublicKey?.toString()],
    queryFn: async ({ pageParam = initialPage }) => {
      if (!program || !userPublicKey)
        return { tips: [], totalPages: 0, totalTips: 0 };

      // Get necessary PDAs
      const userPda = findUserPDA(program, userPublicKey);
      const jarPda = findJarPDA(program, userPda);
      const indexPda = findIndexPDA(program, jarPda);

      // Fetch the index account to get total deposits and current page
      const index = await program.account.index.fetch(indexPda);
      const totalPages = Math.ceil(index.totalDeposits / 50);

      // Calculate the page number from the end (reverse order)
      const reversedPageParam = totalPages - 1 - pageParam;

      // Fetch deposit index for the requested page
      const depositIndexPda = findDepositIndexPDA(
        program,
        indexPda,
        reversedPageParam
      );
      const depositIndex = await program.account.depositIndex.fetch(
        depositIndexPda
      );

      // Fetch all deposits and their meta data from the current page
      const tipPromises = depositIndex.deposits
        .slice(0, depositIndex.totalItems)
        .reverse() // Reverse the array to get newest first
        .map(async (pubkey: PublicKey) => {
          const deposit = await program.account.deposit.fetch(pubkey);
          return { ...deposit };
        });

      const tips = await Promise.all(tipPromises);

      // Format the tip data
      const formattedTips = tips.map((tip: any) => ({
        signer: tip.signer,
        tipLink: tip.tipLink,
        currency: tip.currency,
        amount: tip.amount.toNumber(),
        createdAt: tip.createdAt.toNumber(),
        referrer: tip.referrer,
        memo: tip.memo,
      }));

      return {
        tips: formattedTips,
        totalPages,
        totalTips: index.totalDeposits,
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

  // Flatten the pages and maintain reverse chronological order
  const tips = data?.pages.flatMap((page) => page.tips) ?? [];
  const totalTips = data?.pages[0]?.totalTips ?? 0;

  return {
    data: { tips, totalTips },
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isLoading,
  };
}
