"use client";
import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TipLinkCardProps {
  username?: string;
}

export function TipLinkCard({ username }: TipLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const tipLink = `https://soljar.vercel.app/${username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tipLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="group relative overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />

      {/* Decorative gradient orb */}
      <div className="absolute h-32 w-32 -top-16 -right-16 bg-accent-purple/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="flex-row items-center justify-between relative">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-accent-purple animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-accent-purple animate-ping opacity-25" />
          </div>
          Your TipLink
        </CardTitle>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="gap-2 bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple hover:text-accent-purple transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="font-medium">Copy Link</span>
              </>
            )}
          </Button>
        </motion.div>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 relative p-6">
        <div className="relative group/input">
          <Input
            type="text"
            value={tipLink}
            readOnly
            className="font-mono text-sm pr-8 bg-accent-purple/5 border-accent-purple/20 focus:border-accent-purple focus:ring-accent-purple/20 overflow-x-auto"
          />
          <a
            href={tipLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent-purple transition-colors bg-background/80 p-1"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm text-muted-foreground min-h-[2.5rem]">
          Share this link with your supporters to receive tips in SOL, USDC, or
          USDT.
        </p>
      </CardContent>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}
