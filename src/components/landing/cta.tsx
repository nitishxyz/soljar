"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function CTA() {
  const router = useRouter();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
              Start Accepting Tips Today
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the future of digital payments. Create your Soljar in seconds
              and start receiving tips in SOL, USDC, and USDT.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                className="h-12 px-8 text-lg bg-accent-purple hover:bg-accent-purple/90"
                onClick={() => router.push("/start")}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <motion.a
                href="/docs"
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 text-accent-purple hover:text-accent-purple/80 transition-colors"
              >
                View Documentation <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
