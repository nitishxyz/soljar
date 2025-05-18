import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instruction: createSupporterIndex - Soljar Developer Guide",
  description:
    "Technical documentation for the createSupporterIndex instruction. Learn how supporter index accounts are initialized for pagination.",
};

export default function InstructionCreateSupporterIndexPage() {
  const createSupporterIndexAccounts = `
#[derive(Accounts)]
#[instruction(index: u32)]
pub struct CreateSupporterIndex<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        mut, // Jar might be marked mut if other logic were to update it here
        seeds = [b"jar", signer.key().as_ref()],
        bump
    )]
    pub jar: Box<Account<'info, Jar>>,

    #[account(
        init,
        payer = signer,
        space = 8 + SupporterIndex::INIT_SPACE,
        seeds = [b"supporter_index", jar.key().as_ref(), &index.to_le_bytes()],
        bump
    )]
    pub supporter_index: Box<Account<'info, SupporterIndex>>,

    pub system_program: Program<'info, System>,
}
  `;

  // SupporterIndex and Jar structs are detailed in other instruction docs.

  // Helper for basic code block styling
  const PreCode = ({ code }: { code: string }) => (
    <pre className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
      <code className="font-mono text-sm whitespace-pre">{code.trim()}</code>
    </pre>
  );

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-2">
        Instruction: createSupporterIndex
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Initializes a new, empty <code>SupporterIndex</code> account for a
        specific Jar and page index. This is typically used to prepare the next
        page for storing supporter pubkeys when a previous page becomes full.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Function Signature</h2>
        <PreCode
          code={`pub fn create_supporter_index(_ctx: Context<CreateSupporterIndex>, _index: u32) -> Result<()>`}
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Note: The current handler logic for this instruction is empty (
          <code>Ok(())</code>). Its primary role is the initialization of the{" "}
          <code>supporter_index</code> account via Anchor&apos;s{" "}
          <code>#[account(init)]</code> macro.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Arguments</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>index: u32</code> - The page number for this new supporter
            index. This value is used in the PDA seeds for the{" "}
            <code>supporter_index</code> account, allowing multiple pages per
            Jar.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Accounts Context (<code>CreateSupporterIndex</code>)
        </h2>
        <PreCode code={createSupporterIndexAccounts} />
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <code>signer: Signer&lt;&apos;info&gt;</code>: The wallet
            initializing this supporter index page (typically the Jar owner).
            Pays for the new account. Mutable.
          </li>
          <li>
            <code>jar: Box&lt;Account&lt;&apos;info, Jar&gt;&gt;</code>: The{" "}
            <code>Jar</code> account to which this supporter index page belongs.
            Seeds: <code>[b&quot;jar&quot;, signer.key().as_ref()]</code>.
            Mutable.
          </li>
          <li>
            <code>
              supporter_index: Box&lt;Account&lt;&apos;info,
              SupporterIndex&gt;&gt;
            </code>
            : The new <code>SupporterIndex</code> account to be initialized.
            Seeds:{" "}
            <code>
              [b&quot;supporter_index&quot;, jar.key().as_ref(),
              &amp;index.to_le_bytes()]
            </code>
            .
          </li>
          <li>
            <code>system_program: Program&lt;&apos;info, System&gt;</code>:
            Required for account creation.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Logic Overview</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            The instruction handler itself currently performs no actions beyond
            what Anchor does for account initialization.
          </li>
          <li>
            A new <code>SupporterIndex</code> account is created and
            initialized. Its <code>total_items</code> will be 0 and its{" "}
            <code>supporters</code> vector will be empty.
          </li>
          <li>
            This instruction is designed to be called when the{" "}
            <code>jar.supporter_index</code> field (which tracks the current
            active page number) has been incremented (likely within the{" "}
            <code>createDeposit</code> or <code>createSplDeposit</code>{" "}
            instructions when a previous supporter index page filled up). The
            client or a separate process would then call this instruction with
            the new <code>jar.supporter_index</code> value as the{" "}
            <code>index</code> argument to prepare the next storage page.
          </li>
        </ol>
      </section>

      <p className="text-sm text-muted-foreground">
        <em>
          Note: The actual adding of supporter pubkeys to a{" "}
          <code>SupporterIndex</code> account occurs within the{" "}
          <code>createDeposit</code> and <code>createSplDeposit</code>{" "}
          instructions. This instruction only sets up an empty page. The{" "}
          <code>SupporterIndex</code> and <code>Jar</code> account structures
          are detailed in other instruction documents.
        </em>
      </p>
    </article>
  );
}
