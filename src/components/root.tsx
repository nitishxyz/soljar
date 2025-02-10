"use client";

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
  const { connected, connecting } = useWallet();

  if (connecting) {
    return loading;
  }

  return <>{connected ? auth : all}</>;
};
