import { useQuery } from "@tanstack/react-query";
import {
  findWithdrawlIndexPDA,
  findIndexPDA,
  findJarPDA,
  findUserPDA,
} from "@/web3/pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarBase } from "../soljar-base-provider";
import { useSoljarAuth } from "../soljar-auth-provider";

export interface Withdrawal {
  jar: PublicKey;
  amount: number;
  createdAt: number;
  updatedAt: number;
}

export function useRecentWithdrawals(limit = 5) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  return useQuery({
    queryKey: ["recent-withdrawals", userPublicKey?.toString()],
    queryFn: async () => {
      if (!program || !userPublicKey) return [];

      // Get PDAs
      const userPda = findUserPDA(program, userPublicKey);
      const jarPda = findJarPDA(program, userPda);
      const indexPda = findIndexPDA(program, jarPda);

      // Fetch the index account
      const index = await program.account.index.fetch(indexPda);
      const currentPage = index.withdrawlIndexPage;

      // Determine which pages to fetch
      const pagesToFetch =
        currentPage === 0 ? [0] : [currentPage, currentPage - 1];

      // Fetch withdrawal index pages
      const withdrawalIndexPromises = pagesToFetch.map(async (page) => {
        const withdrawalIndexPda = findWithdrawlIndexPDA(
          program,
          indexPda,
          page
        );
        return program.account.withdrawlIndex.fetch(withdrawalIndexPda);
      });

      const withdrawalIndexPages = await Promise.all(withdrawalIndexPromises);

      // Collect all withdrawal pubkeys from the pages
      const allWithdrawalPubkeys = withdrawalIndexPages.flatMap((page) =>
        page.withdrawls.slice(0, page.totalItems)
      );

      // Fetch actual withdrawals for all pubkeys
      const withdrawalPromises = allWithdrawalPubkeys.map((pubkey) =>
        program.account.withdrawl.fetch(pubkey)
      );

      const withdrawals = await Promise.all(withdrawalPromises);

      // Sort by creation time, newest first, then limit
      return withdrawals
        .map((withdrawal) => ({
          ...withdrawal,
          amount: withdrawal.amount.toNumber() / 1e9, // Convert from lamports/smallest unit
          createdAt: withdrawal.createdAt.toNumber(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, limit);
    },
    enabled: Boolean(program && userPublicKey),
  });
}
