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

interface SoljarContextState {
  program: ReturnType<typeof getSoljarProgram>;
  programId: ReturnType<typeof getSoljarProgramId>;
  connection: ReturnType<typeof useConnection>["connection"];
  cluster: ReturnType<typeof useCluster>["cluster"];
  provider: ReturnType<typeof useAnchorProvider>;
  userPublicKey: ReturnType<typeof useWallet>["publicKey"];
}

const SoljarContext = createContext<SoljarContextState | null>(null);

export function SoljarProvider({ children }: { children: ReactNode }) {
  const [userPublicKey, setUserPublicKey] = useState<PublicKey | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [userChecked, setUserChecked] = useState(false);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (publicKey) {
        setUserPublicKey(publicKey);
        const userPda = findUserPDA(program, publicKey);
        console.log(userPda);
        const user = program.account.user.fetch(userPda).catch((error) => {
          console.log("Error fetching user:", error);
          return null;
        });
        console.log(user);
        setUser(user);
        setUserChecked(true);
      } else {
        setUserChecked(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (publicKey && !userPublicKey) {
      const userPda = findUserPDA(program, publicKey);
      const user = program.account.user.fetch(userPda).catch((error) => {
        console.log("Error fetching user:", error);
        return null;
      });
      setUserPublicKey(publicKey);
      setUser(user);
    }
  }, [publicKey, program, userPublicKey]);

  const value = {
    program,
    programId,
    connection,
    cluster,
    provider,
    userPublicKey,
    user,
  };

  if (!userChecked) {
    return <Loading />;
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
