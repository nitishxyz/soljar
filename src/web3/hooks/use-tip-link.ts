import { PublicKey } from "@solana/web3.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSoljarProgram } from "../soljar-data-access";
import { findTipLinkPDA, findUserPDA } from "../pda-helper";
import { BN } from "@coral-xyz/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTokenProgramId } from "../utils";

export interface TipLink {
  user: PublicKey;
  jar: PublicKey;
  id: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export function useTipLink(tipLinkId: string) {
  const { program, userPublicKey } = useSoljarProgram();

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
      if (!userPublicKey) throw new Error("Wallet not connected");
      if (!tipLinkId) throw new Error("Tip link ID is required");

      const bnAmount = new BN(amount);

      // Check if it's a SOL deposit (default PublicKey indicates SOL)
      const isSolDeposit = mint.equals(PublicKey.default);

      const baseTransaction = program.methods
        .createDeposit(tipLinkId, mint, referrer, memo, bnAmount)
        .accounts({});

      if (isSolDeposit) {
        // Handle SOL deposit
        return await baseTransaction.signers([]).rpc();
      } else {
        // Handle SPL token deposit
        if (!sourceTokenAccount)
          throw new Error("Source token account is required for SPL tokens");

        const tokenProgramId = await getTokenProgramId(
          program.provider.connection,
          mint
        );

        return await baseTransaction
          .postInstructions([
            await program.methods
              .transferTokens(tipLinkId, bnAmount)
              .accounts({
                mint,
                sourceTokenAccount,
                tokenProgram: tokenProgramId,
              })
              .instruction(),
          ])
          .signers([])
          .rpc();
      }
    },
  });

  return {
    getTipLink,
    createDeposit,
  };
}
