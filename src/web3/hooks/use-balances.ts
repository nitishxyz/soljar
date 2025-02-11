import { useQuery } from "@tanstack/react-query";
import { useSoljarProgram } from "../soljar-data-access";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { findJarPDA, findTreasuryPDA, findUserPDA } from "../pda-helper";

// Common token mint addresses for devnet/mainnet
const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // Mainnet USDC
const USDT_MINT = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"); // Mainnet USDT

export const useBalances = () => {
  const { userPublicKey, program } = useSoljarProgram();
  const { connection } = useSoljarProgram();

  const userPda = findUserPDA(program, userPublicKey!);
  const jarPda = findJarPDA(program, userPda);
  const treasuryPda = findTreasuryPDA(program, jarPda);

  const { data: solBalance, isLoading: isSolLoading } = useQuery({
    queryKey: ["balance", "sol", treasuryPda?.toString()],
    queryFn: async () => {
      if (!treasuryPda) return 0;
      const balance = await connection.getBalance(treasuryPda);
      console.log("SOL balance:", balance / 10 ** 9);
      return balance / 10 ** 9; // Convert lamports to SOL
    },
    enabled: !!treasuryPda,
  });

  const { data: usdcBalance, isLoading: isUsdcLoading } = useQuery({
    queryKey: ["balance", "usdc", treasuryPda?.toString()],
    queryFn: async () => {
      if (!treasuryPda) return 0;
      try {
        const accountInfo = await connection.getParsedTokenAccountsByOwner(
          treasuryPda,
          { mint: USDC_MINT }
        );
        console.log("USDC account info:", accountInfo);
        if (accountInfo.value.length === 0) return 0;
        const balance =
          accountInfo.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        console.log("USDC balance:", balance);
        return balance;
      } catch (error) {
        console.error("Error fetching USDC balance:", error);
        return 0;
      }
    },
    enabled: !!treasuryPda,
  });

  const { data: usdtBalance, isLoading: isUsdtLoading } = useQuery({
    queryKey: ["balance", "usdt", treasuryPda?.toString()],
    queryFn: async () => {
      if (!treasuryPda) return 0;
      try {
        const accountInfo = await connection.getParsedTokenAccountsByOwner(
          treasuryPda,
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
    enabled: !!treasuryPda,
  });

  console.log(solBalance, usdcBalance, usdtBalance);

  return {
    solBalance: solBalance ?? 0,
    usdcBalance: usdcBalance ?? 0,
    usdtBalance: usdtBalance ?? 0,
    isLoading: isSolLoading || isUsdcLoading || isUsdtLoading,
  };
};
