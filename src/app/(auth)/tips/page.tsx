"use client";
import { useTips } from "@/web3/hooks/use-tips";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import {
  formatAddress,
  fetchTransactionSignature,
  SOLANA_CLUSTER,
  formatCurrencyAmount,
  getCurrencySymbol,
} from "@/web3/utils";
import { GiftIcon } from "@heroicons/react/24/solid";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useInView } from "react-intersection-observer";
import { useConnection } from "@solana/wallet-adapter-react";
import { useJar } from "@/web3/hooks/use-jar";

export default function TipsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, fetchNextPage, hasNextPage } = useTips(currentPage);
  const { jar } = useJar();
  const { ref, inView } = useInView();
  const { connection } = useConnection();
  const [loadingSignature, setLoadingSignature] = useState<string | null>(null);

  // Load more when the last element comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const tips = data?.pages.flatMap((page) => page.tips) ?? [];

  const handleTipClick = async (tip: any) => {
    try {
      setLoadingSignature(tip.id);
      const signature = await fetchTransactionSignature(connection, tip.id);
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
            className="animate-pulse flex items-start gap-3 sm:gap-6 py-3 sm:py-4 px-4 sm:px-6 rounded-lg"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="h-5 w-32 bg-muted rounded" />
                <div className="h-5 w-24 bg-muted rounded shrink-0" />
              </div>
              <div className="h-4 w-40 bg-muted rounded mt-2" />
              <div className="h-4 w-48 bg-muted rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <GiftIcon className="w-7 h-7 text-accent-purple" />
          Tips ({jar?.totalDeposits || 0})
        </div>

        <div className="space-y-3">
          {tips.map((tip, index) => (
            <motion.div
              key={`${tip.signer.toString()}-${tip.createdAt}`}
              onClick={() => handleTipClick(tip)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-accent-purple/5 transition-colors cursor-pointer gap-2 sm:gap-4"
            >
              <div className="flex-1 flex items-start gap-3 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0">
                  <CurrencyIcon
                    currency={getCurrencySymbol(tip.currency)}
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-base sm:text-lg truncate">
                      {formatAddress(tip.signer.toString())}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-medium text-base sm:text-lg text-accent-purple whitespace-nowrap">
                        {formatCurrencyAmount(
                          tip.amount,
                          getCurrencySymbol(tip.currency)
                        )}{" "}
                        {getCurrencySymbol(tip.currency)}
                      </span>
                      <div className="relative w-4 h-4 shrink-0">
                        {loadingSignature === tip.id ? (
                          <div className="absolute inset-0 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <ExternalLink className="absolute inset-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span>
                      {formatDistance(
                        new Date(tip.createdAt * 1000),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </span>
                  </div>
                  {tip.memo && (
                    <span className="block text-xs sm:text-sm text-muted-foreground mt-1">
                      &quot;{tip.memo}&quot;
                    </span>
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
