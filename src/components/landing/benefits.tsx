import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, BarChart3, Users, Wallet, Lock } from "lucide-react";
import { useRef } from "react";

const benefits = [
  {
    icon: Shield,
    title: "100% On-Chain",
    description: "No signups, no middlemen. Your funds, your control.",
    gradient: "from-violet-500/20 to-purple-500/20",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant payments with SOL & USDC. No waiting periods.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    delay: 0.1,
  },
  {
    icon: Wallet,
    title: "Easy Withdrawals",
    description: "Withdraw to your wallet anytime, instantly and securely.",
    gradient: "from-green-500/20 to-emerald-500/20",
    delay: 0.2,
  },
  {
    icon: BarChart3,
    title: "Track Everything",
    description: "See where your tips come from and analyze trends.",
    gradient: "from-orange-500/20 to-amber-500/20",
    delay: 0.3,
  },
  {
    icon: Lock,
    title: "Self-Custodial",
    description: "Your keys, your crypto. Full control of your funds.",
    gradient: "from-red-500/20 to-rose-500/20",
    delay: 0.4,
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Perfect for developers, creators, and organizations.",
    gradient: "from-pink-500/20 to-purple-500/20",
    delay: 0.5,
  },
];

export function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60]);

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, transparent 70%)",
          opacity,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent pb-[2px]">
              Why Choose Soljar?
            </h2>
          </motion.div>
          <p className="text-xl text-muted-foreground">
            Built for the web3 era, designed for simplicity
          </p>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-accent-purple/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: benefit.delay }}
              style={{ y }}
              className="group relative"
            >
              {/* Card glow effect */}
              <motion.div
                className={`absolute -inset-px rounded-xl bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500`}
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              />

              <div className="relative bg-card/50 backdrop-blur-sm border border-accent-purple/10 rounded-xl p-6 h-full transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:border-accent-purple/20">
                <div className="flex flex-col space-y-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="p-3 rounded-lg bg-accent-purple/10 w-fit group-hover:bg-accent-purple/20 transition-colors"
                  >
                    <benefit.icon className="w-6 h-6 text-accent-purple" />
                  </motion.div>

                  <motion.h3
                    className="text-xl font-semibold"
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {benefit.title}
                  </motion.h3>

                  <p className="text-muted-foreground">{benefit.description}</p>

                  {/* Decorative line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
