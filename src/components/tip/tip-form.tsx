import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WalletButton } from "@/components/wallet-button";
import { Coins } from "lucide-react";
import { CurrencySelector } from "./currency-selector";

type Currency = "SOL" | "USDC" | "USDT";

type TipFormProps = {
  username: string;
  selectedCurrency: Currency;
  onCurrencySelect: (currency: Currency) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  message: string;
  onMessageChange: (message: string) => void;
  isSubmitting: boolean;
  disabled: boolean;
  onSubmit: () => void;
  isWalletConnected: boolean;
  onDisconnect: () => void;
};

export function TipForm({
  username,
  selectedCurrency,
  onCurrencySelect,
  amount,
  onAmountChange,
  message,
  onMessageChange,
  isSubmitting,
  disabled,
  onSubmit,
  isWalletConnected,
  onDisconnect,
}: TipFormProps) {
  return (
    <div className="space-y-8 py-4 sm:py-6 md:py-8">
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
        <h1 className="text-4xl font-bold text-foreground/90">Send a Tip</h1>
        <p className="text-muted-foreground text-lg">
          Support {username ? username : "this creator"} with crypto
        </p>
      </motion.div>

      <CurrencySelector
        selectedCurrency={selectedCurrency}
        onCurrencySelect={onCurrencySelect}
        isSubmitting={isSubmitting}
      />

      {/* Amount Input and Message sections */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Amount Input */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
          <div className="relative">
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
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

        <Textarea
          placeholder="Add a message (optional)"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          disabled={isSubmitting}
          maxLength={25}
          className="min-h-[100px] text-lg bg-background/50 border-accent-purple/20 focus:border-accent-purple/30 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        {isWalletConnected ? (
          <>
            <motion.div
              whileHover={{ scale: !disabled ? 1.01 : 1 }}
              whileTap={{ scale: !disabled ? 0.99 : 1 }}
            >
              <Button
                className="w-full h-16 text-lg font-medium bg-accent-purple hover:bg-accent-purple/90 transition-colors duration-200"
                onClick={onSubmit}
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
              className="w-full h-12 text-muted-foreground hover:text-foreground border-accent-purple/20 hover:border-accent-purple/30 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onDisconnect}
              disabled={isSubmitting}
            >
              Disconnect Wallet
            </Button>
          </>
        ) : (
          <WalletButton className="w-full h-16" />
        )}
      </motion.div>
    </div>
  );
}
