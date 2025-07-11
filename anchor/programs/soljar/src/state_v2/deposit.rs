use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct DepositV2 {
    pub depositor: Pubkey,                // Wallet address that made the deposit (32 bytes)
    pub amount: u64,                      // Deposit amount (8 bytes)
    pub currency_mint: Pubkey,            // Currency depositor chose to send (32 bytes)
    pub invoice_id: Option<u32>,          // Invoice number if paying invoice (5 bytes)
    pub created_at: i64,                  // Timestamp (8 bytes)
    pub bump: u8,                         // PDA bump (1 byte)
}
// Total: ~94 bytes = ~0.00065 SOL per deposit (~$0.13 at $200 SOL)
// Hierarchy: AccountV2 -> JarV2 -> DepositV2
// Purpose: Tracks what currency the depositor actually sent for proper accounting
// Receiver gets funds in AccountV2's default_currency
// Removed 32 bytes for jar field - can be derived from PDA seeds

impl DepositV2 {
    pub const SEED_PREFIX: &'static [u8] = b"deposit_v2";
    
    pub fn new(
        depositor: Pubkey,
        amount: u64,
        currency_mint: Pubkey,
        invoice_id: Option<u32>,
        bump: u8,
    ) -> Result<Self> {
        if amount == 0 {
            return Err(crate::error::SoljarError::InvalidAmount.into());
        }
        
        Ok(Self {
            depositor,
            amount,
            currency_mint,
            invoice_id,
            created_at: Clock::get()?.unix_timestamp,
            bump,
        })
    }
    
    pub fn is_invoice_payment(&self) -> bool {
        self.invoice_id.is_some()
    }
    
    pub fn get_invoice_number(&self) -> Option<u32> {
        self.invoice_id
    }
    
    pub fn get_invoice_id_string(&self) -> Option<String> {
        self.invoice_id.map(|id| format!("INV_{}", id))
    }
    
    pub fn validate_amount(&self) -> Result<()> {
        if self.amount == 0 {
            return Err(crate::error::SoljarError::InvalidAmount.into());
        }
        Ok(())
    }
    
    pub fn is_native_sol(&self) -> bool {
        self.currency_mint == Pubkey::default()
    }
    
    pub fn get_currency_symbol(&self) -> &'static str {
        use crate::currency::CurrencyId;
        if let Some(currency) = CurrencyId::from_mint(&self.currency_mint) {
            currency.symbol()
        } else {
            "TOKEN"
        }
    }
    
    pub fn get_currency_decimals(&self) -> u8 {
        use crate::currency::CurrencyId;
        if let Some(currency) = CurrencyId::from_mint(&self.currency_mint) {
            currency.decimals()
        } else {
            9 // Default to 9 decimals for unknown tokens
        }
    }
}