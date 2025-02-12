import { useQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import {
  findDepositIndexPDA,
  findIndexPDA,
  findJarPDA,
  findUserPDA,
} from "@/web3/pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";
interface Deposit {
  signer: PublicKey;
  jar: PublicKey;
  meta: PublicKey;
  tipLink: PublicKey;
  currencyMint: PublicKey;
  amount: number;
  createdAt: number;
  updatedAt: number;
}

export function useRecentDeposits(limit = 5) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  return useQuery({
    queryKey: ["recent-deposits", userPublicKey?.toString()],
    queryFn: async () => {
      if (!program || !userPublicKey) return [];

      // Get PDAs
      const userPda = findUserPDA(program, userPublicKey);
      const jarPda = findJarPDA(program, userPda);
      const indexPda = findIndexPDA(program, jarPda);

      // Fetch the index account
      const index = await program.account.index.fetch(indexPda);
      const currentPage = index.depositIndexPage;

      // Determine which pages to fetch
      const pagesToFetch =
        currentPage === 0 ? [0] : [currentPage, currentPage - 1];

      // Fetch deposit index pages
      const depositIndexPromises = pagesToFetch.map(async (page) => {
        const depositIndexPda = findDepositIndexPDA(program, indexPda, page);
        return program.account.depositIndex.fetch(depositIndexPda);
      });

      const depositIndexPages = await Promise.all(depositIndexPromises);

      // Collect all deposit pubkeys from the pages
      const allDepositPubkeys = depositIndexPages.flatMap((page) =>
        page.deposits.slice(0, page.totalItems)
      );

      // Sort by newest first and limit
      const recentDepositPubkeys = allDepositPubkeys.slice(0, limit);

      // Fetch actual deposits
      const depositPromises = recentDepositPubkeys.map((pubkey) =>
        program.account.deposit.fetch(pubkey)
      );

      const deposits = await Promise.all(depositPromises);

      // Sort by creation time, newest first
      return deposits
        .map((deposit) => ({
          ...deposit,
          amount: deposit.amount.toNumber() / 1e9, // Convert from lamports/smallest unit
          createdAt: deposit.createdAt.toNumber(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);
    },
    enabled: Boolean(program && userPublicKey),
  });
}
