import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, ArrowDownToLine } from "lucide-react";

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
        <div className="space-y-3">
          {mockWithdrawals.map((withdrawal, index) => {
            const colors = getColorClasses(withdrawal.color);
            return (
              <motion.a
                href={`https://solscan.io/tx/${withdrawal.signature}`}
                target="_blank"
                rel="noopener noreferrer"
                key={withdrawal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative flex items-center justify-between p-3 rounded-lg ${colors.bg} transition-colors cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.iconBg}`}
                  >
                    {/* Placeholder for currency icons - we'll update these later */}
                    <ArrowDownToLine className={`w-4 h-4 ${colors.text}`} />
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
          })}
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}
