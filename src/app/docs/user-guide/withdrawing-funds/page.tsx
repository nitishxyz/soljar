import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Withdrawing Funds - Soljar User Guide",
  description:
    "Learn how to withdraw your accumulated SOL and SPL token tips from your Soljar account to your connected Solana wallet.",
};

export default function WithdrawingFundsPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Withdrawing Your Funds</h1>
      <p className="text-lg mb-6">
        Once you have received tips or payments into your Soljar account, you
        can withdraw your SOL and SPL tokens to your main Solana wallet balance
        (the wallet you connected to Soljar). This page outlines the withdrawal
        process.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">How Withdrawals Work</h2>
        <p className="mb-2">
          Withdrawing funds from Soljar typically involves interacting with your
          Soljar dashboard or account section within the main application.
        </p>
        <ol className="list-decimal list-inside space-y-3 mb-4">
          <li>
            <strong>Navigate to Withdraw Section:</strong> Log in to your Soljar
            account (by connecting your wallet) and find the
            &quot;Withdraw&quot; or &quot;Funds&quot; section.
          </li>
          <li>
            <strong>Select Currency & Amount:</strong> Choose the cryptocurrency
            (SOL or a specific SPL token) you wish to withdraw and specify the
            amount. You will usually see your available Soljar balance for each
            currency.
          </li>
          <li>
            <strong>Review Details:</strong> Confirm the withdrawal amount and
            the destination (which will be your connected Solana wallet
            address).
          </li>
          <li>
            <strong>Authorize Transaction:</strong> You will need to approve a
            transaction in your Solana wallet. This transaction instructs the
            Soljar program to transfer the funds from your Soljar-associated
            accounts to your main wallet address.
          </li>
          <li>
            <strong>Transaction Confirmation:</strong> Once the transaction is
            confirmed on the Solana network, the funds will be available in your
            main wallet balance, outside of the Soljar platform&apos;s direct
            control (though still in an account you own).
          </li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Similar to deposits, Solana transactions are fast. Your withdrawn
          funds should reflect in your main wallet balance shortly after network
          confirmation.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Supported Currencies for Withdrawal
        </h2>
        <p className="mb-2">
          You can withdraw any SOL or SPL tokens that you have accumulated in
          your Soljar account.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>SOL:</strong> Native Solana currency.
          </li>
          <li>
            <strong>SPL Tokens:</strong> Any supported SPL tokens (e.g., USDC,
            USDT) that have been deposited to your account.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Important Notes on Withdrawals
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>To Your Own Wallet:</strong> Withdrawals are processed to
            the same Solana wallet address that you used to create and manage
            your Soljar account.
          </li>
          <li>
            <strong>Network Fees (Gas):</strong> You will need to pay a small
            gas fee in SOL from your main wallet balance to process the
            withdrawal transaction on the Solana network.
          </li>
          <li>
            <strong>Full Control:</strong> Once withdrawn, the funds are
            entirely in your main wallet balance, under your sole control, just
            like any other crypto asset you hold in that wallet.
          </li>
          <li>
            <strong>Minimums & Limits:</strong> Check if the Soljar platform has
            any minimum withdrawal amounts or daily limits, although this is
            less common for fully on-chain protocols.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Troubleshooting Withdrawals
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Insufficient SOL for Gas:</strong> Ensure your main wallet
            (not your Soljar balance) has enough SOL to cover the transaction
            fee. Even if withdrawing SPL tokens, gas fees are paid in SOL.
          </li>
          <li>
            <strong>Transaction Failed/Pending:</strong> Check Solana network
            status (e.g., on Solana Beach or Solscan). If the network is
            congested, you might need to wait or try again later, potentially
            with a higher priority fee if your wallet allows.
          </li>
          <li>
            <strong>Funds Not Appearing:</strong> Double-check your wallet on a
            block explorer to confirm the transaction status. Ensure you are
            looking at the correct token account for SPL tokens.
          </li>
        </ul>
      </section>
    </article>
  );
}
