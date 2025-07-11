use anchor_lang::prelude::*;

/// Currency mapping system using single digit IDs
/// This saves significant space compared to storing full pubkeys
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum CurrencyId {
    Sol = 0,
    Usdc = 1,
    Usdt = 2,
    // Add more currencies as needed (up to 255 with u8)
}

impl CurrencyId {
    /// Convert currency ID to mint pubkey
    pub fn to_mint(&self) -> Pubkey {
        match self {
            CurrencyId::Sol => Pubkey::default(), // Native SOL (no mint)
            CurrencyId::Usdc => pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // USDC mainnet
            CurrencyId::Usdt => pubkey!("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"), // USDT mainnet
        }
    }
    
    /// Convert mint pubkey to currency ID
    pub fn from_mint(mint: &Pubkey) -> Option<Self> {
        match *mint {
            _ if *mint == Pubkey::default() => Some(CurrencyId::Sol),
            _ if *mint == pubkey!("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") => Some(CurrencyId::Usdc),
            _ if *mint == pubkey!("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB") => Some(CurrencyId::Usdt),
            _ => None,
        }
    }
    
    /// Get currency symbol
    pub fn symbol(&self) -> &'static str {
        match self {
            CurrencyId::Sol => "SOL",
            CurrencyId::Usdc => "USDC",
            CurrencyId::Usdt => "USDT",
        }
    }
    
    /// Get currency decimals
    pub fn decimals(&self) -> u8 {
        match self {
            CurrencyId::Sol => 9,
            CurrencyId::Usdc => 6,
            CurrencyId::Usdt => 6,
        }
    }
    
    /// Check if currency is native SOL
    pub fn is_native(&self) -> bool {
        matches!(self, CurrencyId::Sol)
    }
}

impl From<u8> for CurrencyId {
    fn from(value: u8) -> Self {
        match value {
            0 => CurrencyId::Sol,
            1 => CurrencyId::Usdc,
            2 => CurrencyId::Usdt,
            _ => CurrencyId::Sol, // Default to SOL for unknown values
        }
    }
}

impl From<CurrencyId> for u8 {
    fn from(currency: CurrencyId) -> Self {
        currency as u8
    }
}

/// Helper function to validate if a mint is supported
pub fn is_supported_currency(mint: &Pubkey) -> bool {
    CurrencyId::from_mint(mint).is_some()
}

/// Get all supported currencies
pub fn get_supported_currencies() -> Vec<CurrencyId> {
    vec![CurrencyId::Sol, CurrencyId::Usdc, CurrencyId::Usdt]
}