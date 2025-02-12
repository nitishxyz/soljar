"use client";
import { useTips } from "@/web3/hooks/use-tips";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import {
  formatAddress,
  getCurrencyFromMint,
  fetchTransactionSignature,
  SOLANA_CLUSTER,
} from "@/web3/utils";
import { GiftIcon } from "@heroicons/react/24/solid";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useInView } from "react-intersection-observer";
import { useConnection } from "@solana/wallet-adapter-react";

export default function TipsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, fetchNextPage, hasNextPage } = useTips(currentPage);
  const { ref, inView } = useInView();
  const { connection } = useConnection();
  const [loadingSignature, setLoadingSignature] = useState<string | null>(null);

  // Load more when the last element comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      setCurrentPage((p) => p + 1);
    }
  }, [inView, hasNextPage]);

  const handleTipClick = async (tip: any) => {
    try {
      setLoadingSignature(tip.signer.toString());
      const signature = await fetchTransactionSignature(
        connection,
        tip.signer.toString()
      );
      if (signature) {
        window.open(
          `https://solscan.io/tx/${signature}?cluster=${SOLANA_CLUSTER}`,
          "_blank"
        );
      }
    } finally {
      setLoadingSignature(null);
    }
  };

  if (isLoading && currentPage === 0) {
    return (
      <div className="container mx-auto p-8 space-y-4">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <GiftIcon className="w-7 h-7 text-accent-purple animate-pulse" />
          Tips
        </div>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse flex items-center justify-between py-4 px-6 rounded-lg"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div>
                <div className="h-5 w-32 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded mt-2" />
              </div>
            </div>
            <div className="h-5 w-40 bg-muted rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <GiftIcon className="w-7 h-7 text-accent-purple" />
          Tips ({data?.totalTips || 0})
        </div>

        <div className="space-y-3">
          {data?.tips.map((tip, index) => (
            <motion.div
              key={`${tip.signer.toString()}-${tip.createdAt}`}
              onClick={() => handleTipClick(tip)}
              className="group flex items-center justify-between py-4 px-6 rounded-lg hover:bg-accent-purple/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                  <CurrencyIcon
                    currency={getCurrencyFromMint(tip.currencyMint)}
                    className="w-7 h-7"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">
                    {formatAddress(tip.signer.toString())}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {formatDistance(
                      new Date(tip.createdAt * 1000),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                  {tip.memo && (
                    <span className="text-sm text-muted-foreground mt-1">
                      &quot;{tip.memo}&quot;
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg text-accent-purple">
                  {tip.amount} {getCurrencyFromMint(tip.currencyMint)}
                </span>
                {tip.referrer && (
                  <p className="text-sm text-muted-foreground">
                    via {tip.referrer}
                  </p>
                )}
                <div className="relative w-4 h-4">
                  {loadingSignature === tip.signer.toString() ? (
                    <div className="absolute inset-0 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ExternalLink className="absolute inset-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {hasNextPage && (
            <div ref={ref} className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
