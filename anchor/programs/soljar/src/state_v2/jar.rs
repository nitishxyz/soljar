use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct JarV2 {
    pub owner: Pubkey,                    // AccountV2 PDA that owns this jar (32 bytes)
    pub jar_number: u8,                   // Incremental jar number within account 0-255 (1 byte)
    #[max_len(32)]
    pub jar_id: String,                   // Unique jar identifier for display/linking (4 + 32 = 36 bytes)
    pub deposit_count: u32,               // Number of deposits (4 bytes)
    pub invoice_count: u32,               // Number of invoices (4 bytes)
    pub created_at: i64,                  // Creation timestamp (8 bytes)
    pub bump: u8,                         // PDA bump (1 byte)
}
// Total: ~94 bytes (still saves 31 bytes from original v2!)
// PDA: ["jar_v2", account.key(), jar_number.to_le_bytes()]
// Hierarchy: AccountV2 -> JarV2 -> DepositV2/InvoiceV2
// Uniqueness: jar_id uniqueness enforced by JarByIdV2 PDA
// Currency: Uses AccountV2's default_currency
// Benefits: Can list jars with jar_id for display, while maintaining efficient enumeration

impl JarV2 {
    pub const SEED_PREFIX: &'static [u8] = b"jar_v2";
    
    pub fn new(owner: Pubkey, jar_number: u8, jar_id: String, bump: u8) -> Result<Self> {
        Self::validate_jar_id(&jar_id)?;
        
        Ok(Self {
            owner,
            jar_number,
            jar_id,
            deposit_count: 0,
            invoice_count: 0,
            created_at: Clock::get()?.unix_timestamp,
            bump,
        })
    }
    
    pub fn increment_deposit_count(&mut self) -> Result<()> {
        self.deposit_count = self.deposit_count
            .checked_add(1)
            .ok_or(crate::error::SoljarError::DepositCountOverflow)?;
        Ok(())
    }
    
    pub fn increment_invoice_count(&mut self) -> Result<()> {
        self.invoice_count = self.invoice_count
            .checked_add(1)
            .ok_or(crate::error::SoljarError::InvoiceCountOverflow)?;
        Ok(())
    }
    
    pub fn get_jar_pda(account: &Pubkey, jar_number: u8) -> (Pubkey, u8) {
        Pubkey::find_program_address(
            &[
                Self::SEED_PREFIX,
                account.as_ref(),
                &jar_number.to_le_bytes(),
            ],
            &crate::ID,
        )
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
    
    pub fn get_jar_url(&self) -> String {
        format!("soljar.xyz/{}", self.jar_id)
    }
    
    // Total received can be calculated by summing all deposits
    // is_active status managed in off-chain database for flexibility
}