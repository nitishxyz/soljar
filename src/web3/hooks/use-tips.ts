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
  jar: PublicKey;
  meta: PublicKey;
  tipLink: PublicKey;
  currencyMint: PublicKey;
  amount: number;
  createdAt: number;
  updatedAt: number;
  meta_data?: {
    referrer: string;
    memo: string;
  };
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

      // Fetch deposit index for the requested page
      const depositIndexPda = findDepositIndexPDA(program, indexPda, pageParam);
      const depositIndex = await program.account.depositIndex.fetch(
        depositIndexPda
      );

      // Fetch all deposits and their meta data from the current page
      const tipPromises = depositIndex.deposits
        .slice(0, depositIndex.totalItems)
        .map(async (pubkey: PublicKey) => {
          const deposit = await program.account.deposit.fetch(pubkey);
          let meta_data;
          try {
            meta_data = await program.account.meta.fetch(deposit.meta);
          } catch (error) {
            console.error("Error fetching meta data:", error);
          }
          return { ...deposit, meta_data };
        });

      const tips = await Promise.all(tipPromises);

      // Format the tip data
      const formattedTips = tips.map((tip: any) => ({
        signer: tip.signer,
        jar: tip.jar,
        meta: tip.meta,
        tipLink: tip.tipLink,
        currencyMint: tip.currencyMint,
        amount: tip.amount.toNumber() / 1e9, // Convert from lamports
        createdAt: tip.createdAt.toNumber(),
        updatedAt: tip.updatedAt.toNumber(),
        meta_data: tip.meta_data
          ? {
              referrer: tip.meta_data.referrer,
              memo: tip.meta_data.memo,
            }
          : undefined,
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

  // Flatten the pages
  const tips = data?.pages.flatMap((page) => page.tips) ?? [];
  const totalTips = data?.pages[0]?.totalTips ?? 0;

  return {
    data: { tips, totalTips },
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isLoading,
  };
}
