import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CurrencyIcon } from "@/components/ui/currency-icon";

type Currency = "SOL" | "USDC" | "USDT";

type CurrencySelectorProps = {
  selectedCurrency: Currency;
  onCurrencySelect: (currency: Currency) => void;
  isSubmitting: boolean;
};

export function CurrencySelector({
  selectedCurrency,
  onCurrencySelect,
  isSubmitting,
}: CurrencySelectorProps) {
  const currencies: Currency[] = ["SOL", "USDC", "USDT"];

  return (
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
            variant={selectedCurrency === currency ? "default" : "outline"}
            className={`w-full flex items-center justify-center gap-2 h-14 transition-all duration-200 ${
              selectedCurrency === currency
                ? `bg-accent-purple/10 hover:bg-accent-purple/20 text-accent-purple border-accent-purple/20`
                : "hover:bg-accent-purple/5"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => onCurrencySelect(currency)}
            disabled={isSubmitting}
          >
            <CurrencyIcon currency={currency} className="w-6 h-6" />
            {currency}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
