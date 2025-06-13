"use client";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Zap,
  Smartphone,
  Wallet,
  TrendingUp,
  DollarSign,
  Link,
  Shield,
  Users,
  Globe,
} from "lucide-react";
import { RoadmapSection } from "./roadmap-section";

const roadmapData = {
  completed: {
    title: "✅ Recently Shipped",
    items: [
      {
        title: "Core Tipping Platform",
        description:
          "Custom tip jars with username-based links (soljar.xyz/username)",
        icon: CheckCircle2,
        status: "completed",
      },
      {
        title: "Multi-Token Support",
        description: "SOL, USDC, USDT and SPL token support",
        icon: CheckCircle2,
        status: "completed",
      },
      {
        title: "Wallet Integration",
        description: "Phantom, Solflare, and other Solana wallet support",
        icon: CheckCircle2,
        status: "completed",
      },
      {
        title: "Real-time Analytics",
        description: "Track tips, sources, and supporter analytics",
        icon: CheckCircle2,
        status: "completed",
      },
    ],
  },

  q3_2025: {
    title: "🔗 Q3 2025 - Payment Evolution",
    items: [
      {
        title: "Custom Payment Links",
        description:
          "Generate payment links with custom amounts, descriptions, and expiry dates",
        icon: Link,
        status: "planned",
        details: [
          "Set specific amounts or allow custom inputs",
          "Add payment descriptions and metadata",
          "Time-limited payment links",
          "QR code generation for easy sharing",
          "Bulk payment link generation",
          "Advanced analytics and tracking",
        ],
      },
      {
        title: "Mobile App Foundation",
        description: "iOS and Android apps with enhanced user experience",
        icon: Smartphone,
        status: "planned",
        details: [
          "Native iOS and Android applications",
          "Push notifications for payments",
          "Mobile-optimized user experience",
          "QR code scanning and generation",
          "Biometric authentication",
        ],
      },
    ],
  },
  q4_2025: {
    title: "🚀 Q4 2025 - SolJar v2 Launch",
    items: [
      {
        title: "SolJar v2: Self-Custodial Wallet",
        description:
          "Complete rewrite with built-in wallet, custom RPC support, and developer-first approach",
        icon: Wallet,
        status: "planned",
        details: [
          "🔓 Fully open source codebase",
          "🛠️ Developer-friendly architecture",
          "🔧 Custom RPC endpoint configuration",
          "🔐 Hardware wallet integration",
          "📱 Multi-signature support",
          "⚡ Advanced security features",
          "🧩 Plugin system for developers",
          "📚 Comprehensive API documentation",
        ],
      },
      {
        title: "Degen Trading Hub",
        description:
          "Quick signatureless trades and DeFi integration built into SolJar v2",
        icon: TrendingUp,
        status: "planned",
        details: [
          "One-click token swaps",
          "Signatureless trading sessions",
          "Real-time price feeds and charts",
          "Portfolio tracking and analytics",
          "Integration with major DEXs",
          "Advanced trading strategies",
        ],
      },
    ],
  },
  q1_2026: {
    title: "🌍 Q1 2026 - Global Expansion",
    items: [
      {
        title: "Off-Ramp Integration",
        description:
          "Direct USDC/USDT to bank account transfers integrated with SolJar v2",
        icon: Globe,
        status: "planned",
        details: [
          "Connect bank accounts securely",
          "Instant USDC to USD conversion",
          "Multiple currency support",
          "Compliance with local regulations",
          "Global payment rails integration",
          "KYC/AML compliance features",
        ],
      },
      {
        title: "Advanced Security Suite",
        description: "Enterprise-grade security and compliance features",
        icon: Shield,
        status: "planned",
        details: [
          "Multi-factor authentication",
          "Transaction signing policies",
          "Audit trail and compliance",
          "Advanced fraud detection",
          "Institutional custody options",
        ],
      },
    ],
  },
  future: {
    title: "🔮 Future Vision",
    items: [
      {
        title: "Cross-Chain Support",
        description:
          "Expand beyond Solana to Ethereum, Polygon, and other chains",
        icon: Globe,
        status: "future",
      },
      {
        title: "Creator Economy Tools",
        description: "Subscriptions, NFT gating, and advanced monetization",
        icon: Zap,
        status: "future",
      },
      {
        title: "Enterprise Solutions",
        description: "White-label solutions and enterprise API access",
        icon: Users,
        status: "future",
      },
      {
        title: "Developer Ecosystem",
        description: "SDKs, plugins, and tools for the open source community",
        icon: Zap,
        status: "future",
      },
    ],
  },
} as const;

export function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-20 pb-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Product Roadmap
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our journey to revolutionize payments on Solana. From simple tip
            jars to SolJar v2 - a fully open source, developer-friendly,
            self-custodial payment ecosystem with advanced trading capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Shipped</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Planned</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Roadmap Timeline */}
      <div className="container mx-auto px-4 pb-20">
        <div className="space-y-16">
          <RoadmapSection section={roadmapData.completed} delay={0.2} />
          <RoadmapSection section={roadmapData.q3_2025} delay={0.4} />
          <RoadmapSection section={roadmapData.q4_2025} delay={0.6} />
          <RoadmapSection section={roadmapData.q1_2026} delay={0.8} />
          <RoadmapSection section={roadmapData.future} delay={1.0} />
        </div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Shape the Future</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            This roadmap is a living document. We actively listen to our
            community and adapt our priorities based on user feedback and market
            needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.com/invite/JfC7kmFtm3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Join Discord
            </a>
            <a
              href="https://twitter.com/soljar_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              Follow @soljar_xyz
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
