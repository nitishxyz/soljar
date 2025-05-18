import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instruction: createSplDeposit (SPL) - Soljar Developer Guide",
  description:
    "Technical documentation for the createSplDeposit instruction. Learn how to deposit SPL tokens to a Soljar account.",
};

export default function InstructionCreateSplDepositPage() {
  const createSplDepositAccounts = `
#[derive(Accounts)]
#[instruction(tip_link_id: String)]
pub struct CreateSplDeposit<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"tip_link", tip_link_id.as_bytes()],
        bump,
        has_one = jar,
    )]
    pub tip_link: Box<Account<'info, TipLink>>,

    #[account(mut)]
    pub jar: Box<Account<'info, Jar>>,

    #[account(
        init,
        payer = signer,
        space = 8 + Deposit::INIT_SPACE,
        seeds = [b"deposit", jar.key().as_ref(), &jar.deposit_count.to_le_bytes()],
        bump,
    )]
    pub deposit: Box<Account<'info,Deposit>>,

    pub mint: Box<InterfaceAccount<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = signer,
        token::mint = mint,
        token::authority = jar, // The Jar PDA owns this token account
        seeds = [b"token_account", jar.key().as_ref(), mint.key().as_ref()],
        bump,
    )]
    pub token_account: Box<InterfaceAccount<'info, TokenAccount>>, // Recipient's ATA for the mint, controlled by Jar

    #[account(
        mut,
        token::mint = mint, // Must be for the same mint
        token::authority = signer, // Signer must own their source ATA
    )]
    pub source_token_account: Box<InterfaceAccount<'info, TokenAccount>>, // Sender's ATA for the mint

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + SupporterIndex::INIT_SPACE,
        seeds = [b"supporter_index", jar.key().as_ref(), &jar.supporter_index.to_le_bytes()],
        bump,
    )]
    pub supporter_index: Box<Account<'info, SupporterIndex>>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + Supporter::INIT_SPACE,
        seeds = [b"supporter", jar.key().as_ref(), signer.key().as_ref()],
        bump,
    )]
    pub supporter: Box<Account<'info, Supporter>>,

    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}
  `;

  // Deposit, Supporter, SupporterIndex, Jar, TipLink structs are similar to createDeposit
  // and createUser. For brevity, they are not repeated here but should be understood
  // from those pages or a shared state documentation section.

  // Helper for basic code block styling
  const PreCode = ({ code }: { code: string }) => (
    <pre className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
      <code className="font-mono text-sm whitespace-pre">{code.trim()}</code>
    </pre>
  );

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-2">Instruction: createSplDeposit</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Processes an SPL token deposit to a user&apos;s Jar, records the
        deposit, and updates supporter information.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Function Signature</h2>
        <PreCode
          code={`pub fn create_spl_deposit(\n    ctx: Context<CreateSplDeposit>,\n    tip_link_id: String, \n    referrer: String, \n    memo: String, \n    amount: u64\n) -> Result<()>`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Arguments</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>tip_link_id: String</code> - The username (tip link ID) of the
            recipient. Must be lowercase.
          </li>
          <li>
            <code>referrer: String</code> - A referrer string. Max length
            determined by <code>Deposit::MAX_REFERRER_LENGTH</code>.
          </li>
          <li>
            <code>memo: String</code> - An optional memo for the deposit. Max
            length determined by <code>Deposit::MAX_MEMO_LENGTH</code>.
          </li>
          <li>
            <code>amount: u64</code> - The amount of the SPL token to deposit,
            in its smallest unit (e.g., 1,000,000 for 1 USDC if USDC has 6
            decimals). Must be greater than 0.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Accounts Context (<code>CreateSplDeposit</code>)
        </h2>
        <PreCode code={createSplDepositAccounts} />
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <code>signer: Signer&lt;&apos;info&gt;</code>: The wallet initiating
            the deposit (sender).
          </li>
          <li>
            <code>tip_link: Box&lt;Account&lt;&apos;info, TipLink&gt;&gt;</code>
            : Recipient&apos;s <code>TipLink</code>. Seeds:{" "}
            <code>[b&quot;tip_link&quot;, tip_link_id.as_bytes()]</code>.
            Mutable.
          </li>
          <li>
            <code>jar: Box&lt;Account&lt;&apos;info, Jar&gt;&gt;</code>:
            Recipient&apos;s <code>Jar</code>. Mutable.
          </li>
          <li>
            <code>deposit: Box&lt;Account&lt;&apos;info, Deposit&gt;&gt;</code>:
            Record of the deposit. Seeds:{" "}
            <code>
              [b&quot;deposit&quot;, jar.key().as_ref(),
              &amp;jar.deposit_count.to_le_bytes()]
            </code>
            . Initialized.
          </li>
          <li>
            <code>
              mint: Box&lt;InterfaceAccount&lt;&apos;info, Mint&gt;&gt;
            </code>
            : The SPL Token Mint account for the token being deposited (e.g.,
            USDC mint).
          </li>
          <li>
            <code>
              token_account: Box&lt;InterfaceAccount&lt;&apos;info,
              TokenAccount&gt;&gt;
            </code>
            : The recipient Jar&apos;s Associated Token Account (ATA) for the
            specified <code>mint</code>. Tokens are sent here. Seeds:{" "}
            <code>
              [b&quot;token_account&quot;, jar.key().as_ref(),
              mint.key().as_ref()]
            </code>
            . Initialized if needed, authority is the <code>jar</code> PDA.
          </li>
          <li>
            <code>
              source_token_account: Box&lt;InterfaceAccount&lt;&apos;info,
              TokenAccount&gt;&gt;
            </code>
            : The sender&apos;s ATA for the specified <code>mint</code>. Tokens
            are sent from here. Mutable, authority must be <code>signer</code>.
          </li>
          <li>
            <code>
              supporter_index: Box&lt;Account&lt;&apos;info,
              SupporterIndex&gt;&gt;
            </code>
            : Index of supporters. Seeds:{" "}
            <code>
              [b&quot;supporter_index&quot;, jar.key().as_ref(),
              &amp;jar.supporter_index.to_le_bytes()]
            </code>
            . Initialized if needed.
          </li>
          <li>
            <code>
              supporter: Box&lt;Account&lt;&apos;info, Supporter&gt;&gt;
            </code>
            : Sender&apos;s support record for this jar. Seeds:{" "}
            <code>
              [b&quot;supporter&quot;, jar.key().as_ref(),
              signer.key().as_ref()]
            </code>
            . Initialized if needed.
          </li>
          <li>
            <code>system_program: Program&lt;&apos;info, System&gt;</code>: For
            account initializations.
          </li>
          <li>
            <code>
              token_program: Interface&lt;&apos;info, TokenInterface&gt;
            </code>
            : The SPL Token program, for token transfers.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Logic Overview</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Determines the internal <code>currency</code> enum from the provided{" "}
            <code>mint</code> public key using{" "}
            <code>get_currency_from_mint</code>.
          </li>
          <li>
            Validates <code>tip_link_id</code>, <code>referrer</code>,{" "}
            <code>memo</code>, and <code>amount</code>.
          </li>
          <li>
            Checks if the <code>source_token_account</code> has sufficient
            balance and matches the <code>mint</code>.
          </li>
          <li>
            Ensures the recipient&apos;s <code>token_account</code> also matches
            the <code>mint</code>.
          </li>
          <li>
            Performs a CPI <code>transfer_checked</code> to the{" "}
            <code>token_program</code> to transfer tokens from{" "}
            <code>source_token_account</code> to the Jar&apos;s{" "}
            <code>token_account</code>.
          </li>
          <li>
            Initializes the <code>Deposit</code> account, storing the derived{" "}
            <code>currency</code> type.
          </li>
          <li>
            Increments <code>deposit_count</code> on the <code>Jar</code>.
          </li>
          <li>
            Executes the same supporter logic as <code>createDeposit</code>:
            updates or initializes <code>Supporter</code> and{" "}
            <code>SupporterIndex</code> accounts, using the derived SPL token{" "}
            <code>currency</code>.
          </li>
          <li>
            Updates <code>updated_at</code> on the <code>Jar</code>.
          </li>
        </ol>
        <p className="mt-2 text-sm text-muted-foreground">
          The <code>get_currency_from_mint</code> utility function (not detailed
          here) is responsible for mapping SPL token mint addresses to internal
          currency enum values (e.g., USDC mint to <code>Currency::Usdc</code>).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Key Differences from <code>createDeposit</code> (SOL)
        </h2>
        <ul className="list-disc list-inside">
          <li>Handles SPL tokens instead of SOL.</li>
          <li>
            Requires <code>mint</code>, recipient&apos;s{" "}
            <code>token_account</code> (jar-owned ATA), and sender&apos;s{" "}
            <code>source_token_account</code>.
          </li>
          <li>
            Uses <code>token_program.transfer_checked</code> for the transfer.
          </li>
          <li>
            The <code>currency</code> field in the <code>Deposit</code> account
            is set based on the SPL token&apos;s mint.
          </li>
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        <em>
          Note: The structures for <code>Deposit</code>, <code>Supporter</code>,{" "}
          <code>SupporterIndex</code>, <code>Jar</code>, and{" "}
          <code>TipLink</code> accounts are consistent with those detailed in
          the <code>createUser</code> and <code>createDeposit</code> instruction
          documents.
        </em>
      </p>
    </article>
  );
}
