import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useRecentWithdrawls } from "@/web3/hooks/use-recent-withdrawls";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import {
  fetchTransactionSignature,
  formatCurrencyAmount,
  SOLANA_CLUSTER,
} from "@/web3/utils";
import { getCurrencySymbol } from "@/web3/utils";

const mockWithdrawals = [
  {
    id: "1",
    amount: 1.2,
    currency: 0, // SOL = 0
    timestamp: "2h ago",
    color: "purple" as const,
  },
  {
    id: "2",
    amount: 50,
    currency: 1, // USDC = 1
    timestamp: "1d ago",
    color: "blue" as const,
  },
  {
    id: "3",
    amount: 25,
    currency: 2, // USDT = 2
    timestamp: "3d ago",
    color: "green" as const,
  },
];

export function WithdrawalHistoryCard() {
  const { data: recentWithdrawls, isLoading } = useRecentWithdrawls();
  const { connection } = useConnection();
  const [loadingSignature, setLoadingSignature] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    if (color === "green") {
      return {
        text: "text-green-500",
        hover: "hover:text-green-400",
        bg: "hover:bg-green-500/5",
        iconBg: "bg-green-500/10",
      };
    } else if (color === "blue") {
      return {
        text: "text-blue-500",
        hover: "hover:text-blue-400",
        bg: "hover:bg-blue-500/5",
        iconBg: "bg-blue-500/10",
      };
    }
    return {
      text: `text-accent-${color}`,
      hover: `hover:text-accent-${color}/80`,
      bg: `hover:bg-accent-${color}/5`,
      iconBg: `bg-accent-${color}/10`,
    };
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;

    if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}m ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diff / 86400);
      return `${days}d ago`;
    }
  };

  const formatWithdrawls = recentWithdrawls?.map((withdrawl) => ({
    id: withdrawl.id,
    amount: withdrawl.amount,
    currency: withdrawl.currency, // Now using number-based currency
    timestamp: formatTimeAgo(withdrawl.createdAt),
    color: "purple" as const,
  }));

  const handleWithdrawlClick = async (withdrawl: any) => {
    try {
      setLoadingSignature(withdrawl.id);
      const signature = await fetchTransactionSignature(
        connection,
        withdrawl.id
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

  const renderWithdrawalsList = (
    withdrawls: typeof mockWithdrawals,
    isBlurred = false
  ) => {
    return withdrawls.map((withdrawl, index) => {
      const colors = getColorClasses(withdrawl.color);
      const currencySymbol = getCurrencySymbol(withdrawl.currency);

      return (
        <motion.div
          onClick={() => !isBlurred && handleWithdrawlClick(withdrawl)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={`${withdrawl.id}-${index}`}
          className={`group relative flex items-center justify-between p-3 rounded-lg ${
            colors.bg
          } transition-colors ${
            isBlurred ? "pointer-events-none" : "cursor-pointer"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.iconBg}`}
            >
              <CurrencyIcon currency={currencySymbol} className="w-5 h-5" />
            </div>
            <div
              className={`text-sm font-medium ${colors.text} ${colors.hover} transition-colors`}
            >
              -{formatCurrencyAmount(withdrawl.amount, currencySymbol)}{" "}
              {currencySymbol}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">
              {withdrawl.timestamp}
            </div>
            {loadingSignature === withdrawl.id ? (
              <div className="w-4 h-4 border-2 border-accent-purple border-t-transparent rounded-full animate-spin" />
            ) : (
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <Card className="group relative overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />

      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-accent-purple animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-accent-purple animate-ping opacity-25" />
          </div>
          Recent Withdrawals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 relative">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse flex items-center justify-between p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                    <div className="h-4 w-16 bg-muted rounded" />
                  </div>
                ))
            : formatWithdrawls && formatWithdrawls.length > 0
            ? renderWithdrawalsList(formatWithdrawls)
            : null}
        </div>

        {!formatWithdrawls || formatWithdrawls.length === 0 ? (
          <>
            <div
              className="absolute -inset-px top-20 left-0 right-0 -bottom-5 bg-gradient-to-t from-background via-background/95 to-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-3"
              // style={{ margin: "-1.5rem", marginBottom: "-3.5rem" }}
            >
              <p className="text-sm text-muted-foreground">
                No withdrawals yet
              </p>
              <p className="text-xs text-muted-foreground">
                Withdraw your funds to see them here!
              </p>
            </div>
            {renderWithdrawalsList(mockWithdrawals, true)}
          </>
        ) : null}
        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}
