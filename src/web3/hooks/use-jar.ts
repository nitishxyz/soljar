import { useQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findUserPDA, findJarPDA } from "../pda-helper";
import { useSoljarAuth } from "../soljar-auth-provider";

export const useJar = () => {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  const { data: jar, isLoading: isJarLoading } = useQuery({
    queryKey: ["soljar", "jar"],
    queryFn: async () => {
      if (!program || !userPublicKey) return null;

      try {
        const jarPDA = findJarPDA(program, userPublicKey);

        const jar = await program.account.jar.fetch(jarPDA);

        return {
          totalDeposits: jar.depositCount,
          totalWithdrawls: jar.withdrawlCount,
          totalSupporters: jar.supporterCount,
        };
      } catch (error) {
        console.error("Error fetching jar:", error);
        return null;
      }
    },
    enabled: !!program && !!userPublicKey,
  });

  return {
    jar,
    isJarLoading,
  };
};
