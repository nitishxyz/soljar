export default function YourTipLinkPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">Understanding Your Tip Link</h1>
      <p className="text-lg mb-6">
        Once you&apos;ve successfully set up your Soljar account, you get a
        unique, shareable tip link. This link is your personal gateway for
        receiving tips and payments directly on the Solana blockchain.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          How Your Link is Structured
        </h2>
        <p className="mb-2">
          Your Soljar tip link follows a simple and memorable format:
        </p>
        <div className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
          <code className="font-mono text-sm whitespace-pre">
            https://soljar.xyz/yourusername
          </code>
        </div>
        <p className="mb-2">
          Where <code>yourusername</code> is the unique username you selected
          during the{" "}
          <a
            href="/docs/user-guide/account-setup"
            className="text-primary hover:underline"
          >
            account setup process
          </a>
          .
        </p>
        <p className="mb-2">
          For example, if you chose &quot;alice&quot; as your username, your tip
          link would be:
          <code>https://soljar.xyz/alice</code>.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Sharing Your Tip Link</h2>
        <p className="mb-2">
          You can share this link anywhere you want to receive tips or payments.
          Here are a few ideas:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            On your social media profiles (Twitter bio, Instagram link, etc.)
          </li>
          <li>On your personal website or blog</li>
          <li>In your streaming descriptions (Twitch, YouTube)</li>
          <li>Directly to friends, family, or clients</li>
          <li>On your invoices or for freelance work</li>
        </ul>
        <p className="mb-2">
          When someone visits your link, they will be presented with options to
          send you SOL or other supported SPL tokens directly to your Solana
          wallet through the Soljar platform.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          What Happens When Someone Uses Your Link?
        </h2>
        <p className="mb-2">When a supporter visits your Soljar link:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>They see a clean interface dedicated to you.</li>
          <li>
            They can choose the amount and type of cryptocurrency (SOL or
            supported SPL tokens) they wish to send.
          </li>
          <li>They can add an optional message.</li>
          <li>
            They connect their own Solana wallet to authorize and send the
            transaction.
          </li>
          <li>
            The funds are transferred directly to your Soljar account on the
            Solana blockchain.
          </li>
        </ol>
        <p className="mt-4">
          You will learn more about how these deposits are processed in the next
          section on{" "}
          <a
            href="/docs/user-guide/receiving-deposits"
            className="text-primary hover:underline"
          >
            Receiving Deposits
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Your tip link is public and directly tied to your chosen username.
          </li>
          <li>
            It&apos;s the primary way for others to send you funds via Soljar.
          </li>
          <li>
            Sharing it widely increases your chances of receiving support!
          </li>
        </ul>
      </section>
    </article>
  );
}
