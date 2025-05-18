import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Guide Introduction - Soljar Docs",
  description:
    "Introduction to the Soljar User Guide. Learn how to get started with Soljar, the Solana tip jar platform.",
};

export default function UserGuidePage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Soljar User Guide</h1>
      <p className="text-lg mb-6">
        Welcome to the Soljar User Guide! This guide is designed to help you
        understand and use all the features Soljar has to offer, from setting up
        your account to managing your earnings.
      </p>
      <p className="mb-4">
        Whether you&apos;re a creator, a small business, or just looking to
        receive crypto tips, Soljar makes it simple.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Key Sections:</h2>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>
          <a
            href="/docs/user-guide/account-setup"
            className="text-primary hover:underline"
          >
            Account Setup
          </a>
          : Learn how to create your Soljar account in a few simple steps.
        </li>
        {/* Add links to other user guide sections as they are created */}
        {/* 
        <li>
          <a href="/docs/user-guide/receiving-tips" className="text-primary hover:underline">
            Receiving Tips
          </a>: Understand how your tip link works and how to share it.
        </li>
        <li>
          <a href="/docs/user-guide/managing-funds" className="text-primary hover:underline">
            Managing Your Funds
          </a>: Information on viewing your balance and withdrawing funds.
        </li> 
        */}
      </ul>
      <p>
        Navigate through the sections using the sidebar to find the information
        you need.
      </p>
    </article>
  );
}
