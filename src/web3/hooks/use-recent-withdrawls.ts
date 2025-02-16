import { useQuery } from "@tanstack/react-query";
import { findJarPDA, findWithdrawlPDA } from "@/web3/pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarBase } from "../soljar-base-provider";
import { useSoljarAuth } from "../soljar-auth-provider";

export interface Withdrawl {
  jar: PublicKey;
  amount: number;
  createdAt: number;
  updatedAt: number;
}

export function useRecentWithdrawls(limit = 5) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  return useQuery({
    queryKey: ["recent-withdrawals", userPublicKey?.toString()],
    queryFn: async () => {
      if (!program || !userPublicKey) return [];

      try {
        const jarPda = findJarPDA(program, userPublicKey);
        const jar = await program.account.jar.fetch(jarPda);
        const totalWithdrawls = jar.withdrawlCount;

        if (totalWithdrawls === 0) return [];

        const withdrawlsToFetch = Math.min(limit, totalWithdrawls);
        const withdrawls = [];

        for (let i = 0; i < withdrawlsToFetch; i++) {
          try {
            const withdrawlIndex = totalWithdrawls - 1 - i;
            const withdrawlPda = findWithdrawlPDA(
              program,
              jarPda,
              withdrawlIndex
            );
            const withdrawl = await program.account.withdrawl.fetch(
              withdrawlPda
            );
            withdrawls.push({
              ...withdrawl,
              amount: withdrawl.amount.toNumber() / 1e9,
              createdAt: withdrawl.createdAt.toNumber(),
            });
          } catch (withdrawlError) {
            console.warn(
              `Skipping withdrawl ${i}: ${
                withdrawlError instanceof Error
                  ? withdrawlError.message
                  : "Unknown error"
              }`
            );
            continue;
          }
        }

        return withdrawls.sort((a, b) => b.createdAt - a.createdAt);
      } catch (error) {
        console.error("Error fetching recent withdrawls:", error);
        return [];
      }
    },
    enabled: Boolean(program && userPublicKey),
  });
}
