import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, ArrowDownToLine } from "lucide-react";
import { useRecentWithdrawals } from "@/hooks/use-recent-withdrawals";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { Currency } from "@/web3/utils";

const mockWithdrawals = [
  {
    id: 1,
    amount: 1.2,
    currency: "SOL",
    timestamp: "2h ago",
    color: "purple" as const,
    signature: "1234567890",
  },
  {
    id: 2,
    amount: 50,
    currency: "USDC",
    timestamp: "1d ago",
    color: "blue" as const,
    signature: "1234567890",
  },
  {
    id: 3,
    amount: 25,
    currency: "USDT",
    timestamp: "3d ago",
    color: "green" as const,
    signature: "1234567890",
  },
];

export function WithdrawalHistoryCard() {
  const { data: recentWithdrawals, isLoading } = useRecentWithdrawals();

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

  // const formatWithdrawals = recentWithdrawals?.map((withdrawal) => ({
  //   id: withdrawal.jar.toString(),
  //   amount: withdrawal.amount,
  //   currency: "SOL" as Currency, // Since we only support SOL withdrawals for now
  //   timestamp: formatTimeAgo(withdrawal.createdAt),
  //   color: "purple" as const,
  //   signature: withdrawal.jar.toString(),
  // }));
  const formatWithdrawals = [];

  const renderWithdrawalsList = (
    withdrawals: typeof mockWithdrawals,
    isBlurred = false
  ) => {
    return withdrawals.map((withdrawal, index) => {
      const colors = getColorClasses(withdrawal.color);
      return (
        <motion.a
          href={
            isBlurred
              ? undefined
              : `https://solscan.io/tx/${withdrawal.signature}`
          }
          target="_blank"
          rel="noopener noreferrer"
          key={withdrawal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
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
              <CurrencyIcon
                currency={withdrawal.currency as Currency}
                className="w-5 h-5"
              />
            </div>
            <div
              className={`text-sm font-medium ${colors.text} ${colors.hover} transition-colors`}
            >
              -{withdrawal.amount} {withdrawal.currency}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">
              {withdrawal.timestamp}
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.a>
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
          {isLoading ? (
            Array(4)
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
          ) : (
            <>
              <div
                className="absolute -inset-px top-0 left-0 right-0 -bottom-10 bg-gradient-to-t from-background via-background/95 to-background/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-3"
                style={{ margin: "-1.5rem", marginBottom: "-3.5rem" }}
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
          )}
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}
