import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instruction: withdrawSplTokens (SPL) - Soljar Developer Guide",
  description:
    "Technical documentation for the withdrawSplTokens instruction. Learn how to withdraw SPL tokens from a Soljar account.",
};

export default function InstructionWithdrawSplTokensPage() {
  const withdrawSplTokensAccounts = `
#[derive(Accounts)]
pub struct WithdrawSplTokens<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"jar", signer.key().as_ref()],
        bump,
    )]
    pub jar: Box<Account<'info, Jar>>,

    #[account(
        init,
        payer = signer,
        space = 8 + Withdrawl::INIT_SPACE,
        seeds = [b"withdrawl", jar.key().as_ref(), &jar.withdrawl_count.to_le_bytes()],
        bump,
    )]
    pub withdrawl: Box<Account<'info, Withdrawl>>,

    pub mint: InterfaceAccount<'info, Mint>,

    #[account(
        mut,
        token::mint = mint,
        token::authority = jar, // Jar PDA is the authority over this account
        seeds = [b"token_account", jar.key().as_ref(), mint.key().as_ref()],
        bump,
    )]
    pub token_account: Box<InterfaceAccount<'info, TokenAccount>>, // Jar's ATA for the mint

    #[account(
        init_if_needed,
        payer = signer,
        associated_token::mint = mint,
        associated_token::authority = signer, // Signer's main wallet is the authority for their own ATA
        associated_token::token_program = token_program,
    )]
    pub associated_token_account: Box<InterfaceAccount<'info, TokenAccount>>, // Signer's ATA for the mint

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
  `;

  // Withdrawl and Jar structs are detailed in other instruction docs.

  // Helper for basic code block styling
  const PreCode = ({ code }: { code: string }) => (
    <pre className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
      <code className="font-mono text-sm whitespace-pre">{code.trim()}</code>
    </pre>
  );

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-2">
        Instruction: withdrawSplTokens
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Processes an SPL token withdrawal from a user&apos;s Jar-controlled
        token account to their own wallet&apos;s Associated Token Account (ATA)
        and records the transaction.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Function Signature</h2>
        <PreCode
          code={`pub fn withdraw_spl_tokens(ctx: Context<WithdrawSplTokens>, amount: u64) -> Result<()>`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Arguments</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>amount: u64</code> - The amount of the SPL token to withdraw,
            in its smallest unit (e.g., 1,000,000 for 1 USDC if USDC has 6
            decimals). Must be greater than 0.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Accounts Context (<code>WithdrawSplTokens</code>)
        </h2>
        <PreCode code={withdrawSplTokensAccounts} />
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <code>signer: Signer&lt;&apos;info&gt;</code>: The user initiating
            the withdrawal. Their ATA receives the tokens. Pays for ATA
            initialization if needed. Mutable.
          </li>
          <li>
            <code>jar: Box&lt;Account&lt;&apos;info, Jar&gt;&gt;</code>: The
            user&apos;s <code>Jar</code> account. Seeds:{" "}
            <code>[b&quot;jar&quot;, signer.key().as_ref()]</code>. Acts as the
            authority for transferring tokens from its{" "}
            <code>token_account</code>. Mutable.
          </li>
          <li>
            <code>
              withdrawl: Box&lt;Account&lt;&apos;info, Withdrawl&gt;&gt;
            </code>
            : Account to record the withdrawal details. Seeds:{" "}
            <code>
              [b&quot;withdrawl&quot;, jar.key().as_ref(),
              &amp;jar.withdrawl_count.to_le_bytes()]
            </code>
            . Initialized.
          </li>
          <li>
            <code>mint: InterfaceAccount&lt;&apos;info, Mint&gt;</code>: The SPL
            Token Mint account for the token being withdrawn.
          </li>
          <li>
            <code>
              token_account: Box&lt;InterfaceAccount&lt;&apos;info,
              TokenAccount&gt;&gt;
            </code>
            : The Jar&apos;s PDA-controlled ATA for the specified{" "}
            <code>mint</code>, from which tokens are sent. Seeds:{" "}
            <code>
              [b&quot;token_account&quot;, jar.key().as_ref(),
              mint.key().as_ref()]
            </code>
            . Mutable.
          </li>
          <li>
            <code>
              associated_token_account: Box&lt;InterfaceAccount&lt;&apos;info,
              TokenAccount&gt;&gt;
            </code>
            : The <code>signer</code>&apos;s ATA for the specified{" "}
            <code>mint</code>, where tokens are received. Initialized by the
            Associated Token Program if it doesn&apos;t exist.
          </li>
          <li>
            <code>system_program: Program&lt;&apos;info, System&gt;</code>: For
            account initializations.
          </li>
          <li>
            <code>
              token_program: Interface&lt;&apos;info, TokenInterface&gt;
            </code>
            : The SPL Token Program, for the token transfer.
          </li>
          <li>
            <code>
              associated_token_program: Program&lt;&apos;info,
              AssociatedToken&gt;
            </code>
            : Required for initializing the <code>signer</code>&apos;s ATA if
            needed.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Logic Overview</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Validates <code>amount</code> is greater than 0.
          </li>
          <li>
            Determines the internal <code>currency</code> enum from{" "}
            <code>mint.key()</code> using <code>get_currency_from_mint</code>.
          </li>
          <li>
            If <code>mint</code> is <code>Pubkey::default()</code>, returns{" "}
            <code>Ok(())</code> immediately (this instruction is not for SOL).
          </li>
          <li>
            Checks if the Jar&apos;s <code>token_account</code> has sufficient
            balance and matches the <code>mint</code>.
          </li>
          <li>
            Ensures the <code>signer</code>&apos;s{" "}
            <code>associated_token_account</code> also matches the{" "}
            <code>mint</code>.
          </li>
          <li>
            Performs a CPI <code>transfer_checked</code> to the{" "}
            <code>token_program</code>, transferring <code>amount</code> of
            tokens from the Jar&apos;s <code>token_account</code> to the{" "}
            <code>signer</code>&apos;s <code>associated_token_account</code>.
            The <code>jar</code> PDA, using its seeds{" "}
            <code>
              [b&quot;jar&quot;, signer.key().as_ref(), &amp;jar.bump]
            </code>
            , signs for this transfer.
          </li>
          <li>
            Initializes the <code>Withdrawl</code> account with details like{" "}
            <code>jar</code> key, <code>amount</code>, derived{" "}
            <code>currency</code>, and <code>created_at</code> timestamp.
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

      <p className="text-sm text-muted-foreground">
        <em>
          Note: The structures for <code>Withdrawl</code> and <code>Jar</code>{" "}
          accounts are consistent with those detailed in other instruction
          documents.
        </em>
      </p>
    </article>
  );
}
