import { motion, useScroll, useTransform } from "framer-motion";
import { Wallet, Link, ArrowDownToLine } from "lucide-react";
import { useRef } from "react";
import { SetupAnimation } from "./animations/setup-animation";
import { ShareAnimation } from "./animations/share-animation";
import { ReceiveAnimation } from "./animations/receive-animation";

const steps = [
  {
    title: "Set Up Your Jar",
    description:
      "Connect your wallet & create your on-chain treasury in seconds.",
    gradient: "from-purple-500/20 to-purple-600/20",
    glowColor: "purple",
    Animation: SetupAnimation,
  },
  {
    title: "Share Your Link",
    description:
      "Generate a button or link to embed anywhere or share directly.",
    gradient: "from-blue-500/20 to-blue-600/20",
    glowColor: "blue",
    Animation: ShareAnimation,
  },
  {
    title: "Receive Tips",
    description: "Get SOL & USDC directly to your wallet or treasury.",
    gradient: "from-green-500/20 to-green-600/20",
    glowColor: "green",
    Animation: ReceiveAnimation,
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          opacity,
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
              Simple as 1-2-3
            </h2>
          </motion.div>
          <p className="text-xl text-muted-foreground">
            Start accepting crypto tips in minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Animated connection lines */}
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px -translate-y-1/2">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-purple/30 via-blue-500/30 to-green-500/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ y }}
              className="relative group"
            >
              <div className="relative">
                <motion.div
                  className={`absolute -inset-px rounded-xl bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500`}
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                />

                <div className="relative z-10 bg-card/50 backdrop-blur-sm border border-accent-purple/10 rounded-xl p-8 transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:border-accent-purple/20 h-[300px] flex flex-col justify-between">
                  <div className="flex flex-col items-center text-center h-full">
                    <step.Animation />

                    <div className="flex-1 flex flex-col justify-center space-y-3">
                      <motion.h3
                        className="text-2xl font-semibold"
                        initial={{ opacity: 0.5 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Step number indicator */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-accent-purple/10 flex items-center justify-center text-sm font-medium text-accent-purple"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.2, type: "spring" }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
