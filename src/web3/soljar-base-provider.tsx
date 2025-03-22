"use client";

import { getSoljarProgram, getSoljarProgramId } from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster } from "@solana/web3.js";
import { createContext, useContext, useMemo, ReactNode } from "react";
import { useCluster } from "@/web3/cluster/cluster-data-access";
import { useAnchorProvider } from "@/web3/solana/solana-provider";

interface SoljarBaseContextState {
  program: ReturnType<typeof getSoljarProgram>;
  programId: ReturnType<typeof getSoljarProgramId>;
  connection: ReturnType<typeof useConnection>["connection"];
  cluster: ReturnType<typeof useCluster>["cluster"];
  provider: ReturnType<typeof useAnchorProvider>;
}

const SoljarBaseContext = createContext<SoljarBaseContextState | null>(null);

export function SoljarBaseProvider({ children }: { children: ReactNode }) {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();

  const programId = useMemo(
    () => getSoljarProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = useMemo(() => getSoljarProgram(provider), [provider]);

  const value = {
    program,
    programId,
    connection,
    cluster,
    provider,
  };

  return (
    <SoljarBaseContext.Provider value={value}>
      {children}
    </SoljarBaseContext.Provider>
  );
}

export function useSoljarBase(): SoljarBaseContextState {
  const context = useContext(SoljarBaseContext);
  if (!context) {
    throw new Error("useSoljarBase must be used within a SoljarBaseProvider");
  }
  return context;
}
