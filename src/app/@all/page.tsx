import { WalletButton } from "@/components/wallet-button";
import {
  SparklesIcon,
  WalletIcon,
  ShareIcon,
  ChartBarIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { OnboardingSection } from "@/components/onboarding-section";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Left section (2/3) - Landing page information */}
      <div className="w-2/3 flex flex-col justify-center px-12">
        <h1 className="text-6xl font-bold mb-4">Soljar</h1>
        <p className="text-xl mb-4">
          Web3-native sponsorship and tipping platform on Solana
        </p>
        <p className="text-gray-600 mb-12">
          Accept SOL, USDC, and other tokens instantly - no sign-ups required
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-8 bg-white rounded-md border-[0.5px] border-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start space-x-4">
              <SparklesIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Create Your Jar</h3>
                <p className="text-gray-600">
                  Set up your personal treasury to receive and track donations
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-md border-[0.5px] border-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start space-x-4">
              <ShareIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Share & Embed</h3>
                <p className="text-gray-600">
                  Generate custom buttons and links for your website or socials
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-md border-[0.5px] border-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start space-x-4">
              <WalletIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Flexible Funding</h3>
                <p className="text-gray-600">
                  Choose direct payments or treasury mode for your tips
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-md border-[0.5px] border-gray-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] transition-shadow">
            <div className="flex items-start space-x-4">
              <ChartBarIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Track Sources</h3>
                <p className="text-gray-600">
                  See which links and platforms your tips come from
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center space-x-2 text-sm text-gray-600">
          <LockOpenIcon className="w-4 h-4" />
          <span>Fully decentralized - no sign-ups, no middlemen</span>
        </div>
      </div>

      {/* Right section (1/3) - Wallet connection & onboarding */}
      <OnboardingSection />
    </div>
  );
}
