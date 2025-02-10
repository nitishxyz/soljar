import { WalletButton } from "@/components/wallet-button";

export function OnboardingSection() {
  return (
    <div className="w-1/3 bg-gray-50 border-l flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Connect your wallet to create your personal tip jar
        </p>
      </div>
      <WalletButton />
    </div>
  );
}
