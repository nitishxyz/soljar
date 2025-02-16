import { BN, Program as AnchorProgram } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Soljar } from "@project/anchor";
export type Program = AnchorProgram<Soljar>;

export const findPlatformPDA = (program: Program) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("platform")],
    program.programId
  );
  return pda;
};

export const findUserPDA = (program: Program, user: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), user.toBuffer()],
    program.programId
  );
  return pda;
};

export const findUserNamePDA = (program: Program, username: string) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("username"), Buffer.from(username)],
    program.programId
  );
  return pda;
};
export const findJarPDA = (program: Program, publicKey: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("jar"), publicKey.toBuffer()],
    program.programId
  );
  return pda;
};

export const findTipLinkPDA = (program: Program, id: string) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("tip_link"), Buffer.from(id)],
    program.programId
  );
  return pda;
};

export const findDepositPDA = (
  program: Program,
  jarPDA: PublicKey,
  index: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("deposit"),
      jarPDA.toBuffer(),
      Buffer.from(new Uint32Array([index]).buffer),
    ],
    program.programId
  );
  return pda;
};

export const findWithdrawlPDA = (
  program: Program,
  jarPDA: PublicKey,
  index: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("withdrawl"),
      jarPDA.toBuffer(),
      Buffer.from(new Uint32Array([index]).buffer),
    ],
    program.programId
  );
  return pda;
};

export const findSupporterIndexPDA = (
  program: Program,
  jarPDA: PublicKey,
  index: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("supporter_index"),
      jarPDA.toBuffer(),
      Buffer.from(new Uint32Array([index]).buffer),
    ],
    program.programId
  );
  return pda;
};

export const findSupporterPDA = (
  program: Program,
  jarPDA: PublicKey,
  signer: PublicKey
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("supporter"), jarPDA.toBuffer(), signer.toBuffer()],
    program.programId
  );
  return pda;
};
