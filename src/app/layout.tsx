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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
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
      </body>
    </html>
  );
}
