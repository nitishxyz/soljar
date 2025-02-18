import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/landing/footer";

export default function SecurityPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-12 px-4">
      <div className="max-w-3xl mx-auto mb-16">
        {/* Header with Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <Logo width={100} />
          </Link>
        </div>

        {/* Security Policy Content */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold">Security Policy</h1>

          <p className="text-xl text-muted-foreground">
            Last updated: February 18, 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Smart Contract Security</h2>
            <p className="text-xl text-muted-foreground">
              Our smart contracts are:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                Open-source and publicly verifiable on the Solana blockchain
              </li>
              <li>Available for review on our public GitHub repository</li>
              <li>Developed following security best practices</li>
              <li>Regularly audited and maintained</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Transparency</h2>
            <p className="text-xl text-muted-foreground">
              We believe in full transparency. All our code is open source and
              can be audited by anyone at any time. You can find:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Smart contract code on the Solana blockchain</li>
              <li>Frontend application code on GitHub</li>
              <li>Technical documentation and specifications</li>
              <li>Audit reports and security assessments</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Security Best Practices</h2>
            <p className="text-xl text-muted-foreground">
              We recommend users follow these security practices:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Always verify transaction details before signing</li>
              <li>Use hardware wallets for large transactions</li>
              <li>Never share your private keys or seed phrases</li>
              <li>Be cautious of phishing attempts and fake websites</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Bug Bounty Program</h2>
            <p className="text-xl text-muted-foreground">
              We encourage responsible disclosure of security vulnerabilities.
              If you discover a security issue, please report it to our team
              immediately at{" "}
              <a
                href="mailto:security@soljar.xyz"
                className="text-accent-purple hover:text-accent-purple/80"
              >
                security@soljar.xyz
              </a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">
              Smart Contract Verification
            </h2>
            <p className="text-xl text-muted-foreground">
              You can verify our smart contract deployment on Solana at:{" "}
              <a
                href="https://solscan.io/address/JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-purple hover:text-accent-purple/80"
              >
                JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ
              </a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Updates and Maintenance</h2>
            <p className="text-xl text-muted-foreground">
              We regularly update our security measures and smart contracts to
              maintain the highest security standards. Any significant updates
              will be:
            </p>
            <ul className="text-xl list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Announced through our official channels</li>
              <li>Documented in our GitHub repository</li>
              <li>Reflected in updated smart contract deployments</li>
              <li>Accompanied by detailed change logs</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold">Contact</h2>
            <p className="text-xl text-muted-foreground">
              For security-related inquiries or to report vulnerabilities,
              please contact our security team at{" "}
              <a
                href="mailto:security@soljar.xyz"
                className="text-accent-purple hover:text-accent-purple/80"
              >
                security@soljar.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
