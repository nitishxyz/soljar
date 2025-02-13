import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TipView } from "../tip/tip-view";

export function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="live-demo"
      className="py-24 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, transparent 70%)",
          opacity,
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
            Try It Now
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the seamless tipping flow
          </p>
        </motion.div>

        <div className=" mx-auto">
          <TipView tipLinkId="nitishxyz" isDemo={true} />
        </div>
      </div>
    </section>
  );
}
