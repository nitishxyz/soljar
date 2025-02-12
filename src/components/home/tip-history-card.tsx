import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useRecentDeposits } from "@/web3/hooks/use-recent-deposits";
import { Currency } from "@/web3/utils";
import { fetchTransactionSignature, SOLANA_CLUSTER } from "@/web3/utils";
import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useTokenPrices } from "@/web3/hooks/use-token-prices";

const mockRecentTips = [
  {
    id: "mock1",
    amount: 0.5,
    currency: "SOL",
    usdPrice: 98.45,
    from: "wallet.sol",
    timestamp: "2h ago",
    color: "purple" as const,
    signature: "mock1",
  },
  {
    id: "mock2",
    amount: 0.3,
    currency: "SOL",
    usdPrice: 98.45,
    from: "user.sol",
    timestamp: "5h ago",
    color: "purple" as const,
    signature: "mock2",
  },
];

export function TipHistoryCard() {
  const { data: recentDeposits, isLoading } = useRecentDeposits();
  const { data: prices } = useTokenPrices();
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
    const now = Date.now() / 1000; // Convert to seconds
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

  const formatDeposits = recentDeposits?.map((deposit: any) => ({
    id: `${deposit.signer.toString()}-${deposit.createdAt}`,
    amount: deposit.amount,
    currency: "SOL" as Currency, // Since currencyMint is SOL's native mint
    usdPrice: prices?.SOL ?? 0, // Use real-time price
    from:
      deposit.signer.toString().slice(0, 4) +
      "..." +
      deposit.signer.toString().slice(-4),
    timestamp: formatTimeAgo(deposit.createdAt),
    color: "purple" as const,
    signature: deposit.signer.toString(),
  }));

  const handleTipClick = async (tip: any) => {
    try {
      setLoadingSignature(tip.signature);
      const signature = await fetchTransactionSignature(
        connection,
        tip.signature
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

  const renderTipsList = (tips: typeof mockRecentTips, isBlurred = false) => {
    return tips.map((tip, index) => {
      const colors = getColorClasses(tip.color);
      return (
        <motion.div
          onClick={() => !isBlurred && handleTipClick(tip)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={tip.id}
          className={`group relative flex items-center justify-between py-3 px-4 rounded-lg ${
            colors.bg
          } transition-colors ${
            isBlurred ? "pointer-events-none" : "cursor-pointer"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.iconBg}`}
            >
              <CurrencyIcon
                currency={tip.currency as Currency}
                className="w-5 h-5"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{tip.from}</p>
              <p className="text-xs text-muted-foreground">{tip.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p
              className={`font-medium text-sm ${colors.text} ${colors.hover} transition-colors`}
            >
              +{tip.amount} {tip.currency}
            </p>
            <span className="text-xs text-muted-foreground">
              (≈${(tip.amount * tip.usdPrice).toFixed(2)})
            </span>
            {loadingSignature === tip.signature ? (
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
    <Card className="overflow-hidden relative group">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-accent-purple animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-accent-purple animate-ping opacity-25" />
          </div>
          Recent Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 relative">
          {isLoading
            ? // Add loading skeleton
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse flex items-center justify-between py-3 px-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-muted" />
                      <div>
                        <div className="h-4 w-24 bg-muted rounded" />
                        <div className="h-3 w-16 bg-muted rounded mt-2" />
                      </div>
                    </div>
                    <div className="h-4 w-32 bg-muted rounded" />
                  </div>
                ))
            : formatDeposits && formatDeposits.length > 0
            ? renderTipsList(formatDeposits)
            : null}
        </div>
      </CardContent>
      {!formatDeposits || formatDeposits.length === 0 ? (
        <>
          <div className="absolute -inset-px top-20 left-0 right-0 -bottom-5 bg-gradient-to-t from-background via-background/95 to-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-muted-foreground">No tips yet</p>
            <p className="text-xs text-muted-foreground">
              Share your link to start receiving tips!
            </p>
          </div>
          {renderTipsList(mockRecentTips, true)}
        </>
      ) : null}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
    </Card>
  );
}
