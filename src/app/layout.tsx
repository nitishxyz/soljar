import "./globals.css";
import { ClusterProvider } from "@/web3/cluster/cluster-data-access";
import { SolanaProvider } from "@/web3/solana/solana-provider";
import { ReactQueryProvider } from "./react-query-provider";
import { Root } from "@/components/root";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { SoljarBaseProvider } from "@/web3/soljar-base-provider";
import { LoadingProvider } from "@/providers/loading-provider";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soljar - Web3 Tipping & Sponsorship Platform on Solana",
  description:
    "Accept SOL, USDC, and other tokens instantly by connecting your Solana wallet. The easiest way to receive crypto tips and sponsorships on Solana.",
  keywords: [
    "Solana",
    "crypto tipping",
    "web3 payments",
    "cryptocurrency",
    "digital payments",
    "creator economy",
    "blockchain",
    "sponsorship platform",
  ],
  authors: [{ name: "Soljar" }],
  creator: "Soljar",
  publisher: "Soljar",
  robots: "index, follow",
  metadataBase: new URL("https://soljar.xyz"),
  openGraph: {
    type: "website",
    url: "https://soljar.xyz",
    title: "Soljar - Web3 Tipping & Sponsorship Platform",
    description:
      "Connect your Solana wallet and start accepting SOL, USDC, and other tokens instantly. The easiest way to receive crypto tips and sponsorships on Solana.",
    siteName: "Soljar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soljar - Web3 Tipping Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@soljar_xyz",
    creator: "@thebatdev",
    title: "Soljar - Web3 Tipping & Sponsorship Platform",
    description:
      "Connect your Solana wallet and start accepting SOL, USDC, and other tokens instantly. The easiest way to receive crypto tips and sponsorships on Solana.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#7C3AED",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1E293B" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased leading-normal`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <ReactQueryProvider>
              <ClusterProvider>
                <SolanaProvider>
                  <SoljarBaseProvider>
                    <Root>{children}</Root>
                  </SoljarBaseProvider>
                </SolanaProvider>
              </ClusterProvider>
            </ReactQueryProvider>
          </LoadingProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
