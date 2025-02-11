import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Coins, ArrowDownToLine } from "lucide-react";
import { useIndex } from "@/web3/hooks/use-index";

export function TotalsCard() {
  const { index, isIndexLoading } = useIndex();

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
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Total Tips */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                <Coins className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {isIndexLoading ? "..." : index?.totalDeposits ?? 0}
                </div>
                <div className="text-sm text-muted-foreground">Total Tips</div>
              </div>
            </div>
          </div>

          {/* Total Withdrawals */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <ArrowDownToLine className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {isIndexLoading ? "..." : index?.totalWithdrawals ?? 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Withdrawals
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </CardContent>
    </Card>
  );
}
