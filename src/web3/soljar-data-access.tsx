"use client";

import { getSoljarProgram, getSoljarProgramId } from "@project/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { useMemo } from "react";
import { useCluster } from "@/web3/cluster/cluster-data-access";
import { useAnchorProvider } from "@/web3/solana/solana-provider";

export function useSoljarProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();

  const programId = useMemo(
    () => getSoljarProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = useMemo(
    () => getSoljarProgram(provider, programId),
    [provider, programId]
  );

  return {
    program,
    programId,
    connection,
    cluster,
    provider,
    userPublicKey: publicKey,
  };
}
