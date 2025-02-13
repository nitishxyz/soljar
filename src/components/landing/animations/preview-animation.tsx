import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Check, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CurrencyIcon } from "@/components/ui/currency-icon";

export function PreviewAnimation() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [tips, setTips] = useState<
    { amount: number; currency: "SOL" | "USDC" | "USDT" }[]
  >([]);

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Initial delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Step 1: Show wallet button with press animation
      setStep(1);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Simulate button press before transition
      document.querySelector(".wallet-button")?.classList.add("scale-95");
      await new Promise((resolve) => setTimeout(resolve, 150));
      document.querySelector(".wallet-button")?.classList.remove("scale-95");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Transition to step 2
      setStep(1.5);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Step 2: Show username input with smoother typing
      setStep(2);
      const name = "soljar";
      for (let i = 0; i <= name.length; i++) {
        setUsername(name.slice(0, i));
        await new Promise((resolve) =>
          setTimeout(resolve, 80 + Math.random() * 40)
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Transition to step 3
      setStep(2.5);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Step 3: Show tips with fluid animation
      setStep(3);
      setTips([
        { amount: 0.5, currency: "SOL" },
        { amount: 50, currency: "USDC" },
        { amount: 69, currency: "USDC" },
        { amount: 420, currency: "USDT" },
      ]);

      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Transition to reset
      setStep(3.5);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Reset and restart sequence
      setStep(0);
      setUsername("");
      setTips([]);
      await new Promise((resolve) => setTimeout(resolve, 500));

      sequence();
    };

    sequence();
    return () => setStep(0);
  }, []);

  return (
    <div className="max-w-md flex-1 relative">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -40,
              scale: 0.9,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-medium text-muted-foreground text-center leading-relaxed mb-8"
            >
              Connect your wallet to get started
            </motion.p>
            <Button
              variant="outline"
              size="lg"
              className="wallet-button font-medium text-2xl h-16 px-8 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/20"
            >
              <motion.div
                className="absolute inset-0 bg-accent-purple/10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                  background: [
                    "rgba(147, 51, 234, 0.1)",
                    "rgba(147, 51, 234, 0.2)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              <CreditCard className="mr-3 !size-8" />
              Connect Wallet
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 w-full max-w-md"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-medium text-muted-foreground text-center leading-relaxed mb-8"
            >
              Choose your unique username
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="block text-xl text-muted-foreground/80 mt-2"
              >
                This will be your personalized tipping page
              </motion.span>
            </motion.p>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground text-xl">
                soljar.xyz/
              </div>
              <Input
                value={username}
                className="pl-32 !text-2xl h-16 transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-accent-purple/20"
                readOnly
              />
              {username === "soljar" && (
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="absolute right-4 top-1/4 -translate-y-1/2 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <Check className="w-6 h-6 text-green-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <div className="space-y-6 w-full max-w-md">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-medium text-muted-foreground text-center leading-relaxed mb-8"
            >
              Start receiving tips instantly!
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="block text-xl text-muted-foreground/80 mt-2"
              >
                Watch your crypto tips roll in
              </motion.span>
            </motion.p>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent-purple/5 hover:bg-accent-purple/10 transition-all duration-300 border border-accent-purple/10 hover:shadow-lg hover:shadow-accent-purple/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-accent-purple" />
                    </div>
                    <div>
                      <p className="text-base font-medium">New Tip Received!</p>
                      <p className="text-sm text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyIcon currency={tip.currency} className="w-5 h-5" />
                    <span className="font-medium text-lg">
                      {tip.amount} {tip.currency}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
