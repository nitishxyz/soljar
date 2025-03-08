import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, BarChart3, Users, Wallet, Lock } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Shield,
    title: "100% On-Chain",
    description: "No signups, no middlemen. Your funds, your control.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant payments with SOL & USDC. No waiting periods.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Wallet,
    title: "Business Ready",
    description: "From simple tips to invoicing, subscriptions and more.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Track payments, analyze trends, and understand your revenue.",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Lock,
    title: "Self-Custodial",
    description: "Your keys, your crypto. Full control of your funds.",
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "From individual creators to established businesses.",
    gradient: "from-pink-500 to-purple-500",
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
            A complete payment solution built for the web3 era
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ y }}
              className="group relative"
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-accent-purple/10 rounded-2xl p-8 h-full transition-all duration-500 hover:border-accent-purple/20">
                {/* Gradient Background */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl",
                    `bg-gradient-to-br ${benefit.gradient}`
                  )}
                />

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl relative group-hover:scale-105 transition-all duration-500",
                      `bg-gradient-to-r ${benefit.gradient}`
                    )}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm" />
                    {
                      <benefit.icon className="w-full h-full p-5 text-white relative z-10" />
                    }
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Hover Effect Line */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full",
                    `bg-gradient-to-r ${benefit.gradient}`
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
