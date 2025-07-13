use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

use crate::currency::CurrencyId;
use crate::error::SoljarError;
use crate::state_v2::{AccountV2, DepositV2, JarByIdV2, JarV2};

pub fn deposit(
    ctx: Context<Deposit>,
    jar_id: String,
    amount: u64,
    invoice_id: Option<u32>,
) -> Result<()> {
    // Validate amount
    require!(amount > 0, SoljarError::InvalidAmount);

    let clock = Clock::get()?;
    let depositor = ctx.accounts.depositor.key();

    // Get jar info from jar_by_id mapping
    let jar_by_id = &ctx.accounts.jar_by_id;
    require!(jar_by_id.jar_id_taken, SoljarError::JarNotFound);

    // Verify jar belongs to the account
    let jar = &mut ctx.accounts.jar;
    require!(jar.owner == jar_by_id.account, SoljarError::JarNotFound);

    // Only USDC is supported for now
    let usdc_mint = CurrencyId::Usdc.to_mint();

    // Verify the mint is USDC
    require!(
        ctx.accounts.mint.key() == usdc_mint,
        SoljarError::InvalidCurrencyMint
    );

    // USDC token transfer
    let transfer_instruction = Transfer {
        from: ctx.accounts.depositor_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.depositor.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        transfer_instruction,
    );
    token::transfer(cpi_ctx, amount)?;

    // Create deposit record
    let deposit = &mut ctx.accounts.deposit;
    deposit.depositor = depositor;
    deposit.amount = amount;
    deposit.currency_mint = usdc_mint;
    deposit.invoice_id = invoice_id;
    deposit.created_at = clock.unix_timestamp;
    deposit.bump = ctx.bumps.deposit;

    // Update jar deposit count
    jar.deposit_count = jar
        .deposit_count
        .checked_add(1)
        .ok_or(SoljarError::DepositCountOverflow)?;

    // TODO: Add Jupiter CPI integration here for currency conversion
    // This is where we'll add the Jupiter swap logic to convert
    // other currencies to USDC if needed in the future

    msg!("USDC deposit completed:");
    msg!("  Depositor: {}", depositor);
    msg!("  Amount: {} USDC", amount);
    msg!("  Jar ID: {}", jar_id);
    if let Some(inv_id) = invoice_id {
        msg!("  Invoice ID: {}", inv_id);
    }

    Ok(())
}

#[derive(Accounts)]
#[instruction(jar_id: String)]
pub struct Deposit<'info> {
    /// The depositor making the payment
    #[account(mut)]
    pub depositor: Signer<'info>,

    /// The jar_by_id mapping to find the jar
    #[account(
        seeds = [JarByIdV2::SEED_PREFIX, jar_id.as_bytes()],
        bump,
        has_one = account
    )]
    pub jar_by_id: Account<'info, JarByIdV2>,

    /// The account that owns the jar
    #[account()]
    pub account: Account<'info, AccountV2>,

    /// The jar receiving the deposit
    #[account(
        mut,
        seeds = [
            JarV2::SEED_PREFIX,
            jar_by_id.account.as_ref(),
            &jar_by_id.jar_number.to_le_bytes()
        ],
        bump
    )]
    pub jar: Account<'info, JarV2>,

    /// The deposit record
    #[account(
        init,
        payer = depositor,
        space = 8 + DepositV2::INIT_SPACE,
        seeds = [
            DepositV2::SEED_PREFIX,
            jar.key().as_ref(),
            &jar.deposit_count.to_le_bytes()
        ],
        bump
    )]
    pub deposit: Account<'info, DepositV2>,

    /// The vault for holding funds
    /// CHECK: This is a PDA used as a vault for holding funds
    #[account(
        mut,
        seeds = [b"vault_v2", account.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>,

    /// USDC mint account
    #[account(
        constraint = mint.key() == CurrencyId::Usdc.to_mint() @ SoljarError::InvalidCurrencyMint
    )]
    pub mint: Account<'info, Mint>,

    /// Depositor's USDC token account
    #[account(
        mut,
        constraint = depositor_token_account.mint == mint.key() @ SoljarError::InvalidTokenMint,
        constraint = depositor_token_account.owner == depositor.key() @ SoljarError::MissingAccountInfo
    )]
    pub depositor_token_account: Account<'info, TokenAccount>,

    /// Vault's USDC token account (created during setup)
    #[account(
        mut,
        associated_token::mint = CurrencyId::Usdc.to_mint(),
        associated_token::authority = vault
    )]
    pub vault_token_account: Account<'info, TokenAccount>,

    /// System program
    pub system_program: Program<'info, System>,
    /// Token program
    pub token_program: Program<'info, Token>,
    /// Associated token program
    pub associated_token_program: Program<'info, AssociatedToken>,
    // TODO: Add Jupiter program accounts here when implementing CPI
    // pub jupiter_program: Program<'info, Jupiter>,
    // pub jupiter_accounts: JupiterSwapAccounts<'info>,
}

// Helper struct for future Jupiter integration
// TODO: Implement this when adding Jupiter CPI
/*
#[derive(Accounts)]
pub struct JupiterSwapAccounts<'info> {
    // Jupiter-specific accounts will go here
    // This will include swap accounts, token accounts, etc.
}
*/
