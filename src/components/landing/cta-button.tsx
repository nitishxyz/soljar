import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";

export function CTAButton() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const isMobile = useIsMobile();
  const { getUser } = useSoljarUser();
  const shouldShowMobileWalletButton =
    !publicKey && isMobile && !window?.solana && !window?.phantom;

  const phantomUrl = `https://phantom.app/ul/browse/${encodeURIComponent(
    window.location.href
  )}?ref=${encodeURIComponent(window.location.origin)}`;

  // If user exists, show "Launch Dashboard"
  if (getUser.data) {
    return (
      <Button
        size="lg"
        className="h-14 text-lg bg-accent-purple hover:bg-accent-purple/90 w-full sm:w-auto"
        onClick={() => router.push("/dashboard")}
      >
        Launch Dashboard
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    );
  }

  // If on mobile and no wallet detected, show "Launch in Phantom"
  if (shouldShowMobileWalletButton) {
    return (
      <Button
        size="lg"
        className="h-14 text-lg bg-accent-purple hover:bg-accent-purple/90 w-full sm:w-auto"
        onClick={() => window.open(phantomUrl)}
      >
        Launch in Phantom
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    );
  }

  // Default "Get Started" button
  return (
    <Button
      size="lg"
      className="h-14 text-lg bg-accent-purple hover:bg-accent-purple/90 w-full sm:w-auto"
      onClick={() => router.push("/start")}
    >
      Get Started
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}
