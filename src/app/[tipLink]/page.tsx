"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useTipLink } from "@/web3/hooks/use-tip-link";
import Loading from "../loading/page";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { convertAmountToSmallestUnit, getMintAddress } from "@/web3/utils";
import { useToast } from "@/hooks/use-toast";

type Currency = "SOL" | "USDC" | "USDT";

export default function TipPage() {
  const { tipLink } = useParams();
  const { getTipLink, createDeposit } = useTipLink(tipLink as string);
  const wallet = useWallet();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("SOL");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{
    amount: string;
    currency: Currency;
    recipient: string;
  } | null>(null);

  const currencies: Currency[] = ["SOL", "USDC", "USDT"];
  const colorMap = {
    SOL: "purple",
    USDC: "blue",
    USDT: "green",
  };

  const disabled = useMemo(() => {
    return !amount || parseFloat(amount) <= 0;
  }, [amount]);

  const { data, isLoading } = getTipLink;

  if (isLoading) return <Loading />;

  if (!data) return <div>Tip link not found</div>;

  const { tipLink: tipLinkData, user } = data;

  const handleSendTip = async () => {
    if (!wallet.publicKey) return;

    setIsSubmitting(true);
    try {
      const amountInSmallestUnit = convertAmountToSmallestUnit(
        parseFloat(amount),
        selectedCurrency
      );

      if (selectedCurrency === "SOL") {
        await createDeposit.mutateAsync({
          amount: amountInSmallestUnit,
          mint: PublicKey.default,
          memo: message,
        });
      } else {
        const mint = getMintAddress(selectedCurrency);
        const sourceTokenAccount = await getAssociatedTokenAddress(
          mint,
          wallet.publicKey
        );

        await createDeposit.mutateAsync({
          amount: amountInSmallestUnit,
          mint,
          memo: message,
          sourceTokenAccount,
        });
      }

      // Set success data
      setSuccessData({
        amount,
        currency: selectedCurrency,
        recipient: user.username || "Anonymous",
      });
      setIsSuccess(true);

      toast({
        title: "Tip sent successfully!",
        description: `You sent ${amount} ${selectedCurrency} to ${user.username}`,
      });

      // Reset form
      setAmount("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Failed to send tip",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error sending tip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this new function to handle resetting the form
  const handleReset = () => {
    setIsSuccess(false);
    setSuccessData(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent-purple/5 to-blue-500/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-card/95 p-4 sm:p-8 space-y-6 sm:space-y-10 shadow-xl border border-accent-purple/10">
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
                  Tip Sent Successfully!
                </h2>
                <p className="text-muted-foreground">
                  Your tip has been sent and received
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
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Recipient</span>
                  <span className="font-medium">{successData.recipient}</span>
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
                  Send Another Tip
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
                    <Coins className="w-10 h-10 text-accent-purple/80" />
                  </div>
                </motion.div>
                <h1 className="text-4xl font-bold text-foreground/90">
                  Send a Tip
                </h1>
                <p className="text-muted-foreground text-lg">
                  Support {user.username ? user.username : "this creator"} with
                  crypto
                </p>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={
                        selectedCurrency === currency ? "default" : "outline"
                      }
                      className={`w-full flex items-center justify-center gap-2 h-14 transition-all duration-200 ${
                        selectedCurrency === currency
                          ? `bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple border-accent-purple/20`
                          : "hover:bg-accent-purple/5"
                      }`}
                      onClick={() => setSelectedCurrency(currency)}
                    >
                      <CurrencyIcon currency={currency} className="w-6 h-6" />
                      {currency}
                    </Button>
                  </motion.div>
                ))}
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
                      className={`w-full h-32 bg-background/50 rounded-xl leading-none font-medium px-6 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 transition-all border border-accent-purple/10 hover:border-accent-purple/20 focus:border-accent-purple/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-24 ${
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

                <Textarea
                  placeholder="Add a message (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] text-lg bg-background/50 border-accent-purple/20 focus:border-accent-purple/30 transition-colors resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {wallet.connected ? (
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: !disabled ? 1.01 : 1 }}
                      whileTap={{ scale: !disabled ? 0.99 : 1 }}
                    >
                      <Button
                        className="w-full h-16 text-lg font-medium bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
                        onClick={handleSendTip}
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
                            Sending...
                          </span>
                        ) : (
                          "Send Tip"
                        )}
                      </Button>
                    </motion.div>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-muted-foreground hover:text-foreground border-accent-purple/20 hover:border-accent-purple/30"
                      onClick={wallet.disconnect}
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <WalletButton className="w-full h-16" />
                )}
              </motion.div>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
