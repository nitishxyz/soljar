import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs Overview - Soljar",
  description:
    "Find all documentation for Soljar, including user guides and developer resources.",
};

export default function DocsPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Soljar Documentation
      </h1>
      <p className="text-lg mb-6">
        Soljar makes it easy to accept crypto payments and tips directly on the
        Solana blockchain. This documentation provides comprehensive guides for
        both end-users and developers.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {/* User Guide Card */}
        <Link
          href="/docs/user-guide"
          className="block p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            User Guide
          </h2>
          <p className="text-muted-foreground">
            Learn how to set up your account, receive tips, manage your funds,
            and make the most of Soljar&apos;s features.
          </p>
        </Link>

        {/* Developer Guide Card */}
        <Link
          href="/docs/developer-guide"
          className="block p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            Developer Guide
          </h2>
          <p className="text-muted-foreground">
            Dive into the technical details of the Soljar platform, including
            program architecture, on-chain instructions, and integration points.
          </p>
        </Link>
      </div>

      <p className="mt-12 text-center text-muted-foreground">
        Use the sidebar navigation to explore specific topics within each guide.
      </p>
    </article>
  );
}
