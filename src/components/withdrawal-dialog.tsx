import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Coins, ArrowDownToLine } from "lucide-react";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { useWithdrawal } from "@/web3/hooks/use-withdrawal";
import { useBalances } from "@/web3/hooks/use-balances";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/wallet-button";
import { getCurrencyFromMint, getMintAddress } from "@/web3/utils";

type Currency = "SOL" | "USDC" | "USDT";

interface WithdrawalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCurrency: Currency;
}

export function WithdrawalDialog({
  isOpen,
  onOpenChange,
  defaultCurrency,
}: WithdrawalDialogProps) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency>(defaultCurrency);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{
    amount: string;
    currency: Currency;
  } | null>(null);

  const { mutateAsync: withdraw } = useWithdrawal();
  const { solBalance, usdcBalance, usdtBalance } = useBalances();
  const wallet = useWallet();

  const currencies: Currency[] = ["SOL", "USDC", "USDT"];

  useEffect(() => {
    setSelectedCurrency(defaultCurrency);
  }, [defaultCurrency]);

  const handleWithdraw = async () => {
    if (!amount || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await withdraw({
        amount: parseFloat(amount),
        mint: getMintAddress(selectedCurrency),
      });

      setSuccessData({
        amount,
        currency: selectedCurrency,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Withdrawal failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSuccessData(null);
    setAmount("");
    onOpenChange(false);
  };

  const disabled = !amount || parseFloat(amount) <= 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="p-6 space-y-6">
          {isSuccess && successData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center"
                >
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground">
                  Withdrawal Successful!
                </h2>
                <p className="text-muted-foreground">
                  Your funds have been sent to your wallet
                </p>
              </div>

              <div className="space-y-4 bg-accent-purple/5 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium flex items-center gap-2">
                    <CurrencyIcon currency={successData.currency} />
                    {successData.amount} {successData.currency}
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  className="w-full h-16 text-lg font-medium bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
                  onClick={handleReset}
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="flex justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-purple/10 to-blue-500/10 flex items-center justify-center backdrop-blur-sm">
                    <ArrowDownToLine className="w-10 h-10 text-accent-purple/80" />
                  </div>
                </motion.div>
                <h1 className="text-2xl font-bold text-foreground/90">
                  Withdraw Funds
                </h1>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currencies.map((currency) => (
                  <motion.div
                    key={currency}
                    whileHover={{ scale: !isSubmitting ? 1.02 : 1 }}
                    whileTap={{ scale: !isSubmitting ? 0.98 : 1 }}
                  >
                    <Button
                      variant={
                        selectedCurrency === currency ? "default" : "outline"
                      }
                      className={`w-full flex items-center justify-center gap-2 h-14 transition-all duration-200 ${
                        selectedCurrency === currency
                          ? `bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple border-accent-purple/20`
                          : "hover:bg-accent-purple/5"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      onClick={() => setSelectedCurrency(currency)}
                      disabled={isSubmitting}
                    >
                      <CurrencyIcon currency={currency} className="w-6 h-6" />
                      {currency}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex items-center justify-between text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Coins className="w-4 h-4" />
                  Available Balance
                </div>
                <div className="flex items-center gap-2 text-foreground/90">
                  <CurrencyIcon
                    currency={selectedCurrency}
                    className="w-4 h-4"
                  />
                  {selectedCurrency === "SOL" &&
                    `${solBalance?.toFixed(4) ?? "0"} SOL`}
                  {selectedCurrency === "USDC" &&
                    `${usdcBalance?.toFixed(2) ?? "0"} USDC`}
                  {selectedCurrency === "USDT" &&
                    `${usdtBalance?.toFixed(2) ?? "0"} USDT`}
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={isSubmitting}
                      className={`w-full h-32 bg-background/50 rounded-xl leading-none font-medium px-6 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 transition-all border border-accent-purple/10 hover:border-accent-purple/20 focus:border-accent-purple/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-24 disabled:opacity-50 disabled:cursor-not-allowed ${
                        amount.length > 12
                          ? "text-[30px]"
                          : amount.length > 9
                          ? "text-[40px]"
                          : amount.length > 7
                          ? "text-[50px]"
                          : amount.length > 5
                          ? "text-[60px]"
                          : "text-[70px]"
                      }`}
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-muted-foreground/70 font-medium">
                      {selectedCurrency}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {wallet.connected ? (
                  <motion.div
                    whileHover={{ scale: !disabled ? 1.01 : 1 }}
                    whileTap={{ scale: !disabled ? 0.99 : 1 }}
                  >
                    <Button
                      className="w-full h-16 text-lg font-medium bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
                      onClick={handleWithdraw}
                      disabled={disabled || isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0v4c4.418 0 8 3.582 8 8z"
                            ></path>
                          </svg>
                          Withdrawing...
                        </span>
                      ) : (
                        "Withdraw"
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <WalletButton className="w-full h-16" />
                )}
              </motion.div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
