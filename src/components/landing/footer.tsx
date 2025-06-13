"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Copy } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { useState } from "react";

const PROGRAM_ADDRESS = "JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ";
const CONTRACT_ADDRESS = "2AFzzF7EKDygNJ2VthGWNSftCthpSkTmqSg9p8bFsend";
// Shortened versions for mobile display
const SHORT_PROGRAM_ADDRESS = `${PROGRAM_ADDRESS.slice(
  0,
  6
)}...${PROGRAM_ADDRESS.slice(-6)}`;
const SHORT_CONTRACT_ADDRESS = `${CONTRACT_ADDRESS.slice(
  0,
  6
)}...${CONTRACT_ADDRESS.slice(-6)}`;

const footerLinks = [
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security Policy", href: "/security-policy" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "Documentation", href: "/docs" }],
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
  const [copiedProgram, setCopiedProgram] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);

  const copyProgramToClipboard = () => {
    navigator.clipboard.writeText(PROGRAM_ADDRESS);
    setCopiedProgram(true);
    setTimeout(() => setCopiedProgram(false), 2000);
  };

  const copyContractToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

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
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Soljar. All rights reserved.
            </p>

            {/* Addresses section - optimized for mobile */}
            <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
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

              {/* Program ID */}
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
                <span className="text-sm text-muted-foreground">
                  Program ID:
                </span>
                <div className="flex items-center">
                  <Link
                    href={`https://solscan.io/account/${PROGRAM_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors font-mono"
                  >
                    <span className="hidden md:inline">{PROGRAM_ADDRESS}</span>
                    <span className="inline md:hidden">
                      {SHORT_PROGRAM_ADDRESS}
                    </span>
                  </Link>
                  <button
                    onClick={copyProgramToClipboard}
                    className="ml-2 p-1 rounded-md hover:bg-accent-purple/10 transition-colors"
                    title="Copy program address"
                  >
                    <Copy className="w-3.5 h-3.5 text-accent-purple" />
                  </button>
                </div>
                {copiedProgram && (
                  <span className="text-xs text-green-500 animate-fade-out">
                    Copied!
                  </span>
                )}
              </div>

              {/* Contract Address */}
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
                <span className="text-sm text-muted-foreground">Contract:</span>
                <div className="flex items-center">
                  <Link
                    href={`https://solscan.io/account/${CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors font-mono"
                  >
                    <span className="hidden md:inline">{CONTRACT_ADDRESS}</span>
                    <span className="inline md:hidden">
                      {SHORT_CONTRACT_ADDRESS}
                    </span>
                  </Link>
                  <button
                    onClick={copyContractToClipboard}
                    className="ml-2 p-1 rounded-md hover:bg-accent-purple/10 transition-colors"
                    title="Copy contract address"
                  >
                    <Copy className="w-3.5 h-3.5 text-accent-purple" />
                  </button>
                </div>
                {copiedContract && (
                  <span className="text-xs text-green-500 animate-fade-out">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
