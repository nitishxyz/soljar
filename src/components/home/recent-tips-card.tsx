import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";

const mockRecentTips = [
  {
    id: 1,
    amount: 0.5,
    currency: "SOL",
    usdPrice: 98.45,
    from: "alex.sol",
    timestamp: "2h ago",
    color: "purple" as const,
    signature: "1234567890",
  },
  {
    id: 2,
    amount: 25,
    currency: "USDC",
    usdPrice: 1,
    from: "maria.sol",
    timestamp: "5h ago",
    color: "blue" as const,
    signature: "1234567890",
  },
  {
    id: 3,
    amount: 15.5,
    currency: "USDT",
    usdPrice: 1,
    from: "john.sol",
    timestamp: "1d ago",
    color: "green" as const,
    signature: "1234567890",
  },
  {
    id: 4,
    amount: 0.8,
    currency: "SOL",
    usdPrice: 98.45,
    from: "sarah.sol",
    timestamp: "1d ago",
    color: "purple" as const,
    signature: "1234567890",
  },
];

export function RecentTipsCard() {
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
        <div className="space-y-3">
          {mockRecentTips.map((tip, index) => {
            const colors = getColorClasses(tip.color);
            return (
              <motion.a
                href={`https://solscan.io/tx/${tip.signature}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={tip.id}
                className={`group relative flex items-center justify-between py-3 px-4 rounded-lg ${colors.bg} transition-colors cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${colors.iconBg}`}
                  >
                    <CurrencyIcon
                      currency={tip.currency as "SOL" | "USDC" | "USDT"}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{tip.from}</p>
                    <p className="text-xs text-muted-foreground">
                      {tip.timestamp}
                    </p>
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
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}
