import { useQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findDepositPDA, findJarPDA, findUserPDA } from "@/web3/pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";
interface Deposit {
  id: string;
  signer: PublicKey;
  tipLink: PublicKey;
  currency: number;
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

      try {
        const jarPda = findJarPDA(program, userPublicKey);
        const jar = await program.account.jar.fetch(jarPda);
        const totalDeposits = jar.depositCount;

        if (totalDeposits === 0) return [];

        const depositsToFetch = Math.min(limit, totalDeposits);
        const deposits = [];

        for (let i = 0; i < depositsToFetch; i++) {
          try {
            const depositIndex = totalDeposits - 1 - i;
            console.log(depositIndex);
            const depositPda = findDepositPDA(program, jarPda, depositIndex);
            const deposit = await program.account.deposit.fetch(depositPda);
            deposits.push({
              ...deposit,
              id: depositPda.toBase58(),
              amount: deposit.amount.toNumber(),
              createdAt: deposit.createdAt.toNumber(),
            });
          } catch (depositError) {
            console.warn(
              `Skipping deposit ${i}: ${
                depositError instanceof Error
                  ? depositError.message
                  : "Unknown error"
              }`
            );
            continue;
          }
        }

        return deposits.sort((a, b) => b.createdAt - a.createdAt);
      } catch (error) {
        console.error("Error fetching recent deposits:", error);
        return [];
      }
    },
    enabled: Boolean(program && userPublicKey),
  });
}
