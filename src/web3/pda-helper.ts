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
export const findJarPDA = (program: Program, userPDA: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("jar"), userPDA.toBuffer()],
    program.programId
  );
  return pda;
};

export const findTreasuryPDA = (program: Program, jarPDA: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("treasury"), jarPDA.toBuffer()],
    program.programId
  );
  return pda;
};
export const findIndexPDA = (program: Program, jarPDA: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("index"), jarPDA.toBuffer()],
    program.programId
  );
  return pda;
};
export const findDepositIndexPDA = (
  program: Program,
  indexPDA: PublicKey,
  page: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("deposit_index"),
      indexPDA.toBuffer(),
      Buffer.from(new Uint32Array([page]).buffer),
    ],
    program.programId
  );
  return pda;
};

export const findWithdrawlIndexPDA = (
  program: Program,
  indexPDA: PublicKey,
  page: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("withdrawl_index"),
      indexPDA.toBuffer(),
      Buffer.from(new Uint32Array([page]).buffer),
    ],
    program.programId
  );
  return pda;
};

export const findMetaIndexPDA = (
  program: Program,
  indexPDA: PublicKey,
  page: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("meta_index"),
      indexPDA.toBuffer(),
      Buffer.from(new Uint32Array([page]).buffer),
    ],
    program.programId
  );
  return pda;
};

export const findTipLinkIndexPDA = (
  program: Program,
  indexPDA: PublicKey,
  page: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("tip_link_index"),
      indexPDA.toBuffer(),
      Buffer.from(new Uint32Array([page]).buffer),
    ],
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

export const findMetaPDA = (program: Program, depositPDA: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("meta"), depositPDA.toBuffer()],
    program.programId
  );
  return pda;
};

export const findDepositPDA = (
  program: Program,
  depositIndexPDA: PublicKey,
  index: number
) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("deposit"),
      depositIndexPDA.toBuffer(),
      Buffer.from(new Uint8Array([index]).buffer),
    ],
    program.programId
  );
  return pda;
};
