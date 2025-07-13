import { getTestContext } from "../utils/setup";
import { BN } from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SystemProgram } from "@solana/web3.js";
import { USDC_MINT } from "../utils/usdc-cache";
import {
  findAccountV2PDA,
  findJarByIdV2PDA,
  findJarV2PDA,
  findDepositV2PDA,
  findVaultV2PDA,
} from "../utils/helpers_v2";
import { getAccount } from "spl-token-bankrun";

describe("V2 Deposit Tests", () => {
  describe("USDC Deposits (V2)", () => {
    it("should create a V2 USDC deposit successfully", async () => {
      const { program, creator, creatorUsdcAccount, banksClient } =
        getTestContext();
      const jarId = "satoshi_v2"; // Use the same jarId from account.setup.v2.spec.ts
      const amount = new BN(10_000_000); // 10 USDC (6 decimals)

      // Get PDAs using helper functions - account should already exist from setup test
      const accountPDA = findAccountV2PDA(creator.publicKey, program.programId);
      const jarByIdPDA = findJarByIdV2PDA(jarId, program.programId);

      const jarByIdAccount = await program.account.jarByIdV2.fetch(jarByIdPDA);
      const jarPDA = findJarV2PDA(
        accountPDA,
        jarByIdAccount.jarNumber,
        program.programId
      );

      const jar = await program.account.jarV2.fetch(jarPDA);
      const depositPDA = findDepositV2PDA(
        jarPDA,
        jar.depositCount,
        program.programId
      );

      const vaultPDA = findVaultV2PDA(accountPDA, program.programId);

      const vaultTokenAccount = getAssociatedTokenAddressSync(
        USDC_MINT,
        vaultPDA,
        true
      );

      const initialVaultTokenAccountInfo = await getAccount(
        // @ts-ignore
        banksClient,
        vaultTokenAccount
      );

      console.log("creatorUsdcAccount: ", creatorUsdcAccount);

      // Make the deposit
      await program.methods
        .deposit(jarId, amount, null)
        .accounts({
          depositor: creator.publicKey,
          mint: USDC_MINT,
          depositorTokenAccount: creatorUsdcAccount,
        })
        .signers([creator])
        .rpc()
        .catch((err) => {
          console.log("ERR: ", err);
        });

      // Verify deposit record
      const deposit = await program.account.depositV2.fetch(depositPDA);
      expect(deposit.depositor).toEqual(creator.publicKey);
      expect(Number(deposit.amount)).toEqual(amount.toNumber());
      expect(deposit.currencyMint).toEqual(USDC_MINT);
      expect(deposit.invoiceId).toBeNull();

      // // Verify jar update
      const updatedJar = await program.account.jarV2.fetch(jarPDA);
      expect(Number(updatedJar.depositCount)).toEqual(jar.depositCount + 1);

      // get the vault token account and it's balance

      const vaultTokenAccountInfo = await getAccount(
        // @ts-ignore
        banksClient,
        vaultTokenAccount
      );
      expect(Number(vaultTokenAccountInfo.amount)).toEqual(
        Number(initialVaultTokenAccountInfo.amount) + Number(amount)
      );
    });

    // it("should fail V2 deposit with zero amount", async () => {
    //   const { program, creator } = getTestContext();
    //   const jarId = "v2testjar";
    //   const amount = new BN(0); // Zero amount

    //   const depositorTokenAccount = getAssociatedTokenAddressSync(
    //     USDC_MINT,
    //     creator.publicKey,
    //   );

    //   await expect(
    //     program.methods
    //       .deposit(jarId, amount, null)
    //       .accounts({
    //         depositor: creator.publicKey,
    //         mint: USDC_MINT,
    //         depositorTokenAccount: depositorTokenAccount,
    //       })
    //       .signers([creator])
    //       .rpc(),
    //   ).rejects.toThrow("InvalidAmount");
    // });

    // it("should fail V2 deposit with non-USDC mint", async () => {
    //   const { program, creator, mint } = getTestContext();
    //   const jarId = "v2testjar";
    //   const amount = new BN(1_000_000);

    //   const depositorTokenAccount = getAssociatedTokenAddressSync(
    //     mint,
    //     creator.publicKey,
    //   );

    //   await expect(
    //     program.methods
    //       .deposit(jarId, amount, null)
    //       .accounts({
    //         depositor: creator.publicKey,
    //         mint: mint, // Wrong mint (not USDC)
    //         depositorTokenAccount: depositorTokenAccount,
    //       })
    //       .signers([creator])
    //       .rpc(),
    //   ).rejects.toThrow("InvalidCurrencyMint");
    // });

    // it("should fail V2 deposit to non-existent jar", async () => {
    //   const { program } = getTestContext();
    //   const jarId = "nonexistentjar";

    //   const jarByIdPDA = findJarByIdV2PDA(jarId, program.programId);

    //   await expect(
    //     program.account.jarByIdV2.fetch(jarByIdPDA),
    //   ).rejects.toThrow(); // Should fail because jar doesn't exist
    // });
  });
});
