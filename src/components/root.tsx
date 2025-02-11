"use client";

import { AuthGuard } from "@/components/auth-guard";
// import { usePlatform } from "@/web3/hooks/use-platform";
// import { Button } from "./ui/button";
// import { WalletButton } from "./wallet-button";

export const Root = ({ children }: { children: React.ReactNode }) => {
  // const { platform, initPlatform } = usePlatform();

  // if (!platform) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <h1 className="text-2xl font-bold">Platform not found</h1>
  //       <WalletButton />
  //       <Button onClick={() => initPlatform()}>Initialize Platform</Button>
  //     </div>
  //   );
  // }

  return <AuthGuard>{children}</AuthGuard>;
};
