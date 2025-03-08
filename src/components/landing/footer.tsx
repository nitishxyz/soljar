"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { Logo } from "../ui/logo";

const PROGRAM_ADDRESS = "JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ";

const footerLinks = [
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security Policy", href: "/security-policy" },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/soljar-xyz",
    icon: Github,
  },
  {
    label: "X",
    href: "https://x.com/soljar_xyz",
    icon: FaXTwitter,
  },
  {
    label: "Solscan",
    href: `https://solscan.io/account/${PROGRAM_ADDRESS}`,
    icon: ExternalLink,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-accent-purple/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 text-muted-foreground">
              The easiest way to accept crypto tips on Solana.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-accent-purple/10 hover:bg-accent-purple/20 transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 text-accent-purple" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-accent-purple/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Soljar. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Built on</span>
                <Link
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
                >
                  Solana
                </Link>
              </div>
              <div className="flex items-center gap-2 md:ml-4">
                <span className="text-sm text-muted-foreground">
                  Program ID:
                </span>
                <Link
                  href={`https://solscan.io/account/${PROGRAM_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors font-mono"
                >
                  {PROGRAM_ADDRESS}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
