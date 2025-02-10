"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { WalletButton } from "@/components/wallet-button";

export function Header() {
  return (
    <header className="flex h-20 items-center justify-between gap-4 bg-background px-6">
      <div className="flex ">
        <SidebarTrigger size={"lg"} className="h-12" />
      </div>
      <div className="flex items-center gap-4">
        <WalletButton />
      </div>
    </header>
  );
}
