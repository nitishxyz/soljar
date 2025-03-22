import { PublicKey } from "@solana/web3.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { findJarPDA, findTipLinkPDA } from "../pda-helper";
import { BN } from "@coral-xyz/anchor";
import { getTokenProgramId } from "../utils";
import { useSoljarBase } from "../soljar-base-provider";
import { useWallet } from "@solana/wallet-adapter-react";

export interface TipLink {
  user: PublicKey;
  jar: PublicKey;
  id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export function useTipLink(tipLinkId: string) {
  const { program } = useSoljarBase();
  const { publicKey } = useWallet();

  const getTipLink = useQuery({
    queryKey: ["soljar", "tip-link", tipLinkId],
    queryFn: async () => {
      if (!tipLinkId) {
        return null;
      }

      const tipLinkPDA = findTipLinkPDA(program, tipLinkId);

      try {
        const tipLink = await program.account.tipLink.fetch(tipLinkPDA);

        // Fetch associated user data
        const userData = await program.account.user.fetch(tipLink.user);

        return {
          tipLink,
          user: userData,
        };
      } catch (error) {
        console.error("Error fetching tip link:", error);
        return null;
      }
    },
    enabled: Boolean(tipLinkId),
  });

  const createDeposit = useMutation({
    mutationFn: async ({
      amount,
      mint,
      referrer = "",
      memo = "",
      sourceTokenAccount,
    }: {
      amount: number;
      mint: PublicKey;
      referrer?: string;
      memo?: string;
      sourceTokenAccount?: PublicKey;
    }) => {
      if (!publicKey) throw new Error("Wallet not connected");
      if (!tipLinkId) throw new Error("Tip link ID is required");

      const bnAmount = new BN(amount);
      const isSolDeposit = mint.equals(PublicKey.default);

      try {
        if (isSolDeposit) {
          return await program.methods
            .createDeposit(tipLinkId, referrer, memo, bnAmount)
            .accounts({})
            .rpc();
        } else {
          if (!sourceTokenAccount) {
            throw new Error("Source token account is required for SPL tokens");
          }

          const tokenProgramId = await getTokenProgramId(
            program.provider.connection,
            mint
          );

          const tipLinkPDA = findTipLinkPDA(program, tipLinkId);
          const tipLink = await program.account.tipLink.fetch(tipLinkPDA);

          const jar = await program.account.jar.fetch(tipLink.jar);

          console.log("jar", jar.depositCount);

          return await program.methods
            .createSplDeposit(tipLinkId, referrer, memo, bnAmount)
            .accounts({
              mint,
              sourceTokenAccount,
              tokenProgram: tokenProgramId,
            })
            .rpc();
        }
      } catch (error: any) {
        // Check if the error message indicates the transaction was already processed
        if (error.message?.includes("already been processed")) {
          // Transaction was successful despite the simulation error
          return true;
        }
        // Re-throw other errors
        throw error;
      }
    },
  });

  return {
    getTipLink,
    createDeposit,
  };
}
