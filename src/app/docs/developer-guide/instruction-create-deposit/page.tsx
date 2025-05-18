import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instruction: createDeposit (SOL) - Soljar Developer Docs",
  description:
    "Technical documentation for the createDeposit (SOL) instruction in the Soljar program, used for making SOL tips.",
};

const createDepositAccounts = `
#[derive(Accounts)]
#[instruction(tip_link_id: String)]
pub struct CreateDeposit<'info> {
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
        space = 8 + Deposit::INIT_SPACE, // Define Deposit::INIT_SPACE in your state
        seeds = [b"deposit", jar.key().as_ref(), &jar.deposit_count.to_le_bytes()],
        bump,
    )]
    pub deposit: Box<Account<'info, Deposit>>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + SupporterIndex::INIT_SPACE, // Define SupporterIndex::INIT_SPACE
        seeds = [b"supporter_index", jar.key().as_ref(), &jar.supporter_index.to_le_bytes()],
        bump,
    )]
    pub supporter_index: Box<Account<'info, SupporterIndex>>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + Supporter::INIT_SPACE, // Define Supporter::INIT_SPACE
        seeds = [b"supporter", jar.key().as_ref(), signer.key().as_ref()],
        bump,
    )]
    pub supporter: Box<Account<'info, Supporter>>,

    pub system_program: Program<'info, System>,
}
`;

// Helper for basic code block styling (similar to create-spl-deposit page)
const PreCode = ({ code }: { code: string }) => (
  <pre className="bg-muted/50 border border-border rounded-lg p-4 my-4 overflow-x-auto">
    <code className="font-mono text-sm whitespace-pre">{code.trim()}</code>
  </pre>
);

