import { getTestContext } from "../utils/setup";
import { BankrunProvider } from "anchor-bankrun";
import IDL from "../../target/idl/soljar.json";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import * as anchor from "@coral-xyz/anchor";
import { Soljar } from "@project/anchor";
import {
  findAccountV2PDA,
  findJarByIdV2PDA,
  findJarV2PDA,
} from "../utils/helpers_v2";

describe("V2 - Enhanced Account Creation", () => {
  it("should create a new v2 account with setup_account instruction", async () => {
    const { program, creator } = getTestContext();
    const jarId = "satoshi_v2";

    // Calculate V2 PDAs
    const accountV2PDA = findAccountV2PDA(creator.publicKey, program.programId);
    const jarV2PDA = findJarV2PDA(accountV2PDA, 0, program.programId);
    const jarByIdV2PDA = findJarByIdV2PDA(jarId, program.programId);

    // Create v2 account using setup_account instruction
    await program.methods
      .setupAccount(jarId, 1) // jarId, default_currency_id (1 = USDC)
      .accounts({
        owner: creator.publicKey,
        paymaster: creator.publicKey,
      })
      .signers([creator])
      .rpc();

    // Fetch and verify v2 account
    const accountV2 = await program.account.accountV2.fetch(accountV2PDA);
    expect(accountV2.owner.equals(creator.publicKey)).toBe(true);
    expect(accountV2.defaultJarNumber).toBe(0);
    expect(accountV2.defaultCurrencyId).toBe(1); // USDC
    expect(accountV2.jarCount).toBe(1);

    // Fetch and verify v2 jar
    const jarV2 = await program.account.jarV2.fetch(jarV2PDA);
    expect(jarV2.owner.equals(accountV2PDA)).toBe(true);
    expect(jarV2.jarNumber).toBe(0);
    expect(jarV2.jarId).toBe(jarId);
    expect(jarV2.depositCount).toBe(0);
    expect(jarV2.invoiceCount).toBe(0);

    // Fetch and verify jar by id mapping
    const jarByIdV2 = await program.account.jarByIdV2.fetch(jarByIdV2PDA);
    expect(jarByIdV2.jarIdTaken).toBe(true);
    expect(jarByIdV2.account.equals(accountV2PDA)).toBe(true);
    expect(jarByIdV2.jarNumber).toBe(0);

    console.log("V2 Account created successfully with jar ID:", jarId);
  });

  it("should handle v2 jar id validation with enhanced rules", async () => {
    const { context, newMember } = getTestContext();

    const newMemberProvider = new BankrunProvider(context);
    newMemberProvider.wallet = new NodeWallet(newMember);

    const newMemberProgram = new anchor.Program<Soljar>(
      IDL as Soljar,
      newMemberProvider,
    );

    const jarId = "v2_jar_with_very_long_name_exceeds"; // 33 chars, exceeds 32 limit

    // Calculate V2 PDAs
    const accountV2PDA = findAccountV2PDA(
      newMember.publicKey,
      newMemberProgram.programId,
    );

    // Test v2 specific jar id rules - longer jar ids should fail
    await expect(
      newMemberProgram.methods
        .setupAccount(jarId, 1)
        .accounts({
          owner: newMember.publicKey,
          paymaster: newMember.publicKey,
        })
        .signers([newMember])
        .rpc(),
    ).rejects.toThrow(
      "Reached maximum depth for account resolution. Unresolved accounts: `jarById`",
    );
  });

  it("should support v2 enhanced account features and metadata", async () => {
    const { context, members } = getTestContext();
    const member = members[0];
    const jarId = "v2_enhanced_jar";

    const memberProvider = new BankrunProvider(context);
    memberProvider.wallet = new NodeWallet(member);

    const memberProgram = new anchor.Program<Soljar>(
      IDL as Soljar,
      memberProvider,
    );

    // Calculate V2 PDAs
    const accountV2PDA = findAccountV2PDA(
      member.publicKey,
      memberProgram.programId,
    );

    const jarV2PDA = findJarV2PDA(accountV2PDA, 0, memberProgram.programId);

    // Create account with v2 features
    await memberProgram.methods
      .setupAccount(jarId, 2) // Using USDT as default currency
      .accounts({
        owner: member.publicKey,
        paymaster: member.publicKey,
      })
      .signers([member])
      .rpc();

    const accountV2 = await memberProgram.account.accountV2.fetch(accountV2PDA);

    // Verify v2 enhanced features
    expect(accountV2.owner.equals(member.publicKey)).toBe(true);
    expect(accountV2.defaultCurrencyId).toBe(2); // USDT
    expect(accountV2.jarCount).toBe(1);

    // Verify jar has proper v2 initialization
    const jarV2 = await memberProgram.account.jarV2.fetch(jarV2PDA);
    expect(jarV2.owner.equals(accountV2PDA)).toBe(true);
    expect(jarV2.jarId).toBe(jarId);

    console.log("V2 Account created successfully with enhanced features");
  });

  it("should handle v2 concurrent account creation scenarios", async () => {
    const { context, members } = getTestContext();
    const member1 = members[1];
    const member2 = members[2];
    const baseJarId = "concurrent_v2_jar";

    const member1Provider = new BankrunProvider(context);
    member1Provider.wallet = new NodeWallet(member1);
    const member1Program = new anchor.Program<Soljar>(
      IDL as Soljar,
      member1Provider,
    );

    const member2Provider = new BankrunProvider(context);
    member2Provider.wallet = new NodeWallet(member2);
    const member2Program = new anchor.Program<Soljar>(
      IDL as Soljar,
      member2Provider,
    );

    // Create first account successfully
    const jarId1 = `${baseJarId}_1`;
    const accountV2PDA1 = findAccountV2PDA(
      member1.publicKey,
      member1Program.programId,
    );

    await member1Program.methods
      .setupAccount(jarId1, 1)
      .accounts({
        owner: member1.publicKey,
        paymaster: member1.publicKey,
      })
      .signers([member1])
      .rpc();

    // Create second account with different jar id
    const jarId2 = `${baseJarId}_2`;
    const accountV2PDA2 = findAccountV2PDA(
      member2.publicKey,
      member2Program.programId,
    );

    await member2Program.methods
      .setupAccount(jarId2, 1)
      .accounts({
        owner: member2.publicKey,
        paymaster: member2.publicKey,
      })
      .signers([member2])
      .rpc();

    // Verify both accounts exist
    const account1V2 =
      await member1Program.account.accountV2.fetch(accountV2PDA1);
    expect(account1V2.owner.equals(member1.publicKey)).toBe(true);

    const account2V2 =
      await member2Program.account.accountV2.fetch(accountV2PDA2);
    expect(account2V2.owner.equals(member2.publicKey)).toBe(true);

    await expect(
      member2Program.methods
        .setupAccount(jarId1, 1) // Try to use member1's jar id
        .accounts({
          owner: member2.publicKey,
          paymaster: member2.publicKey,
        })
        .signers([member2])
        .rpc(),
    ).rejects.toThrow(); // Should fail because jar_by_id PDA already exists
  });
});
