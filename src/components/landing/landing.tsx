"use client";
import { Benefits } from "./benefits";
import { CTA } from "./cta";
import { FAQ } from "./faq";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { LiveDemo } from "./live-demo";
import { UseCases } from "./use-cases";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Hero />
      <Benefits />
      <UseCases />
      <LiveDemo />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
