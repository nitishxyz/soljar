import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { useTipLink } from "@/web3/hooks/use-tip-link";
import Loading from "@/app/loading/page";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { convertAmountToSmallestUnit, getMintAddress } from "@/web3/utils";
import { useToast } from "@/hooks/use-toast";
import { SuccessView } from "@/components/tip/success-view";
import { TipForm } from "@/components/tip/tip-form";
import { QRCodeSection } from "@/components/tip/qr-code-section";

type Currency = "SOL" | "USDC" | "USDT";

interface TipViewProps {
  tipLinkId: string;
  isDemo?: boolean;
}

export function TipView({ tipLinkId, isDemo = false }: TipViewProps) {
  const { getTipLink, createDeposit } = useTipLink(tipLinkId);
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

      setSuccessData({
        amount,
        currency: selectedCurrency,
        recipient: data?.user.username || "Anonymous",
      });
      setIsSuccess(true);

      toast({
        title: "Tip sent successfully!",
        description: `You sent ${amount} ${selectedCurrency} to ${data?.user.username}`,
      });

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

  const handleReset = () => {
    setIsSuccess(false);
    setSuccessData(null);
  };

  if (isLoading) return <Loading />;
  if (!data) return <div>Tip link not found</div>;

  const { user } = data;

  return (
    <div
      className={`${
        isDemo ? "p-0" : "min-h-screen p-4"
      } flex items-center justify-center ${
        isDemo ? "bg-transparent" : "bg-card"
      } ${
        !isDemo
          ? "lg:bg-gradient-to-br lg:from-background lg:via-accent-purple/5 lg:to-blue-500/10"
          : ""
      } relative`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b from-accent-purple/5 via-transparent to-transparent lg:hidden ${
          isDemo ? "hidden" : ""
        }`}
      />
      <div className="w-full max-w-5xl relative">
        <Card className="backdrop-blur-sm bg-transparent lg:bg-card/95 p-4 md:py-12 shadow-none lg:shadow-xl border-transparent lg:border-accent-purple/10">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12 sm:px-6">
            {/* QR Code Section */}
            {/* {!isDemo && ( */}
            <>
              <div className={`hidden lg:block lg:w-[320px]`}>
                <QRCodeSection
                  url={
                    isDemo
                      ? "https://soljar.xyz/nitishxyz"
                      : window.location.href
                  }
                />
              </div>
              <div className="hidden lg:block w-px bg-accent-purple/10" />
            </>
            {/* )} */}

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

            {/* Mobile QR Code Section */}
            {!isInWalletBrowser && (
              <div className="block lg:hidden">
                <div className="h-px w-full bg-accent-purple/10 mb-6" />
                <QRCodeSection
                  url={
                    isDemo
                      ? "https://soljar.xyz/nitishxyz"
                      : window.location.href
                  }
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
