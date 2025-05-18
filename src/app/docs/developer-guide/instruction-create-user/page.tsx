export default function InstructionCreateUserPage() {
  const createUserAccounts = `
#[derive(Accounts)]
#[instruction(username: String)]
pub struct CreateUser<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = 8 + User::INIT_SPACE,
        seeds = [b"user", signer.key().as_ref()],
        bump
    )]
    pub user: Box<Account<'info, User>>,

    #[account(
        init,
        payer = signer,
        space = 8 + UserByName::INIT_SPACE,
        seeds = [b"username", username.as_bytes()],
        bump
    )]
    pub user_by_name: Box<Account<'info, UserByName>>,

    #[account(
        init,
        payer = signer,
        space = 8 + Jar::INIT_SPACE,
        seeds = [b"jar", signer.key().as_ref()],
        bump
    )]
    pub jar: Box<Account<'info, Jar>>,

    #[account(
        init,
        payer = signer,
        space = 8 + TipLink::INIT_SPACE,
        seeds = [b"tip_link", username.as_bytes()],
        bump
    )]
    pub tip_link: Box<Account<'info, TipLink>>,

    system_program: Program<'info, System>,
}
  `;

  const userAccountStruct = `
#[account]
#[derive(InitSpace)]
pub struct User {
    pub user: Pubkey,       // The authority (wallet) of the user
    pub jar: Pubkey,        // Public key of the associated Jar account
    #[max_len(15)]
    pub username: String,   // Chosen username for the Soljar profile
    pub created_at: i64,    // Timestamp of creation
    pub updated_at: i64,    // Timestamp of last update
}
  `;

  const userByNameStruct = `
#[account]
pub struct UserByName {
    pub username_taken: bool, // Flag to indicate if the username is already in use
}

impl UserByName {
    pub const INIT_SPACE: usize = 1; // Size for a boolean
}
  `;

  const jarAccountStruct = `
#[account]
#[derive(InitSpace)]
pub struct Jar {
    pub user: Pubkey,            // The User account this Jar belongs to
    pub deposit_count: u32,
    pub withdrawl_count: u32,
    pub supporter_count: u32,
    pub supporter_index: u32,
    pub created_at: i64,
    pub updated_at: i64,
    #[max_len(25)]
    pub id: String,              // Typically the username, acts as Jar ID
    pub bump: u8,
}
  `;

  const tipLinkAccountStruct = `
#[account]
#[derive(InitSpace)]
pub struct TipLink {
    pub user: Pubkey,   // The User account this TipLink belongs to
    pub jar: Pubkey,    // The Jar account this TipLink is associated with
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
      <h1 className="text-4xl font-bold mb-2">Instruction: createUser</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Initializes a new Soljar user, creating associated accounts for their
        profile, jar, and tip link.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Function Signature</h2>
        <PreCode
          code={`pub fn create_user(ctx: Context<CreateUser>, username: String) -> Result<()>`}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Arguments</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>username: String</code> - The desired username for the new
            Soljar profile. It must adhere to the following validation rules:
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
              <li>Maximum length: 15 characters.</li>
              <li>Must be unique (not already taken).</li>
              <li>Must be in lowercase.</li>
              <li>
                Must only contain alphanumeric characters or underscores (
                <code>_</code>).
              </li>
              <li>
                Must not be a disallowed username (e.g., reserved words,
                offensive terms - checked by <code>is_username_disallowed</code>{" "}
                utility).
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Accounts Context (<code>CreateUser</code>)
        </h2>
        <p className="mb-2">
          The following accounts are required by this instruction:
        </p>
        <PreCode code={createUserAccounts} />
        <ul className="list-disc list-inside space-y-3 mt-4">
          <li>
            <code>signer: Signer&lt;&apos;info&gt;</code>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
              <li>The wallet creating the user account.</li>
              <li>Acts as the payer for account initializations.</li>
              <li>
                Becomes the authority for the new <code>User</code> account.
              </li>
            </ul>
          </li>
          <li>
            <code>user: Box&lt;Account&lt;&apos;info, User&gt;&gt;</code>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
              <li>The main state account for the new user.</li>
              <li>
                PDA seeded with{" "}
                <code>[b&quot;user&quot;, signer.key().as_ref()]</code>.
              </li>
              <li>Initialized by this instruction.</li>
            </ul>
          </li>
          <li>
            <code>
              user_by_name: Box&lt;Account&lt;&apos;info, UserByName&gt;&gt;
            </code>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
              <li>Tracks username uniqueness.</li>
              <li>
                PDA seeded with{" "}
                <code>[b&quot;username&quot;, username.as_bytes()]</code>.
              </li>
              <li>
                Initialized by this instruction; <code>username_taken</code> is
                set to <code>true</code>.
              </li>
            </ul>
          </li>
          <li>
            <code>jar: Box&lt;Account&lt;&apos;info, Jar&gt;&gt;</code>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
              <li>The state account for the user&apos;s tip jar.</li>
              <li>
                PDA seeded with{" "}
                <code>[b&quot;jar&quot;, signer.key().as_ref()]</code>.
              </li>
              <li>Initialized by this instruction.</li>
            </ul>
          </li>
          <li>
            <code>tip_link: Box&lt;Account&lt;&apos;info, TipLink&gt;&gt;</code>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
              <li>
                The state account for the user&apos;s tip link (associated with
                the username).
              </li>
              <li>
                PDA seeded with{" "}
                <code>[b&quot;tip_link&quot;, username.as_bytes()]</code>.
              </li>
              <li>Initialized by this instruction.</li>
            </ul>
          </li>
          <li>
            <code>system_program: Program&lt;&apos;info, System&gt;</code>
            <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
              <li>
                The Solana System Program, required for creating new accounts.
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Logic Overview</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Validates the provided <code>username</code> against length, format,
            and disallow-list rules.
          </li>
          <li>
            Checks the <code>user_by_name</code> account to ensure the username
            is not already taken. If <code>user_by_name.username_taken</code> is
            true, it returns a <code>UsernameAlreadyTaken</code> error.
          </li>
          <li>
            Initializes the <code>User</code> account (
            <code>ctx.accounts.user</code>) with the signer&apos;s public key as
            the user authority, the chosen username, the public key of the newly
            created <code>Jar</code> account, and creation/update timestamps.
          </li>
          <li>
            Initializes the <code>Jar</code> account (
            <code>ctx.accounts.jar</code>) with a reference to the{" "}
            <code>User</code> account, the username as its ID, the bump seed,
            and creation/update timestamps.
          </li>
          <li>
            Initializes the <code>TipLink</code> account (
            <code>ctx.accounts.tip_link</code>) with references to the{" "}
            <code>User</code> and <code>Jar</code> accounts.
          </li>
          <li>
            Updates the <code>user_by_name</code> account by setting its{" "}
            <code>username_taken</code> field to <code>true</code> to reserve
            the username.
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Related Account Structures
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-2">User Account</h3>
        <PreCode code={userAccountStruct} />

        <h3 className="text-xl font-medium mt-6 mb-2">UserByName Account</h3>
        <PreCode code={userByNameStruct} />

        <h3 className="text-xl font-medium mt-6 mb-2">Jar Account</h3>
        <PreCode code={jarAccountStruct} />

        <h3 className="text-xl font-medium mt-6 mb-2">TipLink Account</h3>
        <PreCode code={tipLinkAccountStruct} />
      </section>
    </article>
  );
}
