import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it Works", href: "/#how-it-works" },
      { label: "Use Cases", href: "/#use-cases" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Examples", href: "/docs/examples" },
      { label: "Guides", href: "/docs/guides" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/soljar",
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/soljarxyz",
    icon: Twitter,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-accent-purple/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-blue-500 bg-clip-text text-transparent">
                Soljar
              </h3>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
