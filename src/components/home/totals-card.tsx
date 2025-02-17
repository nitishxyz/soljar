import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Coins, ArrowDownToLine } from "lucide-react";

import { HeartIcon } from "@heroicons/react/24/outline";
import { useJar } from "@/web3/hooks/use-jar";
export function TotalsCard() {
  const { jar, isJarLoading } = useJar();

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
          Platform Totals
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-16">
          {/* Total Tips */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center mb-4">
              <Coins className="w-8 h-8 text-accent-purple" />
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1">
              {isJarLoading ? "..." : jar?.totalDeposits ?? 0}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Tips
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <ArrowDownToLine className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1">
              {isJarLoading ? "..." : jar?.totalWithdrawls ?? 0}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Withdrawals
            </div>
          </div>

          {/* Total Supporters */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <HeartIcon className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold tracking-tight mb-1">
              {isJarLoading ? "..." : jar?.totalSupporters ?? 0}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Supporters
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}
