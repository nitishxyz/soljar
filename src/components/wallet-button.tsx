"use client";

import * as React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Power, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function truncateAddress(address: string, startLength = 4, endLength = 4) {
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export function WalletButton() {
  const { connected, publicKey, disconnect, select } = useWallet();
  const { setVisible: setModalVisible } = useWalletModal();
  const [copied, setCopied] = React.useState(false);
  const [rpcProvider, setRpcProvider] = React.useState("helius");

  const copyToClipboard = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected) {
    return (
      <Button
        variant="outline"
        onClick={() => setModalVisible(true)}
        size="lg"
        className="font-medium text-lg"
      >
        <CreditCard className="mr-2 !size-6" />
        Connect Wallet
      </Button>
    );
  }

  const address = publicKey?.toBase58() || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-mono text-lg" size="lg">
          <CreditCard className="!size-7 mr-2" />
          {truncateAddress(address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] space-y-2 p-2">
        <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/50 p-2">
          <span className="font-mono text-lg">{truncateAddress(address)}</span>
          <div className="flex gap-1">
            <button
              onClick={() => copyToClipboard(address)}
              className={cn(
                "flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted",
                copied && "text-green-500"
              )}
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
            <a
              href={`https://explorer.solana.com/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-muted"
            >
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-2">
          <div className="mb-2 px-1 text-xs font-medium">RPC Connection</div>
          <ToggleGroup
            type="single"
            value={rpcProvider}
            onValueChange={(value) => {
              if (value) setRpcProvider(value);
            }}
            className="grid grid-cols-3 gap-1"
          >
            <ToggleGroupItem value="helius" size="sm" className="font-medium">
              Helius
            </ToggleGroupItem>
            <ToggleGroupItem value="triton" size="sm" className="font-medium">
              Triton
            </ToggleGroupItem>
            <ToggleGroupItem value="custom" size="sm" className="font-medium">
              Custom
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <DropdownMenuItem
          className="w-full justify-start gap-2 rounded-md p-2 text-destructive focus:text-destructive"
          onClick={() => disconnect()}
        >
          <Power className="size-4" />
          <span className="font-medium">Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
