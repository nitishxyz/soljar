"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  const scrollToDemo = () => {
    const demoSection = document.querySelector("#live-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute h-48 w-48 blur-3xl bg-accent-purple/20 rounded-full -top-12 -left-12 animate-pulse" />
      <div className="absolute h-48 w-48 blur-3xl bg-blue-500/20 rounded-full -bottom-12 -right-12 animate-pulse delay-300" />

      <div className="container mx-auto px-2 sm:px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full">
          {/* Left Column - Text Content */}
          <motion.div
            className="flex-1 space-y-6 max-w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold break-words">
              <span className="bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
                Crypto Tips &
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
                Sponsorships,
              </span>
              <br />
              Made Simple.
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground">
              Accept SOL & USDC instantly. No signups. Just a link.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                size="lg"
                className="h-14 text-lg bg-accent-purple hover:bg-accent-purple/90"
                onClick={() => router.push("/start")}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 text-lg group"
                onClick={scrollToDemo}
              >
                Try Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground pt-4">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span>
                Generate a button or link, share it, and start receiving tips
                today.
              </span>
            </div>
          </motion.div>

          {/* Right Column - Preview */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-blue-500/10 rounded-xl blur-xl" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-accent-purple/20 rounded-xl p-6 shadow-2xl">
                {/* Preview content here */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent-purple/10" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-accent-purple/10 rounded" />
                      <div className="h-3 w-32 bg-muted rounded" />
                    </div>
                  </div>
                  <div className="h-24 bg-accent-purple/5 rounded-lg" />
                  <div className="flex gap-2">
                    <div className="h-10 w-20 bg-accent-purple/10 rounded" />
                    <div className="h-10 w-20 bg-blue-500/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
