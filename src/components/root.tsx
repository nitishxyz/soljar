"use client";

import { usePlatform } from "@/web3/hooks/use-platform";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { useWallet } from "@solana/wallet-adapter-react";

export const Root = ({
  loading,
  all,
  auth,
}: {
  loading: React.ReactNode;
  all: React.ReactNode;
  auth: React.ReactNode;
}) => {
  const { publicKey, connecting } = useWallet();
  const { getUser } = useSoljarUser();
  const { platform, isPlatformLoading, initPlatform } = usePlatform();
  const { data: user, isLoading } = getUser;

  if (isLoading || isPlatformLoading || connecting) {
    return <>{loading}</>;
  }

  if (!platform) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <button onClick={() => initPlatform()}>Initialize Platform</button>
      </div>
    );
  }

  return <>{user && publicKey ? auth : all}</>;
};
