"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import Loading from "@/app/loading/page";
import { useLoading } from "@/providers/loading-provider";
import { Skeleton } from "@/components/ui/skeleton";

// Define protected and public routes
const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/withdrawls",
  "/tips",
  "/supporters",
];
const PUBLIC_ROUTES = ["/", "/loading"]; // Add any other public routes here

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { publicKey, connecting } = useWallet();
  const { checkUser } = useSoljarUser();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { isInitialLoading, setIsInitialLoading } = useLoading();

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isTipLinkRoute = pathname.match(/^\/[^/]+$/); // Matches /{tipLink} pattern

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkAuth = async () => {
      if (connecting) {
        timeoutId = setTimeout(checkAuth, 500);
        return;
      }

      if (publicKey) {
        const { data } = await checkUser.refetch();
        setUser(data);
        setIsCheckingAuth(false);
        setIsInitialLoading(false);
        return;
      }

      setIsCheckingAuth(false);
      setIsInitialLoading(false);
    };

    timeoutId = setTimeout(checkAuth, 2000);

    return () => clearTimeout(timeoutId);
  }, [connecting, publicKey, checkUser, setIsInitialLoading]);

  console.log("isInitialLoading", isInitialLoading);
  console.log("isCheckingAuth", isCheckingAuth);
  console.log("user", user);

  // Only show full-page loading on initial app load
  if (isInitialLoading) {
    return <Loading />;
  }

  // For subsequent loading states, use skeletons or more subtle loading indicators
  if (isCheckingAuth && !isInitialLoading) {
    return <Skeleton className="w-full h-screen" />;
  }

  // Don't interfere with tip link routes
  if (isTipLinkRoute) {
    return <>{children}</>;
  }

  // Handle protected routes
  if (isProtectedRoute && (!publicKey || !user)) {
    router.push("/");
    return <Loading />; // Show loading while redirecting
  }

  // Handle home page with authenticated user
  if (pathname === "/" && publicKey && user) {
    router.push("/dashboard");
    return <Loading />; // Show loading while redirecting
  }

  // For all other routes, render children
  return <>{children}</>;
}
