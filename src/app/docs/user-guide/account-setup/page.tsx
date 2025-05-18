export default function AccountSetupPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">
        Setting Up Your Soljar Account
      </h1>
      <p className="text-lg mb-6">
        Creating your Soljar account is a simple process that involves
        connecting your Solana wallet and choosing a unique username. This
        username will be part of your public Soljar link (e.g.,{" "}
        <code>soljar.xyz/yourusername</code>) where people can send you tips.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Step-by-Step Guide</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              1. Navigate to the Starting Page
            </h3>
            <p className="mb-2">
              Begin by visiting the{" "}
              <a href="/start" className="text-primary hover:underline">
                Soljar onboarding page
              </a>
              . This is where you&apos;ll initiate the account creation process.
            </p>
            {/* Optional: Add an image/screenshot here if desired */}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              2. Connect Your Solana Wallet
            </h3>
            <p className="mb-2">
              Click on the wallet connection button (usually labeled
              &quot;Connect Wallet&quot; or similar). You&apos;ll be prompted to
              choose your preferred Solana wallet (e.g., Phantom, Solflare) and
              approve the connection.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Soljar needs to connect to your wallet to identify you and to
              create your unique tip jar account on the Solana blockchain.
            </p>
            {/* Optional: Add an image/screenshot here if desired */}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              3. Choose Your Username
            </h3>
            <p className="mb-2">
              Once your wallet is connected, if you don&apos;t already have a
              Soljar account associated with that wallet, a form will appear
              allowing you to choose your username. This username will be public
              and part of your Soljar tip link: <code>soljar.xyz/username</code>
              .
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-4 my-4">
              <p className="font-medium mb-1">Username Requirements:</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>The username is required.</li>
                <li>It must be 15 characters or less.</li>
                <li>It must be unique (the system will check this for you).</li>
                <li>Usernames are typically in lowercase.</li>
              </ul>
            </div>
            <p className="mb-2">
              Type your desired username into the input field. The preview will
              show how your Soljar link will look (e.g.,{" "}
              <code>soljar.xyz/yourchosenname</code>).
            </p>
            {/* Optional: Add an image/screenshot here if desired */}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              4. Create Your Tip Jar
            </h3>
            <p className="mb-2">
              After entering your username, click the &quot;Create Tip Jar&quot;
              (or similar) button. This will initiate a transaction on the
              Solana blockchain to create your user account.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              You will need to approve this transaction in your connected
              wallet. A small network fee (gas fee) in SOL will be required.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">5. Account Created!</h3>
            <p className="mb-2">
              Once the transaction is confirmed on the blockchain, your Soljar
              account is ready! You should be redirected to your dashboard, or
              see a confirmation message.
            </p>
            <p>
              You can now share your <code>soljar.xyz/yourusername</code> link
              with others to receive tips.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Program ID</strong>: The Soljar on-chain program has the ID:{" "}
            <code>JARSq9S9RgyynuAwcdWh2yEG6MbhfntWq7zjXjAo87uQ</code>. This is
            for informational purposes; you typically won&apos;t need to
            interact with it directly.
          </li>
          <li>
            <strong>Wallet Security</strong>: Always ensure you are interacting
            with the official Soljar website and approve transactions carefully.
            Your wallet&apos;s security is your responsibility.
          </li>
          <li>
            <strong>One Account Per Wallet (Usually)</strong>: The system
            typically associates one Soljar username/account per Solana wallet
            address.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Username taken</strong>: If the username you selected is
            already in use, you&apos;ll be prompted to choose a different one.
          </li>
          <li>
            <strong>Transaction failed</strong>: Ensure you have enough SOL in
            your wallet to cover gas fees. If issues persist, check Solana
            network status or try again later.
          </li>
          <li>
            <strong>Wallet connection issues</strong>: Try disconnecting and
            reconnecting your wallet, or refresh the page. Ensure your wallet
            extension/app is up to date.
          </li>
        </ul>
      </section>
    </article>
  );
}
