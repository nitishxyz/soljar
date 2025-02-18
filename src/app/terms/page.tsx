import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/landing/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-12 px-4">
      <div className="max-w-3xl mx-auto mb-16">
        {/* Header with Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <Logo width={100} />
          </Link>
        </div>

        {/* Terms of Service Content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold">Terms of Service</h1>

          <p className="text-xl text-muted-foreground">
            Last updated: February 18, 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Agreement to Terms</h2>
            <p className="text-xl text-muted-foreground">
              By accessing or using Soljar, you agree to be bound by these Terms
              of Service. If you disagree with any part of these terms, you may
              not access our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Use of Service</h2>
            <p className="text-xl text-muted-foreground">
              Our service allows you to:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Create and manage tip jars</li>
              <li>Send and receive cryptocurrency tips</li>
              <li>Access transaction history</li>
              <li>Manage your profile settings</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">User Responsibilities</h2>
            <p className="text-xl text-muted-foreground">
              You are responsible for:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Maintaining the security of your wallet</li>
              <li>Ensuring all transactions comply with applicable laws</li>
              <li>Any fees associated with blockchain transactions</li>
              <li>The accuracy of information you provide</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Intellectual Property</h2>
            <p className="text-xl text-muted-foreground">
              The Soljar service, including its original content, features, and
              functionality, is owned by Soljar and protected by international
              copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Limitation of Liability</h2>
            <p className="text-xl text-muted-foreground">
              Soljar shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use or
              inability to use the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Changes to Terms</h2>
            <p className="text-xl text-muted-foreground">
              We reserve the right to modify or replace these terms at any time.
              Continued use of the service after any changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Contact Us</h2>
            <p className="text-xl text-muted-foreground">
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:legal@soljar.xyz"
                className="text-accent-purple hover:text-accent-purple/80"
              >
                legal@soljar.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
