use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct JarByIdV2 {
    pub jar_id_taken: bool,           // Whether this jar_id is taken (1 byte)
    pub account: Pubkey,              // AccountV2 PDA that owns this jar_id (32 bytes)
    pub jar_number: u8,               // The incremental jar number within the account (1 byte)
}
// Total: ~34 bytes
// Purpose: Ensures global uniqueness of jar_id strings with flexible data access
// Benefits: From jar_id lookup, can derive either AccountV2 or JarV2 PDA as needed

impl JarByIdV2 {
    pub const SEED_PREFIX: &'static [u8] = b"jar_by_id_v2";
    
    pub fn new(account: Pubkey, jar_number: u8) -> Self {
        Self {
            jar_id_taken: true,
            account,
            jar_number,
        }
    }
    
    /// Get the JarV2 PDA from this mapping
    pub fn get_jar_pda(&self) -> (Pubkey, u8) {
        Pubkey::find_program_address(
            &[
                b"jar_v2",
                self.account.as_ref(),
                &self.jar_number.to_le_bytes(),
            ],
            &crate::ID,
        )
    }
    
    /// Get the AccountV2 PDA directly
    pub fn get_account_pda(&self) -> Pubkey {
        self.account
    }
    
    pub fn validate_jar_id(jar_id: &str) -> Result<()> {
        if jar_id.len() > 32 {
            return Err(crate::error::SoljarError::InvalidIdLength.into());
        }
        
        if jar_id.is_empty() {
            return Err(crate::error::SoljarError::InvalidIdLength.into());
        }
        
        // Check if jar_id contains only alphanumeric characters, hyphens, and underscores
        if !jar_id.chars().all(|c| c.is_alphanumeric() || c == '-' || c == '_') {
            return Err(crate::error::SoljarError::InvalidUsernameFormat.into());
        }
        
        // Check if jar_id is lowercase
        if jar_id != jar_id.to_lowercase() {
            return Err(crate::error::SoljarError::TipLinkIdMustBeLowercase.into());
        }
        
        Ok(())
    }
}