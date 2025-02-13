"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import Loading from "@/app/loading/page";

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
  const { getUser } = useSoljarUser();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { data: user } = getUser;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isTipLinkRoute = pathname.includes("/tip/"); // Matches /{tipLink} pattern

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkAuth = async () => {
      // If still connecting, wait longer
      if (connecting) {
        timeoutId = setTimeout(checkAuth, 500);
        return;
      }

      // Only check user if we have a public key and no user data yet
      if (publicKey && !user) {
        try {
          const { data } = await getUser.refetch();
          // setUser(data);
        } finally {
          setIsCheckingAuth(false);
        }
        return;
      }

      // No wallet or already have user data, we can stop checking
      setIsCheckingAuth(false);
    };

    // Only start the auth check if we're checking auth
    if (isCheckingAuth) {
      timeoutId = setTimeout(checkAuth, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [connecting, publicKey, getUser, user, isCheckingAuth]);

  // Show loading during initial checks
  if (isCheckingAuth) {
    return <Loading />;
  }

  // Don't interfere with tip link routes
  if (isTipLinkRoute) {
    return <>{children}</>;
  }

  const goToRoute = (route: string) => {
    setTimeout(() => {
      router.push(route);
    }, 100);
  };

  // Handle protected routes
  if (isProtectedRoute && (!publicKey || !user)) {
    goToRoute("/");
    return <Loading />; // Show loading while redirecting
  }

  // Handle home page with authenticated user
  if (pathname === "/start" && publicKey && user) {
    goToRoute("/dashboard");
    return <Loading />; // Show loading while redirecting
  }

  // For all other routes, render children
  return <>{children}</>;
}
