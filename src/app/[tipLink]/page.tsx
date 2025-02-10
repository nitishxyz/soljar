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

type Currency = "SOL" | "USDC" | "USDT";

export default function TipPage({ params }: { params: { tipLinkId: string } }) {
  const { connected, disconnect } = useWallet();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("SOL");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const currencies: Currency[] = ["SOL", "USDC", "USDT"];
  const colorMap = {
    SOL: "purple",
    USDC: "blue",
    USDT: "green",
  };

  const handleSendTip = async () => {
    console.log("Sending tip:", {
      amount,
      currency: selectedCurrency,
      message,
      tipLinkId: params.tipLinkId,
    });
  };

  const disabled = useMemo(() => {
    return !amount || parseFloat(amount) <= 0;
  }, [amount]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent-purple/5 to-blue-500/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-card/95 p-4 sm:p-8 space-y-6 sm:space-y-10 shadow-xl border border-accent-purple/10">
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
              Support this creator with crypto
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
            {connected ? (
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: !disabled ? 1.01 : 1 }}
                  whileTap={{ scale: !disabled ? 0.99 : 1 }}
                >
                  <Button
                    className="w-full h-16 text-lg font-medium bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
                    onClick={handleSendTip}
                    disabled={disabled}
                  >
                    Send Tip
                  </Button>
                </motion.div>
                <Button
                  variant="outline"
                  className="w-full h-12 text-muted-foreground hover:text-foreground border-accent-purple/20 hover:border-accent-purple/30"
                  onClick={disconnect}
                >
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <WalletButton className="w-full h-16" />
            )}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
