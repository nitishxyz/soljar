use anchor_lang::prelude::*;
use anchor_lang::solana_program::instruction::{Instruction, AccountMeta};
use anchor_lang::solana_program::program::invoke_signed;

use crate::state_v2::AccountV2;
use crate::error::SoljarError;

// Define the native loader ID with the correct value
const NATIVE_LOADER_ID: Pubkey = anchor_lang::solana_program::pubkey!("NativeLoader1111111111111111111111111111111");

// Maximum number of accounts allowed per instruction to prevent DoS
const MAX_ACCOUNTS_PER_INSTRUCTION: usize = 32;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct TransactionInstruction {
    pub program_id: Pubkey,
    pub data: Vec<u8>,
    pub account_indices: Vec<u8>, // Indices into the remaining_accounts array
    pub account_write_flags: Vec<bool>, // Whether each account should be writable
}

pub fn execute_transaction<'info>(
    ctx: Context<'_, '_, '_, 'info, ExecuteTransaction<'info>>,
    instructions: Vec<TransactionInstruction>,
) -> Result<()> {
    // Validate instruction count to prevent DoS
    require!(
        instructions.len() <= 10, // Set a reasonable limit - adjust as needed
        SoljarError::InvalidAmount
    );
    
    // Validate each instruction data size
    for instruction in &instructions {
        require!(
            instruction.data.len() <= 1024, // Set a reasonable limit per instruction
            SoljarError::InvalidAmount
        );
    }
    
    let account = &ctx.accounts.account;
    let vault = &ctx.accounts.vault;
    let remaining_accounts = ctx.remaining_accounts;

    // Basic validation of account count
    require!(
        !remaining_accounts.is_empty(),
        SoljarError::MissingAccountInfo
    );

    // Check for duplicate accounts in remaining_accounts
    let mut seen_accounts = std::collections::HashSet::new();
    for acc in remaining_accounts.iter() {
        if !seen_accounts.insert(acc.key()) {
            msg!("Duplicate account detected: {}", acc.key());
            return Err(SoljarError::MissingAccountInfo.into());
        }
    }

    // Create vault PDA seeds for signing (vault acts as smart wallet)
    let account_key_bytes = account.key().to_bytes();
    let signer_seeds: &[&[&[u8]]] = &[&[
        b"vault_v2",
        &account_key_bytes,
        &[ctx.bumps.vault],
    ]];

    // Execute each instruction sequentially
    for (instruction_index, tx_instruction) in instructions.iter().enumerate() {
        msg!("Executing instruction {} of {}", instruction_index + 1, instructions.len());
        
        // Validate program is allowed (basic security checks)
        require!(
            tx_instruction.program_id != NATIVE_LOADER_ID &&
            tx_instruction.program_id != anchor_lang::solana_program::bpf_loader::ID &&
            tx_instruction.program_id != anchor_lang::solana_program::bpf_loader_deprecated::ID &&
            tx_instruction.program_id != anchor_lang::solana_program::bpf_loader_upgradeable::ID,
            SoljarError::InvalidAmount // Reuse or add appropriate error for program not allowed
        );

        // Validate account indices vector length to prevent DoS
        require!(
            tx_instruction.account_indices.len() <= MAX_ACCOUNTS_PER_INSTRUCTION,
            SoljarError::InvalidAmount
        );

        // Validate account write flags vector length
        require!(
            tx_instruction.account_write_flags.len() <= MAX_ACCOUNTS_PER_INSTRUCTION,
            SoljarError::InvalidAmount
        );

        // Validate account indices are within bounds
        for &account_index in &tx_instruction.account_indices {
            require!(
                (account_index as usize) < remaining_accounts.len(),
                SoljarError::MissingAccountInfo
            );
        }

        // Validate write flags count matches account indices count
        require!(
            tx_instruction.account_write_flags.len() == tx_instruction.account_indices.len(),
            SoljarError::InvalidAmount
        );

        // Create account metas for this instruction
        let mut account_metas = Vec::with_capacity(tx_instruction.account_indices.len());
        
        for (i, &account_index) in tx_instruction.account_indices.iter().enumerate() {
            let acc = &remaining_accounts[account_index as usize];
            let is_signer = acc.is_signer || acc.key() == vault.key();
            let is_writable = tx_instruction.account_write_flags[i];
            
            // Validate that account is actually writable if needed
            if is_writable && !acc.is_writable {
                return Err(SoljarError::MissingAccountInfo.into());
            }
            
            account_metas.push(if is_writable {
                AccountMeta::new(acc.key(), is_signer)
            } else {
                AccountMeta::new_readonly(acc.key(), is_signer)
            });
        }

        // Create the instruction
        let instruction = Instruction {
            program_id: tx_instruction.program_id,
            accounts: account_metas,
            data: tx_instruction.data.clone(),
        };

        // Collect account infos for this instruction
        let account_infos: Vec<AccountInfo<'info>> = tx_instruction.account_indices.iter()
            .map(|&index| {
                let mut acc = remaining_accounts[index as usize].clone();
                if acc.key() == vault.key() {
                    acc.is_signer = true;
                }
                acc
            })
            .collect();

        // Invoke the instruction with the collected account infos
        invoke_signed(
            &instruction,
            &account_infos,
            signer_seeds
        )?;
        
        msg!("Successfully executed instruction {}", instruction_index + 1);
    }

    Ok(())
}

#[derive(Accounts)]
pub struct ExecuteTransaction<'info> {
    /// The account that owns the vault
    #[account(
        seeds = [b"account_v2", account.owner.as_ref()],
        bump = account.bump
    )]
    pub account: Account<'info, AccountV2>,
    
    /// The vault PDA that acts as the smart wallet signer for transactions
    /// CHECK: This is a PDA used as a vault for signing transactions
    #[account(
        mut,
        seeds = [b"vault_v2", account.key().as_ref()],
        bump
    )]
    pub vault: SystemAccount<'info>,
    
    /// The owner of the account (must be signer)
    #[account(constraint = owner.key() == account.owner)]
    pub owner: Signer<'info>,
    
    /// System program for CPI calls
    pub system_program: Program<'info, System>,
}