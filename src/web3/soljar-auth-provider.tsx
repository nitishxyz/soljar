"use client";

import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { findUserPDA } from "./pda-helper";
import Loading from "@/app/loading/page";
import { useSoljarBase } from "./soljar-base-provider";
import { useRouter } from "next/navigation";

interface SoljarAuthContextState {
  userPublicKey: PublicKey;
  user: any;
}

const SoljarAuthContext = createContext<SoljarAuthContextState | null>(null);

export function SoljarAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { publicKey } = useWallet();
  const { program } = useSoljarBase();
  const router = useRouter();

  useEffect(() => {
    const initializeUser = async () => {
      if (!publicKey) {
        router.push("/");
        return;
      }

      const userPda = findUserPDA(program, publicKey);
      try {
        const userData = await program.account.user.fetch(userPda);
        setUser(userData);
        setIsInitialized(true);
      } catch (error) {
        console.log("Error fetching user:", error);
        router.push("/");
        return;
      }
    };

    initializeUser();
  }, [publicKey, program, router]);

  if (!isInitialized || !publicKey || !user) {
    return <Loading />;
  }

  return (
    <SoljarAuthContext.Provider value={{ userPublicKey: publicKey, user }}>
      {children}
    </SoljarAuthContext.Provider>
  );
}

export function useSoljarAuth(): SoljarAuthContextState {
  const context = useContext(SoljarAuthContext);
  if (!context) {
    throw new Error("useSoljarAuth must be used within a SoljarAuthProvider");
  }
  return context;
}
