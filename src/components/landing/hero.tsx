"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { PreviewAnimation } from "./animations/preview-animation";
import { Logo } from "@/components/ui/logo";
import { CTAButton } from "./cta-button";

export function Hero() {
  const router = useRouter();

  const scrollToDemo = () => {
    const demoSection = document.querySelector("#live-demo");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute h-48 w-48 blur-3xl bg-accent-purple/20 rounded-full -top-12 -left-12 animate-pulse" />
      <div className="absolute h-48 w-48 blur-3xl bg-blue-500/20 rounded-full -bottom-12 -right-12 animate-pulse delay-300" />

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Column - Text Content */}
          <motion.div
            className="w-full lg:w-1/2 lg:max-w-xl space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center lg:justify-start">
              <Logo width={120} />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold break-words">
              <span className="bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
                Seamless Crypto
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
                Payments on Solana.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground">
              Accept crypto payments instantly. For businesses, creators, and
              everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-8">
              <CTAButton />
              <Button
                variant="outline"
                size="lg"
                className="h-14 text-lg group w-full sm:w-auto"
                onClick={scrollToDemo}
              >
                Try Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground pt-4">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span>
                Generate payment links, invoices, or tip jars in seconds.
              </span>
            </div>
          </motion.div>

          {/* Right Column - Preview */}
          <div className="w-full lg:w-1/2 lg:max-w-xl flex justify-center items-center h-[600px]">
            <PreviewAnimation />
          </div>
        </div>
      </div>
    </div>
  );
}
