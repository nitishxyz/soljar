"use client";

import { getSoljarProgram, getSoljarProgramId } from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { useMemo } from "react";
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";

export function useSoljarProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
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
  };
}
