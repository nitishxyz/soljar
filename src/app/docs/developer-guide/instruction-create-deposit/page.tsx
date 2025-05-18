import { Metadata } from "next";

export const metadata: Metadata = {
  title: "createDeposit (SOL) - Soljar Developer Docs",
  description:
    "Technical documentation for the createDeposit (SOL) instruction in the Soljar program.",
};

export default function CreateDepositInstructionPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">
        Instruction: <code>createDeposit</code> (SOL)
      </h1>
      <p className="text-lg mb-6">
        Detailed documentation for the <code>createDeposit</code> Solana
        instruction will go here.
      </p>
      {/* Add more content specific to this instruction */}
    </article>
  );
}
