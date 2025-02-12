import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBalances } from "@/web3/hooks/use-balances";
import { ArrowDownToLine } from "lucide-react";
import { WithdrawalDialog } from "@/components/withdrawal-dialog";
import { useState } from "react";
import { useTokenPrices } from "@/web3/hooks/use-token-prices";

export function BalanceCards() {
  const { solBalance, usdcBalance, usdtBalance, isLoading } = useBalances();
  const { data: prices } = useTokenPrices();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    "SOL" | "USDC" | "USDT"
  >("SOL");

  const handleWithdrawClick = (currency: "SOL" | "USDC" | "USDT") => {
    setSelectedCurrency(currency);
    setIsDialogOpen(true);
  };

  // Calculate USD values
  const solUsdValue = (solBalance ?? 0) * (prices?.SOL ?? 0);
  const usdcUsdValue = (usdcBalance ?? 0) * (prices?.USDC ?? 1);
  const usdtUsdValue = (usdtBalance ?? 0) * (prices?.USDT ?? 1);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-purple-50 via-purple-100/50 to-white dark:from-purple-950/20 dark:via-purple-900/10 dark:to-background border-2 relative overflow-hidden backdrop-blur-xl flex flex-col h-full min-h-[220px]">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] group-hover:bg-grid-black/[0.03] dark:group-hover:bg-grid-white/[0.03] transition-colors" />
          <div className="absolute h-32 w-32 -top-16 -right-16 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-500" />
          <CardHeader className="space-y-4 relative h-full flex flex-col justify-between">
            <div className="space-y-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-purple-500 animate-ping opacity-25" />
                </div>
                SOL Balance
              </CardTitle>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-300 relative">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 absolute inset-0 transition-opacity duration-300">
                    {solBalance} SOL
                  </span>
                  <span className="group-hover:opacity-0 transition-opacity duration-300">
                    {solBalance} SOL
                  </span>
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-purple-500 transition-colors flex items-center gap-1">
                  <span>≈ ${solUsdValue.toFixed(2)} USD</span>
                  <span className="inline-block transition-transform group-hover:rotate-12">
                    💰
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-all duration-300 group-hover:scale-105"
              onClick={() => handleWithdrawClick("SOL")}
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </CardHeader>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        </Card>

        <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-blue-50 via-blue-100/50 to-white dark:from-blue-950/20 dark:via-blue-900/10 dark:to-background border-2 relative overflow-hidden backdrop-blur-xl flex flex-col h-full min-h-[250px]">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] group-hover:bg-grid-black/[0.03] dark:group-hover:bg-grid-white/[0.03] transition-colors" />
          <div className="absolute h-32 w-32 -top-16 -right-16 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 group-hover:scale-150 transition-all duration-500" />
          <CardHeader className="space-y-4 relative h-full flex flex-col justify-between">
            <div className="space-y-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-blue-500 animate-ping opacity-25" />
                </div>
                USDC Balance
              </CardTitle>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-300 relative">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 absolute inset-0 transition-opacity duration-300">
                    {usdcBalance} USDC
                  </span>
                  <span className="group-hover:opacity-0 transition-opacity duration-300">
                    {usdcBalance} USDC
                  </span>
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-blue-500 transition-colors flex items-center gap-1">
                  <span>≈ ${usdcUsdValue.toFixed(2)} USD</span>
                  <span className="inline-block transition-transform group-hover:rotate-12">
                    💰
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 group-hover:scale-105"
              onClick={() => handleWithdrawClick("USDC")}
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </CardHeader>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        </Card>

        <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-green-50 via-green-100/50 to-white dark:from-green-950/20 dark:via-green-900/10 dark:to-background border-2 relative overflow-hidden backdrop-blur-xl flex flex-col h-full min-h-[250px]">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] group-hover:bg-grid-black/[0.03] dark:group-hover:bg-grid-white/[0.03] transition-colors" />
          <div className="absolute h-32 w-32 -top-16 -right-16 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 group-hover:scale-150 transition-all duration-500" />
          <CardHeader className="space-y-4 relative h-full flex flex-col justify-between">
            <div className="space-y-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <div className="relative">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-500 animate-ping opacity-25" />
                </div>
                USDT Balance
              </CardTitle>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-300 relative">
                  <span className="bg-gradient-to-r from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 absolute inset-0 transition-opacity duration-300">
                    {usdtBalance} USDT
                  </span>
                  <span className="group-hover:opacity-0 transition-opacity duration-300">
                    {usdtBalance} USDT
                  </span>
                </p>
                <p className="text-sm text-muted-foreground group-hover:text-green-500 transition-colors flex items-center gap-1">
                  <span>≈ ${usdtUsdValue.toFixed(2)} USD</span>
                  <span className="inline-block transition-transform group-hover:rotate-12">
                    💰
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-all duration-300 group-hover:scale-105"
              onClick={() => handleWithdrawClick("USDT")}
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </CardHeader>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        </Card>
      </div>

      <WithdrawalDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        defaultCurrency={selectedCurrency}
      />
    </>
  );
}
