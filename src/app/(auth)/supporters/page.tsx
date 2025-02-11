"use client";
import { useSupporters } from "@/web3/hooks/use-supporters";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import { formatAddress, getCurrencyFromMint } from "@/web3/utils";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useInView } from "react-intersection-observer";

export default function SupportersPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useSupporters(currentPage);
  const { ref, inView } = useInView();

  // Load more when the last element comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      setCurrentPage((p) => p + 1);
    }
  }, [inView, hasNextPage]);

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
          <HeartIcon className="w-7 h-7 text-accent-purple" />
          Supporters ({data?.totalSupporters || 0})
        </div>

        <div className="space-y-3">
          {data?.supporters.map((supporter, index) => (
            <motion.a
              href={`https://solscan.io/account/${supporter.signer.toString()}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={supporter.signer.toString()}
              className="group flex items-center justify-between py-4 px-6 rounded-lg hover:bg-accent-purple/5 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                  <CurrencyIcon
                    currency={getCurrencyFromMint(supporter.mint)}
                    className="w-7 h-7"
                  />
                </div>
                <div>
                  <p className="font-medium text-lg">
                    {formatAddress(supporter.signer.toString())}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(
                      new Date(supporter.updatedAt * 1000),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-medium text-lg text-accent-purple hover:text-accent-purple/80 transition-colors">
                  {supporter.tipCount} tips
                </p>
                <span className="text-sm text-muted-foreground">
                  ({supporter.amount} {getCurrencyFromMint(supporter.mint)})
                </span>
                <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
