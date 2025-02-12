import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { BN } from "@coral-xyz/anchor";
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

      // Check if it's a SOL withdrawal (default PublicKey indicates SOL)
      const isSolWithdrawal = mint.equals(PublicKey.default);

      if (isSolWithdrawal) {
        // Handle SOL withdrawal
        return await program.methods
          .createWithdrawl(mint, bnAmount)
          .accounts({})
          .rpc();
      } else {
        const tokenProgramId = await getTokenProgramId(
          program.provider.connection,
          mint
        );

        return await program.methods
          .createWithdrawl(mint, bnAmount)
          .accounts({})
          .postInstructions([
            await program.methods
              .withdrawTokens(bnAmount)
              .accounts({
                mint,
                tokenProgram: tokenProgramId,
              })
              .instruction(),
          ])
          .rpc();
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
