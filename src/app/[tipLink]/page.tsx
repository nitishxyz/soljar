"use client";
declare global {
  interface Window {
    phantom?: any;
  }
}

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { CurrencyIcon } from "@/components/ui/currency-icon";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { useTipLink } from "@/web3/hooks/use-tip-link";
import Loading from "../loading/page";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { convertAmountToSmallestUnit, getMintAddress } from "@/web3/utils";
import { useToast } from "@/hooks/use-toast";
import { SuccessView } from "@/components/tip/success-view";
import { TipForm } from "@/components/tip/tip-form";
import { QRCodeSection } from "@/components/tip/qr-code-section";

type Currency = "SOL" | "USDC" | "USDT";

export default function TipPage() {
  const { tipLink } = useParams();
  const { getTipLink, createDeposit } = useTipLink(tipLink as string);
  const wallet = useWallet();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("SOL");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{
    amount: string;
    currency: Currency;
    recipient: string;
  } | null>(null);

  const currencies: Currency[] = ["SOL", "USDC", "USDT"];
  const colorMap = {
    SOL: "purple",
    USDC: "blue",
    USDT: "green",
  };

  const isInWalletBrowser = useMemo(() => {
    if (typeof window === "undefined") return false;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isPhantom = window.phantom !== undefined;
    const isSolflare = userAgent.includes("solflare");
    const isGlow = userAgent.includes("glow");

    return isPhantom || isSolflare || isGlow;
  }, []);

  const disabled = useMemo(() => {
    return !amount || parseFloat(amount) <= 0;
  }, [amount]);

  const { data, isLoading } = getTipLink;

  const handleSendTip = async () => {
    if (!wallet.publicKey) return;

    setIsSubmitting(true);
    try {
      const amountInSmallestUnit = convertAmountToSmallestUnit(
        parseFloat(amount),
        selectedCurrency
      );

      if (selectedCurrency === "SOL") {
        await createDeposit.mutateAsync({
          amount: amountInSmallestUnit,
          mint: PublicKey.default,
          memo: message,
        });
      } else {
        const mint = getMintAddress(selectedCurrency);
        const sourceTokenAccount = await getAssociatedTokenAddress(
          mint,
          wallet.publicKey
        );

        await createDeposit.mutateAsync({
          amount: amountInSmallestUnit,
          mint,
          memo: message,
          sourceTokenAccount,
        });
      }

      // Set success data
      setSuccessData({
        amount,
        currency: selectedCurrency,
        recipient: user.username || "Anonymous",
      });
      setIsSuccess(true);

      toast({
        title: "Tip sent successfully!",
        description: `You sent ${amount} ${selectedCurrency} to ${user.username}`,
      });

      // Reset form
      setAmount("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Failed to send tip",
        description: error.message,
        variant: "destructive",
      });
      console.error("Error sending tip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this new function to handle resetting the form
  const handleReset = () => {
    setIsSuccess(false);
    setSuccessData(null);
  };

  if (isLoading) return <Loading />;

  if (!data) return <div>Tip link not found</div>;

  const { tipLink: tipLinkData, user } = data;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent-purple/5 to-blue-500/10">
      <div className="w-full max-w-4xl">
        <Card className="backdrop-blur-sm bg-card/95 p-4 md:py-12 shadow-xl border border-accent-purple/10">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12 sm:px-6">
            {/* QR Code Section - Always visible on desktop, hidden on mobile in wallet browser */}
            <div className={`hidden lg:block lg:w-[320px]`}>
              <QRCodeSection url={window.location.href} />
            </div>
            <div className="hidden lg:block w-px bg-accent-purple/10" />

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex-1"
            >
              {isSuccess && successData ? (
                <SuccessView successData={successData} onReset={handleReset} />
              ) : (
                <TipForm
                  username={user.username}
                  selectedCurrency={selectedCurrency}
                  onCurrencySelect={setSelectedCurrency}
                  amount={amount}
                  onAmountChange={setAmount}
                  message={message}
                  onMessageChange={setMessage}
                  isSubmitting={isSubmitting}
                  disabled={disabled}
                  onSubmit={handleSendTip}
                  isWalletConnected={wallet.connected}
                  onDisconnect={wallet.disconnect}
                />
              )}
            </motion.div>

            {/* Mobile QR Code Section - Hide only when in wallet browser */}
            {!isInWalletBrowser && (
              <div className="block lg:hidden">
                <div className="h-px w-full bg-accent-purple/10 mb-6" />
                <QRCodeSection url={window.location.href} />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
