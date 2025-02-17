"use client";
import { useSupporters } from "@/web3/hooks/use-supporters";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import {
  formatAddress,
  getCurrencyFromMint,
  getCurrencySymbol,
} from "@/web3/utils";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useInView } from "react-intersection-observer";
import type { Supporter, TipInfo } from "@/web3/hooks/use-supporters";
import { useJar } from "@/web3/hooks/use-jar";
export default function SupportersPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useSupporters(currentPage);
  const { jar } = useJar();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const supporters = data?.pages.flatMap((page) => page.supporters) ?? [];

  console.log(data);

  if (isLoading && currentPage === 0) {
    return (
      <div className="container mx-auto p-8 space-y-4">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <HeartIcon className="w-7 h-7 text-accent-purple animate-pulse" />
          Supporters
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
          <HeartIcon className="w-7 h-7 text-accent-purple" />
          Supporters ({jar?.totalSupporters || 0})
        </div>

        <div className="space-y-3">
          {supporters.map((supporter: Supporter, index: number) => (
            <motion.a
              href={`https://solscan.io/account/${supporter.signer.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={`${supporter.signer.toString()}-${supporter.createdAt}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-accent-purple/5 transition-colors gap-2 sm:gap-4"
            >
              <div className="flex-1 flex items-start gap-3 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-purple/10 flex items-center justify-center shrink-0">
                  <CurrencyIcon
                    currency={getCurrencySymbol(supporter.tips[0].currency)}
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-base sm:text-lg truncate">
                      {formatAddress(supporter.signer.toString())}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex flex-col items-end gap-1">
                        {supporter.tips.map((tip: TipInfo) => (
                          <span
                            key={`${tip.currency}-${tip.amount}`}
                            className="font-medium text-sm sm:text-base text-accent-purple whitespace-nowrap"
                          >
                            {tip.amount} {getCurrencySymbol(tip.currency)}
                          </span>
                        ))}
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span>{supporter.tipCount} tips</span>
                  </div>
                </div>
              </div>
            </motion.a>
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
