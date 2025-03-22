"use client";

import { getSoljarProgram, getSoljarProgramId } from "@project/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Cluster, PublicKey } from "@solana/web3.js";
import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useCluster } from "@/web3/cluster/cluster-data-access";
import { useAnchorProvider } from "@/web3/solana/solana-provider";
import Loading from "@/app/loading/page";
import { findUserPDA } from "./pda-helper";
import { Skeleton } from "@/components/ui/skeleton";

interface SoljarContextState {
  program: ReturnType<typeof getSoljarProgram>;
  programId: ReturnType<typeof getSoljarProgramId>;
  connection: ReturnType<typeof useConnection>["connection"];
  cluster: ReturnType<typeof useCluster>["cluster"];
  provider: ReturnType<typeof useAnchorProvider>;
  userPublicKey: PublicKey | null;
  user: any | null;
}

const SoljarContext = createContext<SoljarContextState | null>(null);

export function SoljarProvider({ children }: { children: ReactNode }) {
  const [userPublicKey, setUserPublicKey] = useState<PublicKey | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const { publicKey } = useWallet();
  const provider = useAnchorProvider();

  const programId = useMemo(
    () => getSoljarProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = useMemo(() => getSoljarProgram(provider), [provider]);

  useEffect(() => {
    const initializeUser = async () => {
      if (publicKey) {
        setUserPublicKey(publicKey);
        const userPda = findUserPDA(program, publicKey);
        try {
          const userData = await program.account.user.fetch(userPda);
          setUser(userData);
        } catch (error) {
          console.log("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUserPublicKey(null);
        setUser(null);
      }
      setIsInitialized(true);
    };

    initializeUser();
  }, [publicKey, program]);

  const value = {
    program,
    programId,
    connection,
    cluster,
    provider,
    userPublicKey,
    user,
  };

  if (!isInitialized) {
    return <Skeleton className="w-full h-screen" />;
  }

  return (
    <SoljarContext.Provider value={value}>{children}</SoljarContext.Provider>
  );
}

export function useSoljarProgram(): SoljarContextState {
  const context = useContext(SoljarContext);
  if (!context) {
    throw new Error("useSoljarProgram must be used within a SoljarProvider");
  }
  return context;
}
