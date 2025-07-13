import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { Soljar } from "../../target/types/soljar";
import { startAnchor } from "solana-bankrun";
import { BankrunProvider } from "anchor-bankrun";
import IDL from "../../target/idl/soljar.json";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import { TestContext } from "./setup";
import {
  createAssociatedTokenAccount,
  createMint,
  mintTo,
} from "spl-token-bankrun";
import {
  ACCOUNT_SIZE,
  AccountLayout,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

import { USDC_MINT, fetchUsdcMintFromMainnet } from "./usdc-cache";

async function setupUsdcTokenAccount(
  owner: PublicKey,
  balance: bigint = BigInt(1_000_000_000_000)
) {
  const ata = getAssociatedTokenAddressSync(USDC_MINT, owner, true);
  const tokenAccData = Buffer.alloc(ACCOUNT_SIZE);

  AccountLayout.encode(
    {
      mint: USDC_MINT,
      owner,
      amount: balance,
      delegateOption: 0,
      delegate: PublicKey.default,
      delegatedAmount: BigInt(0),
      state: 1,
      isNativeOption: 0,
      isNative: BigInt(0),
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    tokenAccData
  );

  return {
    address: ata,
    info: {
      lamports: 1_000_000_000,
      data: tokenAccData,
      owner: TOKEN_PROGRAM_ID,
      executable: false,
    },
  };
}

export async function initializeTestContext(): Promise<TestContext> {
  const newMember = new anchor.web3.Keypair();
  const members: Keypair[] = Array(19)
    .fill(0)
    .map(() => new anchor.web3.Keypair());
  let creatorTokenAccount: PublicKey;
  let newMemberTokenAccount: PublicKey;
  let memberTokenAccounts: PublicKey[] = [];
  let mint: PublicKey;

  const creator = new anchor.web3.Keypair();

  // Fetch real USDC mint data from mainnet
  const usdcMintAccount = await fetchUsdcMintFromMainnet();

  // Setup USDC token accounts for creator, newMember, and all members
  const creatorUsdcAccount = await setupUsdcTokenAccount(creator.publicKey);
  const newMemberUsdcAccount = await setupUsdcTokenAccount(newMember.publicKey);
  const memberUsdcAccounts = await Promise.all(
    members.map((member) => setupUsdcTokenAccount(member.publicKey))
  );

  const creatorWallet = new anchor.Wallet(creator);

  const context = await startAnchor(
    "",
    [
      {
        name: "soljar",
        programId: new PublicKey(IDL.address),
      },
    ],
    [
      // Add real USDC mint account
      usdcMintAccount,
      // Add USDC token accounts with balances
      creatorUsdcAccount,
      newMemberUsdcAccount,
      ...memberUsdcAccounts,
      {
        address: creator.publicKey,
        info: {
          lamports: 1000_000_000_000,
          data: Buffer.alloc(0),
          executable: false,
          owner: SYSTEM_PROGRAM_ID,
        },
      },
      {
        address: newMember.publicKey,
        info: {
          lamports: 10_000_000_000,
          data: Buffer.alloc(0),
          executable: false,
          owner: SYSTEM_PROGRAM_ID,
        },
      },
      // Add initial lamports for all 50 members
      ...members.map((member) => ({
        address: member.publicKey,
        info: {
          lamports: 10_000_000_000,
          data: Buffer.alloc(0),
          executable: false,
          owner: SYSTEM_PROGRAM_ID,
        },
      })),
    ]
  );

  const provider = new BankrunProvider(context, creatorWallet);
  anchor.setProvider(provider);

  const program = new Program<Soljar>(IDL as Soljar, provider);
  const banksClient = context.banksClient;
  // const creator = provider.wallet.payer;

  // Use real USDC mint (already added to context)
  const usdcMint = USDC_MINT;

  // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
  mint = await createMint(banksClient, creator, creator.publicKey, null, 2);

  creatorTokenAccount = await createAssociatedTokenAccount(
    // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
    banksClient,
    creator,
    mint,
    creator.publicKey,
    TOKEN_PROGRAM_ID
  );

  newMemberTokenAccount = await createAssociatedTokenAccount(
    // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
    banksClient,
    creator,
    mint,
    newMember.publicKey,
    TOKEN_PROGRAM_ID
  );

  // // Mint some tokens to the creator's account
  await mintTo(
    // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
    banksClient,
    creator,
    mint,
    creatorTokenAccount,
    creator,
    1000000000000
  );

  await mintTo(
    // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
    banksClient,
    creator,
    mint,
    newMemberTokenAccount,
    creator,
    1000000000000
  );

  // Create token accounts for all 50 members
  for (const member of members) {
    const tokenAccount = await createAssociatedTokenAccount(
      // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
      banksClient,
      creator,
      mint,
      member.publicKey,
      TOKEN_PROGRAM_ID
    );
    memberTokenAccounts.push(tokenAccount);

    // Mint tokens to each member
    await mintTo(
      // @ts-expect-error - Type mismatch in spl-token-bankrun and solana banks client
      banksClient,
      creator,
      mint,
      tokenAccount,
      creator,
      1000000000000
    );
  }

  return {
    context,
    provider,
    program,
    banksClient,
    newMember,
    creator,
    mint,
    usdcMint,
    creatorTokenAccount,
    newMemberTokenAccount,
    members,
    memberTokenAccounts,
    creatorUsdcAccount: creatorUsdcAccount.address,
    newMemberUsdcAccount: newMemberUsdcAccount.address,
  };
}