export default function CreateDepositInstructionPage() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-8">
        Instruction: <code>createDeposit</code> (for SOL)
      </h1>
      <p className="text-lg mb-6">
        The <code>createDeposit</code> instruction is used to send a SOL tip to
        a Soljar user. It transfers SOL from the tipper (signer) to the
        recipient&apos;s jar, records the deposit, and updates supporter
        information.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Instruction Arguments</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <code>tip_link_id</code> (String): The public username (tip link ID)
            of the Soljar user receiving the tip. Must be lowercase. This is
            used as a seed for the <code>tip_link</code> PDA.
          </li>
          <li>
            <code>referrer</code> (String): Optional. A string to indicate who
            or what referred this tip. Max length defined by{" "}
            <code>Deposit::MAX_REFERRER_LENGTH</code>.
          </li>
          <li>
            <code>memo</code> (String): Optional. A short message or note
            associated with the tip. Max length defined by{" "}
            <code>Deposit::MAX_MEMO_LENGTH</code>.
          </li>
          <li>
            <code>amount</code> (u64): The amount of SOL (in lamports) to be
            tipped. Must be greater than 0.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Accounts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Account Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Mutability
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Signer
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2">
                  <code>signer</code>
                </td>
                <td className="px-4 py-2">Mutable</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">
                  The user initiating the deposit (the tipper). Their SOL will
                  be transferred.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code>tip_link</code>
                </td>
                <td className="px-4 py-2">Mutable</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">
                  PDA. Account associated with the <code>tip_link_id</code>.
                  Seeds:{" "}
                  <code>[b&quot;tip_link&quot;, tip_link_id.as_bytes()]</code>.
                  Has a <code>jar</code> field.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code>jar</code>
                </td>
                <td className="px-4 py-2">Mutable</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">
                  PDA. The recipient&apos;s main Soljar account where SOL is
                  deposited and counts are updated. Derived from{" "}
                  <code>tip_link</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code>deposit</code>
                </td>
                <td className="px-4 py-2">Mutable (Init)</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">
                  PDA. New account initialized to store details of this specific
                  deposit. Seeds:{" "}
                  <code>
                    [b&quot;deposit&quot;, jar.key().as_ref(),
                    &amp;jar.deposit_count.to_le_bytes()]
                  </code>
                  .
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code>supporter_index</code>
                </td>
                <td className="px-4 py-2">Mutable (Init if Needed)</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">
                  PDA. Tracks the list of supporters for the jar. Seeds:{" "}
                  <code>
                    [b&quot;supporter_index&quot;, jar.key().as_ref(),
                    &amp;jar.supporter_index.to_le_bytes()]
                  </code>
                  .
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code>supporter</code>
                </td>
                <td className="px-4 py-2">Mutable (Init if Needed)</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">
                  PDA. Tracks the tipping history of the <code>signer</code>{" "}
                  towards this specific <code>jar</code>. Seeds:{" "}
                  <code>
                    [b&quot;supporter&quot;, jar.key().as_ref(),
                    signer.key().as_ref()]
                  </code>
                  .
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">
                  <code>system_program</code>
                </td>
                <td className="px-4 py-2">N/A</td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">
                  The Solana System Program, required for account creation and
                  SOL transfers.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Logic Flow</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Input Validation:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>
                Ensures <code>tip_link_id</code> is lowercase.
              </li>
              <li>
                Checks <code>referrer</code> length against{" "}
                <code>Deposit::MAX_REFERRER_LENGTH</code>.
              </li>
              <li>
                Checks <code>memo</code> length against{" "}
                <code>Deposit::MAX_MEMO_LENGTH</code>.
              </li>
              <li>
                Verifies <code>amount</code> is greater than 0.
              </li>
            </ul>
          </li>
          <li>
            <strong>SOL Transfer:</strong> Transfers the specified{" "}
            <code>amount</code> of SOL from the <code>signer</code>&apos;s
            account to the <code>jar</code> account using a CPI to the System
            Program.
          </li>
          <li>
            <strong>Initialize Deposit Account:</strong> Creates and initializes
            the <code>deposit</code> PDA account with details such as signer,
            amount, currency (SOL), timestamp, memo, and the associated
            jar&apos;s ID.
          </li>
          <li>
            <strong>Update Jar Account:</strong> Increments the{" "}
            <code>deposit_count</code> and updates <code>updated_at</code> on
            the <code>jar</code> account.
          </li>
          <li>
            <strong>Update Supporter Account:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>
                Initializes the <code>supporter</code> PDA if it does not exist
                for the combination of <code>jar</code> and <code>signer</code>.
              </li>
              <li>
                Updates the supporter&apos;s total SOL tipped (
                <code>amount</code> for SOL currency) and <code>tip_count</code>
                .
              </li>
              <li>
                Manages up to 4 active currency tip entries (SOL, USDC, etc.)
                within the <code>supporter</code> account.
              </li>
            </ul>
          </li>
          <li>
            <strong>Update Supporter Index:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>
                Initializes the <code>supporter_index</code> PDA if it does not
                exist for the current page of supporters in the <code>jar</code>
                .
              </li>
              <li>
                Adds the <code>supporter</code> account&apos;s public key to the{" "}
                <code>supporters</code> vector in the current{" "}
                <code>supporter_index</code> account.
              </li>
              <li>
                Increments <code>total_items</code> in{" "}
                <code>supporter_index</code>.
              </li>
              <li>
                If the current <code>supporter_index</code> is full, increments{" "}
                <code>jar.supporter_index</code> to point to a new page,
                potentially creating a new index account in a subsequent
                transaction.
              </li>
              <li>
                Increments <code>supporter_count</code> on the <code>jar</code>{" "}
                account.
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Rust Accounts Struct</h2>
        <p>
          The following is the Rust struct defining the accounts required by the
          <code>createDeposit</code> instruction in the Anchor program:
        </p>
        <PreCode code={createDepositAccounts} />
        <p className="mt-2 text-sm text-muted-foreground">
          Note: <code>INIT_SPACE</code> constants for <code>Deposit</code>,{" "}
          <code>SupporterIndex</code>, and <code>Supporter</code> must be
          correctly defined in your program&apos;s state modules.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Potential Errors</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <code>SoljarError::TipLinkIdMustBeLowercase</code>: If{" "}
            <code>tip_link_id</code> is not lowercase.
          </li>
          <li>
            <code>SoljarError::ReferrerTooLong</code>: If the{" "}
            <code>referrer</code> string exceeds the maximum allowed length.
          </li>
          <li>
            <code>SoljarError::MemoTooLong</code>: If the <code>memo</code>{" "}
            string exceeds the maximum allowed length.
          </li>
          <li>
            <code>SoljarError::InvalidAmount</code>: If the deposit{" "}
            <code>amount</code> is zero.
          </li>
          <li>
            <code>SoljarError::InsufficientSolBalance</code>: If the{" "}
            <code>signer</code> does not have enough SOL to cover the deposit
            amount.
          </li>
          <li>
            <code>SoljarError::DepositCountOverflow</code>: If incrementing the
            jar&apos;s deposit count would cause an overflow.
          </li>
          <li>
            <code>SoljarError::AmountOverflow</code>: If adding the deposit
            amount to a supporter&apos;s total would cause an overflow.
          </li>
          <li>
            <code>SoljarError::TipCountOverflow</code>: If incrementing a
            supporter&apos;s tip count would cause an overflow.
          </li>
          <li>
            <code>SoljarError::MaxCurrenciesReached</code>: If trying to add a
            tip for a new currency when the supporter already tracks the maximum
            number of currencies.
          </li>
          <li>
            <code>SoljarError::PageOverflow</code>: If incrementing the
            jar&apos;s supporter index page number would cause an overflow.
          </li>
          <li>
            <code>SoljarError::IndexOverflow</code>: If incrementing the total
            items in a supporter index would cause an overflow.
          </li>
          <li>
            <code>SoljarError::SupporterIndexFull</code>: If the current
            supporter index account cannot hold more supporters.
          </li>
          <li>
            <code>SoljarError::SupporterCountOverflow</code>: If incrementing
            the jar&apos;s total supporter count would cause an overflow.
          </li>
          {/* Add other relevant Anchor or custom errors */}
        </ul>
      </section>
    </article>
  );
}
