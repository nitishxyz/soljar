import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Architecture - Soljar Developer Guide",
  description:
    "Explore the on-chain program architecture of Soljar, including key accounts, PDAs, and how instructions interact.",
};

export default function ProgramArchitecturePage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Program Architecture</h1>
      <p className="text-lg mb-6">
        The Soljar on-chain program is built using the Anchor framework, which
        simplifies Solana program development in Rust. This section provides an
        overview of its architecture, key components, and how data is structured
        on-chain.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Core Components</h2>
        <p className="mb-2">
          The Soljar program is organized into several standard directories and
          files typical of an Anchor project:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <code>anchor/programs/soljar/src/lib.rs</code>: This is the main
            entry point of the program. It defines the
            <code>#[program]</code> module (named <code>soljar</code>) which
            contains all the public instructions callable by clients. It also
            declares the program&apos;s ID:{" "}
            <code>JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ</code>.
          </li>
          <li>
            <code>anchor/programs/soljar/src/instructions/</code>: This
            directory contains individual Rust modules, each corresponding to a
            specific instruction in the program (e.g.,{" "}
            <code>create_user.rs</code>, <code>create_deposit.rs</code>). Each
            module defines the context (accounts required) and the handler logic
            for that instruction.
          </li>
          <li>
            <code>anchor/programs/soljar/src/state/</code>: This directory
            defines the structure of on-chain accounts managed by the Soljar
            program. These are the Rust structs that represent how data (like
            user profiles, deposit records, etc.) is stored on Solana. Each
            struct typically uses <code>#[account]</code>.
          </li>
          <li>
            <code>anchor/programs/soljar/src/error.rs</code>: Defines custom
            error types for the program, allowing for more descriptive error
            handling.
          </li>
          <li>
            <code>anchor/programs/soljar/src/constants.rs</code>: (If present)
            May contain constant values used throughout the program, such as
            seed phrases for PDAs or size limits.
          </li>
          <li>
            <code>anchor/programs/soljar/src/utils.rs</code>: (If present) May
            contain utility functions used by various instructions or
            components.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          The program ID{" "}
          <code>JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ</code> is crucial
          for any client interacting with the deployed Soljar program on the
          Solana network.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          On-Chain State & Accounts
        </h2>
        <p className="mb-2">
          Solana programs are stateless. All data is stored in accounts on the
          blockchain. Soljar utilizes several types of accounts to manage its
          state:
        </p>
        <ul className="list-disc list-inside space-y-3 mb-4">
          <li>
            <strong>User Account:</strong> Typically a Program Derived Address
            (PDA) seeded by the user&apos;s wallet public key. This account
            stores information about the Soljar user, such as their chosen
            username, authority wallet, and potentially balances or links to
            other related accounts.
          </li>
          <li>
            <strong>Deposit/Tip Accounts:</strong> These might be PDAs or other
            account structures used to record individual deposit transactions.
            They could store details like the sender, receiver (your user
            account), amount, currency (SOL or SPL token mint), and timestamp.
          </li>
          <li>
            <strong>Associated Token Accounts (ATAs):</strong> For SPL token
            deposits and withdrawals, Soljar interacts with Solana&apos;s
            Associated Token Account program. When a user receives an SPL token
            tip, it&apos;s usually held in an ATA owned by a Soljar
            program-controlled PDA, which the user can then withdraw from.
          </li>
          {/* Add more account types as identified from `state/` directory */}
        </ul>
        <p className="mb-2">
          The exact structure and relationships of these accounts are defined in
          the <code>state/</code> directory. Understanding these structures is
          key to comprehending how data flows through the Soljar system.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Instruction-Based Logic</h2>
        <p className="mb-2">
          All operations within the Soljar program are executed via
          instructions. Each instruction is a distinct function within the{" "}
          <code>#[program]</code> mod in <code>lib.rs</code>, which then
          typically calls a handler function in the corresponding module within
          the <code>instructions/</code> directory.
        </p>
        <p className="mb-2">Common instruction patterns include:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Initializing new accounts (e.g., <code>createUser</code>).
          </li>
          <li>
            Mutating existing account data (e.g., processing a deposit, updating
            user settings).
          </li>
          <li>Transferring SOL or SPL tokens.</li>
          <li>Validating inputs and permissions.</li>
        </ul>
        <p className="mt-4">
          Subsequent pages in this Developer Guide will delve into the specifics
          of each key instruction, including required accounts, parameters, and
          behavior.
        </p>
      </section>
    </article>
  );
}
