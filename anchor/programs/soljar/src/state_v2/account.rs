use crate::currency::CurrencyId;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct AccountV2 {
    pub owner: Pubkey,           // Wallet address that owns this account (32 bytes)
    pub default_jar_number: u8,  // Default jar number for payments (1 byte) - saves 31 bytes!
    pub default_currency_id: u8, // Default currency ID for receiving funds (1 byte)
    pub jar_count: u32,          // Number of jars created (4 bytes)
    pub created_at: i64,         // Creation timestamp (8 bytes)
    pub updated_at: i64,         // Last update timestamp (8 bytes)
    pub bump: u8,                // PDA bump (1 byte)
}
// Total: ~63 bytes (saved 62 bytes total with both optimizations!)
// Hierarchy: Root level - AccountV2 owns JarV2s, which own InvoiceV2s and DepositV2s
// Currency: All invoices use default_currency_id mapped to actual mint
// Default Jar: default_jar_number maps to JarV2 PDA via jar numbering system
// Transfers: Use execute_transaction instruction to transfer from vault PDA
// Storage: Tokens stored in associated token accounts

impl AccountV2 {
    pub const SEED_PREFIX: &'static [u8] = b"account_v2";
    
    pub fn get_account_pda(owner: &Pubkey) -> (Pubkey, u8) {
        Pubkey::find_program_address(
            &[Self::SEED_PREFIX, owner.as_ref()],
            &crate::ID,
        )
    }
    
    pub fn key(&self) -> Pubkey {
        Self::get_account_pda(&self.owner).0
    }

    pub fn increment_jar_count(&mut self) -> Result<()> {
        self.jar_count = self
            .jar_count
            .checked_add(1)
            .ok_or(crate::error::SoljarError::JarCountOverflow)?;
        self.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn get_default_currency(&self) -> CurrencyId {
        CurrencyId::from(self.default_currency_id)
    }

    pub fn get_default_currency_mint(&self) -> Pubkey {
        self.get_default_currency().to_mint()
    }

    pub fn update_default_currency(&mut self, currency: CurrencyId) -> Result<()> {
        self.default_currency_id = currency.into();
        self.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn get_currency_symbol(&self) -> &'static str {
        self.get_default_currency().symbol()
    }

    pub fn get_currency_decimals(&self) -> u8 {
        self.get_default_currency().decimals()
    }

    pub fn is_native_currency(&self) -> bool {
        self.get_default_currency().is_native()
    }

    pub fn get_default_jar_pda(&self) -> (Pubkey, u8) {
        crate::state_v2::JarV2::get_jar_pda(&self.key(), self.default_jar_number)
    }

    pub fn update_default_jar(&mut self, jar_number: u8) -> Result<()> {
        // Validate jar_number is within created jars
        require!(
            jar_number < self.jar_count as u8,
            crate::error::SoljarError::InvalidAmount // Reuse or add appropriate error
        );

        self.default_jar_number = jar_number;
        self.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn set_first_jar_as_default(&mut self) -> Result<()> {
        require!(self.jar_count > 0, crate::error::SoljarError::InvalidAmount);

        self.default_jar_number = 0; // First jar is always jar_number 0
        self.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}
