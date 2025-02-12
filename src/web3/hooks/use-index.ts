import { useQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findIndexPDA, findUserPDA, findJarPDA } from "../pda-helper";
import { useSoljarAuth } from "../soljar-auth-provider";

export const useIndex = () => {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  const { data: index, isLoading: isIndexLoading } = useQuery({
    queryKey: ["soljar", "index"],
    queryFn: async () => {
      if (!program || !userPublicKey) return null;

      try {
        const userPDA = findUserPDA(program, userPublicKey);
        const jarPDA = findJarPDA(program, userPDA);
        const indexPDA = findIndexPDA(program, jarPDA);

        const index = await program.account.index.fetch(indexPDA);

        return {
          totalDeposits: index.totalDeposits,
          totalWithdrawals: index.totalWithdrawls, // Note: matches typo in Rust
          totalSupporters: index.totalSupporters,
        };
      } catch (error) {
        console.error("Error fetching index:", error);
        return null;
      }
    },
    enabled: !!program && !!userPublicKey,
  });

  return {
    index,
    isIndexLoading,
  };
};
