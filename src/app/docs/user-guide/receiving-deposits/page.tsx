export default function ReceivingDepositsPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Receiving Deposits</h1>
      <p className="text-lg mb-6">
        When someone uses your Soljar tip link (e.g.,{" "}
        <code>https://soljar.xyz/yourusername</code>), they can send you tips or
        payments in SOL (the native currency of Solana) or other supported SPL
        tokens. This page explains how these deposits work.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Deposit Process</h2>
        <p className="mb-2">
          The process for a sender is designed to be straightforward:
        </p>
        <ol className="list-decimal list-inside space-y-3 mb-4">
          <li>
            <strong>Visit Your Link:</strong> The sender navigates to your
            unique Soljar tip link.
          </li>
          <li>
            <strong>Choose Amount & Currency:</strong> They enter the amount
            they wish to send and select whether it&apos;s SOL or a specific SPL
            token (e.g., USDC, USDT, etc., if supported by the platform and your
            configuration).
          </li>
          <li>
            <strong>Optional Message:</strong> They may have an option to
            include a short message with their tip.
          </li>
          <li>
            <strong>Connect Wallet:</strong> The sender connects their own
            Solana wallet (like Phantom, Solflare, etc.).
          </li>
          <li>
            <strong>Confirm Transaction:</strong> They review the transaction
            details (amount, recipient, gas fees) in their wallet and approve
            it.
          </li>
          <li>
            <strong>Transaction Sent:</strong> Once confirmed, the transaction
            is broadcast to the Solana network.
          </li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Solana transactions are typically very fast, so the funds should
          appear in your Soljar balance within seconds after network
          confirmation.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Supported Cryptocurrencies
        </h2>
        <p className="mb-2">
          Soljar facilitates payments directly on the Solana blockchain.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>SOL:</strong> The native cryptocurrency of the Solana
            network. This is always supported.
          </li>
          <li>
            <strong>SPL Tokens:</strong> These are tokens built on the Solana
            Program Library (SPL) standard, similar to ERC-20 tokens on
            Ethereum. Examples include stablecoins like USDC and USDT, or other
            community tokens. The specific SPL tokens supported for deposit will
            depend on the Soljar platform&apos;s configuration.
          </li>
        </ul>
        <p className="mb-2">
          The deposit interface on your tip link page will clearly show which
          cryptocurrencies are available for senders to choose from.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Viewing Your Deposits</h2>
        <p className="mb-2">
          You can typically view your received tips and payments in your Soljar
          dashboard or account area after logging in (connecting your wallet) to
          the main Soljar application.
        </p>
        <p className="mb-2">The dashboard should provide details such as:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Transaction history (sender, amount, currency, date)</li>
          <li>Your current balance for SOL and each supported SPL token</li>
        </ul>
        <p className="mt-4">
          For details on how to take out these funds, please see the{" "}
          <a
            href="/docs/user-guide/withdrawing-funds"
            className="text-primary hover:underline"
          >
            Withdrawing Your Funds
          </a>{" "}
          section.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Important Notes on Deposits
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Direct to Your Control:</strong> Funds sent via Soljar are
            deposited into accounts controlled by your Solana wallet through the
            Soljar program. You maintain self-custody.
          </li>
          <li>
            <strong>Network Fees (Gas):</strong> Senders pay a small gas fee in
            SOL for their transaction to be processed on the Solana network.
            This fee does not go to Soljar but to the network validators.
          </li>
          <li>
            <strong>No Middleman for Funds:</strong> Soljar acts as a
            facilitator for these peer-to-peer transactions; it does not hold
            your funds directly in a centralized manner after they are deposited
            to your on-chain accounts.
          </li>
        </ul>
      </section>
    </article>
  );
}
