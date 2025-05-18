import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instruction: createWithdrawl (SOL) - Soljar Developer Guide",
  description:
    "Technical documentation for the createWithdrawl instruction. Learn how to withdraw SOL from a Soljar account.",
};

export default function InstructionCreateWithdrawlPage() {
  const createWithdrawlAccounts = `
#[derive(Accounts)]
pub struct CreateWithdrawl<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut, seeds = [b"jar", signer.key().as_ref()], bump)]
    pub jar: Account<'info, Jar>,

    #[account(
        init_if_needed, // Or init, depending on desired behavior if it might pre-exist
        payer = signer,
        space = 8 + Withdrawl::INIT_SPACE,
        seeds = [b"withdrawl", jar.key().as_ref(), &jar.withdrawl_count.to_le_bytes()],
        bump,
    )]
    pub withdrawl: Account<'info, Withdrawl>,

    pub system_program: Program<'info, System>,
}
  `;

  const withdrawlStruct = `
#[account]
#[derive(InitSpace)]
pub struct Withdrawl {
    pub jar: Pubkey,      // The Jar account from which funds were withdrawn
    pub currency: u8,   // 0 = SOL, 1 = USDC, 2 = USDT (derived from currency_mint argument)
    pub amount: u64,      // Amount withdrawn (in lamports for SOL)
    pub created_at: i64,  // Timestamp of withdrawal
}
  `;

  // Helper for basic code block styling
  const PreCode = ({ code }: { code: string }) => (
    <pre className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
      <code className="font-mono text-sm whitespace-pre">{code.trim()}</code>
    </pre>
  );

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-2">
        Instruction: createWithdrawl (SOL)
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Processes a SOL withdrawal from a user&apos;s Jar to their signer wallet
        and records the transaction.
        <em>
          Note: This instruction specifically handles SOL. For SPL tokens, see{" "}
          <code>withdrawSplTokens</code>.
        </em>
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Function Signature</h2>
        <PreCode
          code={`pub fn create_withdrawl(ctx: Context<CreateWithdrawl>, currency_mint: Pubkey, amount: u64) -> Result<()>`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Arguments</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>currency_mint: Pubkey</code> - The mint of the currency to
            withdraw. For SOL withdrawals, this{" "}
            <strong>
              must be <code>Pubkey::default()</code>
            </strong>{" "}
            (i.e., <code>11111111111111111111111111111111</code>).
          </li>
          <li>
            <code>amount: u64</code> - The amount of SOL to withdraw, in
            lamports. Must be greater than 0.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Accounts Context (<code>CreateWithdrawl</code>)
        </h2>
        <PreCode code={createWithdrawlAccounts} />
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <code>signer: Signer&lt;&apos;info&gt;</code>: The user initiating
            the withdrawal. Their wallet receives the SOL. Mutable.
          </li>
          <li>
            <code>jar: Account&lt;&apos;info, Jar&gt;</code>: The user&apos;s{" "}
            <code>Jar</code> account. SOL is withdrawn from here. Seeds:{" "}
            <code>[b&quot;jar&quot;, signer.key().as_ref()]</code>. Mutable.
          </li>
          <li>
            <code>withdrawl: Account&lt;&apos;info, Withdrawl&gt;</code>:
            Account to record the withdrawal details. Seeds:{" "}
            <code>
              [b&quot;withdrawl&quot;, jar.key().as_ref(),
              &amp;jar.withdrawl_count.to_le_bytes()]
            </code>
            . Initialized if needed.
          </li>
          <li>
            <code>system_program: Program&lt;&apos;info, System&gt;</code>:
            Solana System Program.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Logic Overview (SOL Withdrawal)
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Validates <code>amount</code> is greater than 0.
          </li>
          <li>
            Calls <code>get_currency_from_mint(currency_mint)</code> to
            determine the internal currency enum.
          </li>
          <li>
            <strong>
              If <code>currency_mint</code> is <code>Pubkey::default()</code>{" "}
              (for SOL):
            </strong>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li>
                Checks if the <code>jar</code> account has a lamport balance
                greater than or equal to <code>amount</code>. Throws{" "}
                <code>InsufficientSolBalance</code> if not.
              </li>
              <li>
                Directly subtracts <code>amount</code> lamports from the{" "}
                <code>jar</code> account&apos;s balance.
              </li>
              <li>
                Directly adds <code>amount</code> lamports to the{" "}
                <code>signer</code> account&apos;s balance.
              </li>
              <li>
                <em>
                  (Note: This direct lamport manipulation is used instead of a
                  System Program CPI for SOL transfer in this specific
                  instruction).
                </em>
              </li>
            </ul>
          </li>
          <li>
            Initializes the <code>Withdrawl</code> account, storing the{" "}
            <code>jar</code> public key, <code>amount</code>,{" "}
            <code>created_at</code> timestamp, and the derived{" "}
            <code>currency</code> enum (which would be SOL-related).
          </li>
          <li>
            Increments the <code>withdrawl_count</code> on the <code>Jar</code>{" "}
            account.
          </li>
          <li>
            Updates the <code>updated_at</code> timestamp on the{" "}
            <code>Jar</code> account.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Related Account Structures
        </h2>
        <h3 className="text-xl font-medium mt-6 mb-2">Withdrawl Account</h3>
        <PreCode code={withdrawlStruct} />
        {/* Jar account structure is detailed in createUser instruction docs */}
      </section>

      <p className="text-sm text-muted-foreground">
        <em>
          Note: This instruction is intended for SOL withdrawals. The{" "}
          <code>withdrawSplTokens</code> instruction handles SPL token
          withdrawals. The <code>currency_mint</code> argument allows for
          potential future flexibility but current SOL logic is tied to{" "}
          <code>Pubkey::default()</code>.
        </em>
      </p>
    </article>
  );
}
