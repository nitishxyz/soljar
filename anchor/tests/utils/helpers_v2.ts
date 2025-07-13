import { PublicKey } from "@solana/web3.js";

// V2 PDA helper functions
export const findAccountV2PDA = (owner: PublicKey, programId: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("account_v2"), owner.toBuffer()],
    programId,
  );
  return pda;
};

export const findVaultV2PDA = (account: PublicKey, programId: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault_v2"), account.toBuffer()],
    programId,
  );
  return pda;
};

export const findJarV2PDA = (
  account: PublicKey,
  jarNumber: number,
  programId: PublicKey,
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("jar_v2"),
      account.toBuffer(),
      Buffer.from(new Uint8Array([jarNumber])),
    ],
    programId,
  );
  return pda;
};

export const findJarByIdV2PDA = (jarId: string, programId: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("jar_by_id_v2"), Buffer.from(jarId)],
    programId,
  );
  return pda;
};
