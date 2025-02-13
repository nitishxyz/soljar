import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useQuery } from "@tanstack/react-query";
import { USDT_MINT, USDC_MINT } from "../utils";

export const useWalletBalances = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return useQuery({
    queryKey: ["wallet-balances", publicKey?.toString()],
    queryFn: async () => {
      if (!publicKey) return { SOL: 0, USDC: 0, USDT: 0 };

      const [solBalance, tokenAccounts] = await Promise.all([
        connection.getBalance(publicKey),
        connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        }),
      ]);

      const usdcAccount = tokenAccounts.value.find(
        (account) =>
          account.account.data.parsed.info.mint === USDC_MINT.toString()
      );
      const usdtAccount = tokenAccounts.value.find(
        (account) =>
          account.account.data.parsed.info.mint === USDT_MINT.toString()
      );

      return {
        SOL: solBalance / 1e9, // Convert from lamports to SOL
        USDC: usdcAccount
          ? Number(usdcAccount.account.data.parsed.info.tokenAmount.uiAmount)
          : 0,
        USDT: usdtAccount
          ? Number(usdtAccount.account.data.parsed.info.tokenAmount.uiAmount)
          : 0,
      };
    },
    enabled: !!publicKey,
  });
};
