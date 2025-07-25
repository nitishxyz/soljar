"use client";
import { useState, useEffect } from "react";
import { WalletButton } from "@/components/wallet-button";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateUserForm } from "./create-user-form";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function OnboardingSection() {
  const { publicKey, connected } = useWallet();
  const { getUser } = useSoljarUser();
  const { data: user, isLoading, isFetching } = getUser;
  const queryClient = useQueryClient();
  const router = useRouter();
  // Reset the component state when wallet is disconnected
  useEffect(() => {
    if (!connected) {
      // Immediately invalidate and remove queries
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.resetQueries({ queryKey: ["user"] });
    }
  }, [connected, queryClient]);

  // Only show loading state when actually fetching data with a connected wallet
  const showLoading = isLoading && connected && isFetching;

  if (showLoading) {
    return (
      <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Connect your wallet and create your personal tip jar
        </p>
      </div>

      <div className="w-full max-w-md space-y-6 flex flex-col items-center">
        <WalletButton />
        <AnimatePresence mode="wait">
          {connected && publicKey && !user && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "visible" }}
              className="w-full"
            >
              <div className="overflow-visible">
                <CreateUserForm />
              </div>
            </motion.div>
          )}

          {/* show go to dashboard button if user is connected */}
          {connected && user && (
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
