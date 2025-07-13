use anchor_lang::prelude::*;

use crate::currency::CurrencyId;
use crate::error::SoljarError;
use crate::state_v2::{AccountV2, JarV2, JarByIdV2};

pub fn setup_account(
    ctx: Context<SetupAccount>,
    jar_id: String,
    default_currency_id: Option<u8>,
) -> Result<()> {
    // Validate jar_id
    JarByIdV2::validate_jar_id(&jar_id)?;
    
    let clock = Clock::get()?;
    let owner = ctx.accounts.owner.key();
    
    // Set default currency (default to USDC if not provided)
    let currency_id = default_currency_id.unwrap_or(CurrencyId::Usdc as u8);
    
    // Validate currency ID is supported
    let currency = CurrencyId::from(currency_id);
    require!(
        matches!(currency, CurrencyId::Sol | CurrencyId::Usdc | CurrencyId::Usdt),
        SoljarError::InvalidAmount
    );

    // Initialize AccountV2
    let account = &mut ctx.accounts.account;
    account.owner = owner;
    account.default_jar_number = 0; // First jar will be jar number 0
    account.default_currency_id = currency_id;
    account.jar_count = 1; // Starting with one jar
    account.created_at = clock.unix_timestamp;
    account.updated_at = clock.unix_timestamp;
    account.bump = ctx.bumps.account;

    // Initialize JarV2 (first jar with number 0)
    let jar = &mut ctx.accounts.jar;
    jar.owner = account.key();
    jar.jar_number = 0; // First jar is always number 0
    jar.jar_id = jar_id.clone();
    jar.deposit_count = 0;
    jar.invoice_count = 0;
    jar.created_at = clock.unix_timestamp;
    jar.bump = ctx.bumps.jar;

    // Initialize JarByIdV2 for global jar_id uniqueness
    let jar_by_id = &mut ctx.accounts.jar_by_id;
    jar_by_id.jar_id_taken = true;
    jar_by_id.account = account.key();
    jar_by_id.jar_number = 0;

    msg!("Account setup completed for owner: {}", owner);
    msg!("First jar created with ID: {}", jar_id);
    msg!("Default currency: {}", currency.symbol());

    Ok(())
}

#[derive(Accounts)]
#[instruction(jar_id: String)]
pub struct SetupAccount<'info> {
    /// The owner/creator of the account (must be signer)
    #[account(mut)]
    pub owner: Signer<'info>,

    /// The paymaster for account creation (can be same as owner)
    #[account(mut)]
    pub paymaster: Signer<'info>,

    /// The main AccountV2 PDA
    #[account(
        init,
        payer = paymaster,
        space = 8 + AccountV2::INIT_SPACE,
        seeds = [AccountV2::SEED_PREFIX, owner.key().as_ref()],
        bump
    )]
    pub account: Account<'info, AccountV2>,

    /// The first jar (jar number 0)
    #[account(
        init,
        payer = paymaster,
        space = 8 + JarV2::INIT_SPACE,
        seeds = [
            JarV2::SEED_PREFIX,
            account.key().as_ref(),
            &0u8.to_le_bytes()
        ],
        bump
    )]
    pub jar: Account<'info, JarV2>,

    /// The jar_by_id mapping for global uniqueness
    #[account(
        init,
        payer = paymaster,
        space = 8 + JarByIdV2::INIT_SPACE,
        seeds = [JarByIdV2::SEED_PREFIX, jar_id.as_bytes()],
        bump
    )]
    pub jar_by_id: Account<'info, JarByIdV2>,

    /// The vault PDA for holding funds (derived but not initialized as an account)
    /// CHECK: This is a PDA used as a vault for holding funds
    #[account(
        mut,
        seeds = [b"vault_v2", account.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>,

    /// System program for account creation
    pub system_program: Program<'info, System>,
}