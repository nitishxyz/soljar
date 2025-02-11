"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { usePlatform } from "@/web3/hooks/use-platform";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { useSoljarProgram } from "@/web3/soljar-data-access";

const authPaths = [
  "/dashboard",
  "/settings",
  "/withdrawls",
  "/tips",
  "/supporters",
];

const useAuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { publicKey, connecting } = useWallet();
  const { userPublicKey } = useSoljarProgram();
  const { getUser } = useSoljarUser();
  const { platform, isPlatformLoading, initPlatform } = usePlatform();
  const { data: user, isLoading } = getUser;

  useEffect(() => {
    if (
      pathname === "/" ||
      authPaths.includes(pathname) ||
      pathname === "/loading"
    ) {
      if (isLoading || isPlatformLoading || connecting) {
        if (pathname !== "/loading") {
          router.push("/loading");
        }
      } else if (!platform || !publicKey || !user) {
        if (authPaths.includes(pathname) || pathname === "/loading") {
          router.push("/");
        }
      } else {
        if (pathname === "/" || pathname === "/loading") {
          router.push("/dashboard");
        }
      }
    }
  }, [
    platform,
    publicKey,
    router,
    isPlatformLoading,
    isLoading,
    connecting,
    pathname,
    user,
  ]);
};

export default useAuthGuard;
