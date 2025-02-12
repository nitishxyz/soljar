"use client";
import { useWithdrawls } from "@/web3/hooks/use-withdrawls";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import { formatAddress, getCurrencyFromMint } from "@/web3/utils";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useInView } from "react-intersection-observer";

export default function WithdrawlsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, fetchNextPage, hasNextPage } = useWithdrawls(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading && currentPage === 0) {
    return (
      <div className="container mx-auto p-8 space-y-4">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <BanknotesIcon className="w-7 h-7 text-accent-purple animate-pulse" />
          Withdrawals
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
          <BanknotesIcon className="w-7 h-7 text-accent-purple" />
          Withdrawals ({data?.totalwithdrawls || 0})
        </div>

        <div className="space-y-3">
          {data?.withdrawls.map((withdrawl, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={`${withdrawl.signer?.toString()}-${withdrawl.createdAt}`}
              className="flex items-center justify-between py-4 px-6 rounded-lg hover:bg-accent-purple/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                  <CurrencyIcon
                    currency={getCurrencyFromMint(withdrawl.currencyMint)}
                    className="w-7 h-7"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-lg">
                    {formatAddress(withdrawl.signer?.toString())}
                  </p>
                  <span className="text-sm text-muted-foreground">
                    {formatDistance(
                      new Date(withdrawl.createdAt * 1000),
                      new Date(),
                      { addSuffix: true }
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-medium text-lg text-accent-purple">
                  {withdrawl.amount}{" "}
                  {getCurrencyFromMint(withdrawl.currencyMint)}
                </span>
                {withdrawl.transactionId && (
                  <a
                    href={`https://solscan.io/tx/${withdrawl.transactionId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-accent-purple flex items-center gap-1"
                  >
                    View Transaction <ExternalLink className="w-3 h-3" />
                  </a>
                )}
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
