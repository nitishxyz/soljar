"use client";
import { OnboardingSection } from "@/components/onboarding-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 p-4 md:p-8">
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        <OnboardingSection />
      </div>
    </div>
  );
}
