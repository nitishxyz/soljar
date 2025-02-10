import "./globals.css";
import { ClusterProvider } from "@/web3/cluster/cluster-data-access";
import { SolanaProvider } from "@/web3/solana/solana-provider";
import { ReactQueryProvider } from "./react-query-provider";
import { Root } from "@/components/root";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  loading,
  all,
  auth,
}: {
  loading: React.ReactNode;
  all: React.ReactNode;
  auth: React.ReactNode;
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
          <ReactQueryProvider>
            <ClusterProvider>
              <SolanaProvider>
                <Root loading={loading} all={all} auth={auth} />
              </SolanaProvider>
            </ClusterProvider>
          </ReactQueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
