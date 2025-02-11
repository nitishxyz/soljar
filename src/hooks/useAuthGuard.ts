"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";

// Define protected and public routes
const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/withdrawls",
  "/tips",
  "/supporters",
];
const PUBLIC_ROUTES = ["/", "/loading"]; // Add any other public routes here

export default function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { publicKey } = useWallet();
  const { getUser } = useSoljarUser();
  const { data: user, isLoading } = getUser;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isTipLinkRoute = pathname.match(/^\/[^/]+$/); // Matches /{tipLink} pattern

  useEffect(() => {
    // If still loading user data, don't make any routing decisions yet
    if (isLoading) return;

    // Don't interfere with tip link routes - they're public but need special handling
    if (isTipLinkRoute) return;

    // Case 1: No wallet connected
    if (!publicKey) {
      if (isProtectedRoute) {
        router.push("/");
      }
      return;
    }

    // Case 2: Wallet connected but no user
    if (publicKey && !user) {
      if (isProtectedRoute) {
        router.push("/");
      }
      return;
    }

    // Case 3: Wallet connected and user exists
    if (publicKey && user) {
      if (pathname === "/") {
        router.push("/dashboard");
      }
    }
  }, [
    publicKey,
    user,
    isLoading,
    pathname,
    router,
    isProtectedRoute,
    isTipLinkRoute,
  ]);
}
