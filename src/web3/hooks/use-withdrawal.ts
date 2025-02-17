import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getTokenProgramId } from "../utils";

export function useWithdrawal() {
  const { program } = useSoljarBase();
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      mint,
    }: {
      amount: number;
      mint: PublicKey;
    }) => {
      if (!publicKey) throw new Error("Wallet not connected");
      if (!program) throw new Error("Program not initialized");

      const bnAmount = new BN(amount * 1e9); // Convert to lamports/smallest unit
      const isSolWithdrawal = mint.equals(PublicKey.default);

      try {
        if (isSolWithdrawal) {
          // Handle SOL withdrawal
          const [jarPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("jar"), publicKey.toBuffer()],
            program.programId
          );

          return await program.methods
            .createWithdrawl(mint, bnAmount)
            .accounts({
              signer: publicKey,
            })
            .rpc();
        } else {
          // Handle SPL token withdrawal
          const [jarPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("jar"), publicKey.toBuffer()],
            program.programId
          );

          const [tokenAccountPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("token_account"), jarPda.toBuffer(), mint.toBuffer()],
            program.programId
          );

          const associatedTokenAccount = getAssociatedTokenAddressSync(
            mint,
            publicKey
          );

          const tokenProgramId = await getTokenProgramId(
            program.provider.connection,
            mint
          );

          return await program.methods
            .withdrawSplTokens(bnAmount)
            .accounts({
              signer: publicKey,
              mint,
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
    onSuccess: () => {
      // Invalidate and refetch both balances and recent withdrawals
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["recent-withdrawals"] });

      toast({
        title: "Withdrawal successful",
        description: "Your funds have been withdrawn successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Withdrawal failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
