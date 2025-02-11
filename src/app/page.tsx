"use client";
import {
  SparklesIcon,
  WalletIcon,
  ShareIcon,
  ChartBarIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { OnboardingSection } from "@/components/onboarding-section";
import { Card, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Left section (2/3) - Landing page information */}
      <div className="w-2/3 flex flex-col justify-center px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-accent-purple to-accent-purple/70 bg-clip-text text-transparent">
            Soljar
          </h1>
          <p className="text-2xl mb-4 font-medium">
            Web3-native sponsorship and tipping platform on Solana
          </p>
          <p className="text-muted-foreground/80 text-lg mb-16">
            Accept SOL, USDC, and other tokens instantly - no sign-ups required
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group relative overflow-hidden border-transparent bg-gradient-to-b from-background/95 to-background hover:shadow-lg hover:shadow-accent-purple/5 transition-all duration-300">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="space-y-4 relative">
                  <div className="flex items-start space-x-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center",
                        "group-hover:bg-accent-purple/20 transition-colors duration-300"
                      )}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground/80">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex items-center space-x-3 text-sm"
        >
          <div className="p-2 rounded-full bg-accent-purple/10">
            <LockOpenIcon className="w-4 h-4 text-accent-purple" />
          </div>
          <span className="text-muted-foreground/80 font-medium">
            Fully decentralized - no sign-ups, no middlemen
          </span>
        </motion.div>
      </div>

      {/* Right section (1/3) - Wallet connection & onboarding */}
      <OnboardingSection />
    </div>
  );
}

const features = [
  {
    title: "Create Your Jar",
    description: "Set up your personal treasury to receive and track donations",
    icon: <SparklesIcon className="w-6 h-6 text-accent-purple" />,
  },
  {
    title: "Share & Embed",
    description:
      "Generate custom buttons and links for your website or socials",
    icon: <ShareIcon className="w-6 h-6 text-accent-purple" />,
  },
  {
    title: "Flexible Funding",
    description: "Choose direct payments or treasury mode for your tips",
    icon: <WalletIcon className="w-6 h-6 text-accent-purple" />,
  },
  {
    title: "Track Sources",
    description: "See which links and platforms your tips come from",
    icon: <ChartBarIcon className="w-6 h-6 text-accent-purple" />,
  },
];
