import { motion } from "framer-motion";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { Button } from "@/components/ui/button";

type SuccessViewProps = {
  successData: {
    amount: string;
    currency: "SOL" | "USDC" | "USDT";
    recipient: string;
  };
  onReset: () => void;
};

export function SuccessView({ successData, onReset }: SuccessViewProps) {
  return (
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
          onClick={onReset}
        >
          Send Another Tip
        </Button>
      </motion.div>
    </motion.div>
  );
}
