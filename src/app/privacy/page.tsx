import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-12 px-4">
      <div className="max-w-3xl mx-auto mb-16">
        {/* Header with Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <Logo width={100} />
          </Link>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold">Privacy Policy</h1>

          <p className="text-xl text-muted-foreground">
            Last updated: February 18, 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Introduction</h2>
            <p className="text-xl text-muted-foreground">
              At Soljar, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, and protect your personal
              information when you use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Information We Collect</h2>
            <p className="text-xl text-muted-foreground">
              We collect information that you provide directly to us when using
              Soljar:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Wallet addresses</li>
              <li>Transaction data on the Solana blockchain</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">
              How We Use Your Information
            </h2>
            <p className="text-xl text-muted-foreground">
              We use the collected information to:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Process transactions and tips</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Send important updates about Soljar</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Data Security</h2>
            <p className="text-xl text-muted-foreground">
              We implement appropriate security measures to protect your
              information. However, please note that no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Contact Us</h2>
            <p className="text-xl text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:privacy@soljar.xyz"
                className="text-accent-purple hover:text-accent-purple/80"
              >
                privacy@soljar.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
