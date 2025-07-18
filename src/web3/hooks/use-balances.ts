import { useQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";

import { PublicKey } from "@solana/web3.js";
import { findJarPDA, findUserPDA } from "../pda-helper";
import { useSoljarAuth } from "../soljar-auth-provider";
// Common token mint addresses for devnet/mainnet
const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // Mainnet USDC
const USDT_MINT = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"); // Mainnet USDT

export const useBalances = () => {
  const { program, connection } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  const jarPda = findJarPDA(program, userPublicKey!);

  const { data: solBalance, isLoading: isSolLoading } = useQuery({
    queryKey: ["balance", "sol", jarPda?.toString()],
    queryFn: async () => {
      if (!jarPda) return 0;
      const balance = await connection.getBalance(jarPda);
      return balance / 10 ** 9; // Convert lamports to SOL
    },
    enabled: !!jarPda,
  });

  const { data: usdcBalance, isLoading: isUsdcLoading } = useQuery({
    queryKey: ["balance", "usdc", jarPda?.toString()],
    queryFn: async () => {
      if (!jarPda) return 0;
      try {
        const accountInfo = await connection.getParsedTokenAccountsByOwner(
          jarPda,
          { mint: USDC_MINT }
        );
        if (accountInfo.value.length === 0) return 0;
        const balance =
          accountInfo.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        return balance;
      } catch (error) {
        console.error("Error fetching USDC balance:", error);
        return 0;
      }
    },
    enabled: !!jarPda,
  });

  const { data: usdtBalance, isLoading: isUsdtLoading } = useQuery({
    queryKey: ["balance", "usdt", jarPda?.toString()],
    queryFn: async () => {
      if (!jarPda) return 0;
      try {
        const accountInfo = await connection.getParsedTokenAccountsByOwner(
          jarPda,
          { mint: USDT_MINT }
        );
        if (accountInfo.value.length === 0) return 0;
        return accountInfo.value[0].account.data.parsed.info.tokenAmount
          .uiAmount;
      } catch (error) {
        console.error("Error fetching USDT balance:", error);
        return 0;
      }
    },
    enabled: !!jarPda,
  });

  return {
    solBalance: solBalance ?? 0,
    usdcBalance: usdcBalance ?? 0,
    usdtBalance: usdtBalance ?? 0,
    isLoading: isSolLoading || isUsdcLoading || isUsdtLoading,
  };
};
