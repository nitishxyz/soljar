"use client";
import { useState } from "react";
import { WalletButton } from "@/components/wallet-button";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { useWallet } from "@solana/wallet-adapter-react";
import { CreateUserForm } from "./create-user-form";
import { AnimatePresence, motion } from "framer-motion";

export function OnboardingSection() {
  const { publicKey } = useWallet();
  const { getUser } = useSoljarUser();
  const { data: user, isLoading } = getUser;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/3 bg-gray-50 border-l flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Connect your wallet and create your personal tip jar
        </p>
      </div>

      {!user && (
        <div className="w-full max-w-md space-y-6 flex flex-col items-center">
          <WalletButton />
          <div className="w-full">
            <AnimatePresence>
              {publicKey && (
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
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
