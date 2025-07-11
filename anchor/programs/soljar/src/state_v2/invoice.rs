use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct InvoiceV2 {
    pub owner: Pubkey,                    // JarV2 PDA that owns this invoice (32 bytes)
    pub invoice_number: u32,              // Invoice number (4 bytes)
    pub amount: u64,                      // Required payment amount (8 bytes)
    pub is_paid: bool,                    // Payment status (1 byte)
    pub paid_by: Option<Pubkey>,          // Payer address (1 + 32 = 33 bytes)
    pub expires_at: Option<i64>,          // Expiration timestamp (1 + 8 = 9 bytes)
    pub created_at: i64,                  // Creation timestamp (8 bytes)
    pub bump: u8,                         // PDA bump (1 byte)
}
// Total: ~106 bytes
// Hierarchy: AccountV2 -> JarV2 -> InvoiceV2
// Currency: Uses AccountV2's default_currency (via JarV2's owner)
// Off-chain DB: title, description, notes, customer info, etc.
// Removed: paid_at (can get from deposit transaction timestamp)
// Off-chain DB: title, description, notes, customer info, etc.

impl InvoiceV2 {
    pub const SEED_PREFIX: &'static [u8] = b"invoice_v2";
    
    pub fn mark_as_paid(&mut self, payer: Pubkey) -> Result<()> {
        if self.is_paid {
            return Err(crate::error::SoljarError::InvalidDeposit.into());
        }
        
        // Check if invoice has expired
        if let Some(expires_at) = self.expires_at {
            let current_time = Clock::get()?.unix_timestamp;
            if current_time > expires_at {
                return Err(crate::error::SoljarError::InvalidDeposit.into());
            }
        }
        
        self.is_paid = true;
        self.paid_by = Some(payer);
        // paid_at timestamp can be retrieved from deposit transaction
        Ok(())
    }
    
    pub fn is_expired(&self) -> Result<bool> {
        if let Some(expires_at) = self.expires_at {
            let current_time = Clock::get()?.unix_timestamp;
            Ok(current_time > expires_at)
        } else {
            Ok(false)
        }
    }
    
    pub fn get_invoice_id(&self) -> String {
        format!("INV_{}", self.invoice_number)
    }
    
    pub fn validate_amount(&self) -> Result<()> {
        if self.amount == 0 {
            return Err(crate::error::SoljarError::InvalidAmount.into());
        }
        Ok(())
    }
    
    pub fn validate_expiration(&self) -> Result<()> {
        if let Some(expires_at) = self.expires_at {
            let current_time = Clock::get()?.unix_timestamp;
            if expires_at <= current_time {
                return Err(crate::error::SoljarError::InvalidDeposit.into());
            }
        }
        Ok(())
    }
    
    pub fn update_amount(&mut self, new_amount: u64) -> Result<()> {
        if self.is_paid {
            return Err(crate::error::SoljarError::NoChanges.into());
        }
        
        if new_amount == 0 {
            return Err(crate::error::SoljarError::InvalidAmount.into());
        }
        
        self.amount = new_amount;
        Ok(())
    }
    
    pub fn can_be_paid(&self) -> Result<bool> {
        if self.is_paid {
            return Ok(false);
        }
        
        if self.is_expired()? {
            return Ok(false);
        }
        
        Ok(true)
    }
    

}