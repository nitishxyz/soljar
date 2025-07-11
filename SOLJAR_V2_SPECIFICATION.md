# SolJar V2 Smart Contract Specification

## Overview
SolJar V2 introduces enhanced payment functionality with unique link generation, invoice management, and seamless token swapping through Jupiter integration. This version maintains backward compatibility with V1 while adding new instruction sets for improved user experience.

## Current V1 Architecture Analysis

### Existing Account Structures
- **User**: User profile with username and jar reference
- **Jar**: Main payment container with deposit/withdrawal tracking
- **TipLink**: Links jar to specific tip URLs (soljar.xyz/username)
- **Deposit**: Individual payment records
- **Withdrawal**: Withdrawal transaction records
- **Supporter**: User support tracking
- **SupporterIndex**: Paginated supporter management

### Existing Instructions
1. `create_user` - Creates user profile with default jar and tip link
2. `create_deposit` - SOL deposits to tip links
3. `create_spl_deposit` - SPL token deposits
4. `create_withdrawal` - Withdrawal requests
5. `withdraw_spl_tokens` - Execute SPL token withdrawals
6. `create_supporter_index` - Supporter pagination management

## V2 New Features & Requirements

### Link Structure
- **Jar Links**: `soljar.xyz/jarId` (unique jar identifiers)
- **Invoice Links**: `soljar.xyz/jarId/invoiceId` (specific payment requests)
- **Backward Compatibility**: Existing `soljar.xyz/username` links remain functional

### Currency Management
- **Default Currency**: USDC (configurable per account or jar)
- **Alternative Defaults**: USDT, SOL support
- **Jupiter Integration**: Automatic token swapping to preferred currency
- **Multi-Currency Support**: Accept any SPL token, convert to default

## V2 Account Structures & Indexing Strategy

### Indexing Philosophy
- **Cost-Effective**: Use counters in parent accounts to avoid separate index PDAs
- **Scalable**: Counter-based PDA seeds enable predictable querying
- **Efficient**: Each item gets its own PDA with essential data only

### Counter Management
- **Account Level**: `jar_count`, `withdrawal_count`
- **Jar Level**: `deposit_count`, `invoice_count`
- **Money Flow**: All deposits/withdrawals go through vault (account-level)
- **Jars**: Used for categorization and UI organization only

### 1. AccountV2
```rust
#[account]
#[derive(InitSpace)]
pub struct AccountV2 {
    pub owner: Pubkey,                    // Account owner
    pub vault: Pubkey,                    // Associated vault PDA
    pub default_jar: Pubkey,              // Default jar for payments
    pub default_currency: Pubkey,         // Default currency mint (USDC/USDT)
    pub jar_count: u32,                   // Number of jars created (indexing)
    pub withdrawal_count: u32,            // Number of withdrawals made (indexing)
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
```

**PDA Seeds**: `["account_v2", owner.key()]`

### 2. VaultV2
```rust
#[account]
#[derive(InitSpace)]
pub struct VaultV2 {
    pub account: Pubkey,                  // Parent account
    pub owner: Pubkey,                    // Vault owner
    pub total_balance_usdc: u64,          // Total USDC balance
    pub total_balance_usdt: u64,          // Total USDT balance
    pub total_balance_sol: u64,           // Total SOL balance
    pub supported_currencies: Vec<Pubkey>, // Supported token mints
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
```

**PDA Seeds**: `["vault_v2", account.key()]`

### 3. JarV2
```rust
#[account]
#[derive(InitSpace)]
pub struct JarV2 {
    pub account: Pubkey,                  // Parent account
    pub owner: Pubkey,                    // Jar owner
    #[max_len(32)]
    pub jar_id: String,                   // Unique jar identifier (custom string)
    #[max_len(100)]
    pub title: String,                    // Jar display title
    #[max_len(500)]
    pub description: String,              // Jar description
    pub default_currency: Pubkey,         // Preferred currency for this jar
    pub is_active: bool,                  // Jar status
    pub deposit_count: u32,               // Number of deposits received (indexing)
    pub invoice_count: u32,               // Number of invoices created (indexing)
    pub total_received_usdc: u64,         // Total USDC received
    pub total_received_usdt: u64,         // Total USDT received
    pub total_received_sol: u64,          // Total SOL received
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
```

**PDA Seeds**: `["jar_v2", account.key(), jar_id]` (jar_id is custom string)

### 4. InvoiceV2
```rust
#[account]
#[derive(InitSpace)]
pub struct InvoiceV2 {
    pub jar: Pubkey,                      // Parent jar
    pub owner: Pubkey,                    // Invoice creator
    pub invoice_number: u32,              // Invoice number (from jar.invoice_count)
    #[max_len(100)]
    pub title: String,                    // Invoice title
    #[max_len(500)]
    pub description: String,              // Invoice description
    pub currency_mint: Pubkey,            // Required payment currency
    pub amount: u64,                      // Required payment amount
    pub is_paid: bool,                    // Payment status
    pub paid_by: Option<Pubkey>,          // Payer address
    pub paid_at: Option<i64>,             // Payment timestamp
    pub expires_at: Option<i64>,          // Expiration timestamp
    pub created_at: i64,
    pub bump: u8,
}
```

**PDA Seeds**: `["invoice_v2", jar.key(), invoice_count]` (counter-based)
**Display Format**: `INV_1`, `INV_2`, `INV_3`, etc.

### 5. DepositV2 (Ultra-Optimized)
```rust
#[account]
#[derive(InitSpace)]
pub struct DepositV2 {
    pub jar: Pubkey,                      // Target jar (32 bytes)
    pub depositor: Pubkey,                // Depositor address (32 bytes)
    pub amount: u64,                      // Deposit amount (8 bytes)
    pub currency_mint: Pubkey,            // Deposited currency (32 bytes)
    pub invoice_id: Option<u32>,          // Invoice number if paying invoice (5 bytes)
    pub created_at: i64,                  // Timestamp (8 bytes)
    pub bump: u8,                         // PDA bump (1 byte)
}
// Total: ~126 bytes = ~0.00087 SOL per deposit (~$0.17 at $200 SOL)
```

**PDA Seeds**: `["deposit_v2", jar.key(), deposit_count]` (counter-based)
**Cost**: ~$0.17 per deposit vs ~$0.50 with full data
**Memo Storage**: Stored in transaction instruction data, retrieved when needed

### 6. WithdrawalV2
```rust
#[account]
#[derive(InitSpace)]
pub struct WithdrawalV2 {
    pub account: Pubkey,                  // Parent account (32 bytes)
    pub owner: Pubkey,                    // Withdrawal initiator (32 bytes)
    pub amount: u64,                      // Withdrawal amount (8 bytes)
    pub currency_mint: Pubkey,            // Withdrawn currency (32 bytes)
    pub created_at: i64,                  // Timestamp (8 bytes)
    pub bump: u8,                         // PDA bump (1 byte)
}
// Total: ~121 bytes = ~0.00084 SOL per withdrawal
```

**PDA Seeds**: `["withdrawal_v2", account.key(), withdrawal_count]` (counter-based)

### 7. TokenAccountV2
```rust
#[account]
#[derive(InitSpace)]
pub struct TokenAccountV2 {
    pub vault: Pubkey,                    // Parent vault
    pub mint: Pubkey,                     // Token mint
    pub balance: u64,                     // Current balance
    pub created_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}
```

**PDA Seeds**: `["token_account_v2", vault.key(), mint.key()]`

## V2 Instruction Set

### 1. create_account_v2
Creates a new V2 account with vault and default jar.

**Parameters:**
- `jar_id: String` - Unique identifier for default jar
- `default_currency: Pubkey` - Default currency mint (USDC/USDT)

**Accounts:**
- `signer` - Account owner (signer, mut)
- `account_v2` - New account PDA (init, mut)
- `vault_v2` - New vault PDA (init, mut)
- `jar_v2` - Default jar PDA (init, mut)
- `system_program` - System program

**Functionality:**
- Creates AccountV2 with owner and default settings
- Initializes VaultV2 for token management
- Creates default JarV2 with provided jar_id
- Sets up initial currency preferences

### 2. create_jar_v2
Creates a new jar with unique link.

**Parameters:**
- `jar_id: String` - Unique jar identifier
- `title: String` - Jar display title
- `description: String` - Jar description
- `default_currency: Option<Pubkey>` - Jar-specific currency preference

**Accounts:**
- `signer` - Jar owner (signer, mut)
- `account_v2` - Owner's account (mut)
- `jar_v2` - New jar PDA (init, mut)
- `system_program` - System program

**Functionality:**
- Validates jar_id uniqueness
- Creates JarV2 with specified parameters
- Inherits default currency from account if not specified
- Updates account jar_count

### 3. create_invoice_v2
Creates a payment invoice with specific amount and currency.

**Parameters:**
- `title: String` - Invoice title
- `description: String` - Invoice description
- `currency_mint: Pubkey` - Required payment currency
- `amount: u64` - Required payment amount
- `expires_at: Option<i64>` - Optional expiration timestamp

**Accounts:**
- `signer` - Invoice creator (signer, mut)
- `jar_v2` - Target jar (mut)
- `invoice_v2` - New invoice PDA (init, mut)
- `system_program` - System program

**Functionality:**
- Creates InvoiceV2 with payment requirements
- Auto-generates invoice number from jar.invoice_count
- Validates currency mint is supported
- Sets expiration if provided
- Updates jar invoice_count
- Invoice accessible via: `soljar.xyz/jarId/INV_{invoice_number}`

### 4. deposit_v2
Processes deposits with optional Jupiter swapping.

**Parameters:**
- `jar_id: String` - Target jar identifier
- `amount: u64` - Deposit amount
- `memo: String` - Deposit memo (stored in transaction data)
- `invoice_id: Option<u32>` - Optional invoice number payment
- `swap_params: Option<SwapParams>` - Jupiter swap parameters

**Accounts:**
- `signer` - Depositor (signer, mut)
- `account_v2` - Jar owner's account
- `jar_v2` - Target jar (mut)
- `vault_v2` - Target vault (mut)
- `deposit_v2` - New deposit record (init, mut)
- `source_token_account` - Depositor's token account (mut)
- `vault_token_account` - Vault's token account (mut)
- `mint` - Token mint
- `invoice_v2` - Invoice if paying invoice (optional, mut)
- `jupiter_program` - Jupiter program (optional)
- `token_program` - Token program
- `system_program` - System program

**Functionality:**
- Validates deposit parameters
- Executes Jupiter swap if different currency
- Transfers tokens to vault
- Creates ultra-optimized deposit record
- Marks invoice as paid if invoice_id provided
- Updates jar deposit_count and balances
- Stores memo in transaction instruction data for cost efficiency

### 5. withdraw_v2
Processes withdrawals from vault.

**Parameters:**
- `currency_mint: Pubkey` - Currency to withdraw
- `amount: u64` - Withdrawal amount

**Accounts:**
- `signer` - Account owner (signer, mut)
- `account_v2` - Owner's account (mut)
- `vault_v2` - Vault (mut)
- `withdrawal_v2` - New withdrawal record (init, mut)
- `vault_token_account` - Vault's token account (mut)
- `destination_token_account` - Owner's token account (mut)
- `mint` - Token mint
- `token_program` - Token program
- `system_program` - System program

**Functionality:**
- Validates withdrawal permissions
- Checks sufficient balance in vault
- Transfers tokens from vault to owner
- Creates withdrawal record for tracking
- Updates account withdrawal_count
- Updates vault balances

### 6. update_default_currency
Updates default currency preference.

**Parameters:**
- `new_currency: Pubkey` - New default currency mint
- `scope: CurrencyScope` - Account-level or jar-level

**Accounts:**
- `signer` - Owner (signer, mut)
- `account_v2` - Account (optional, mut)
- `jar_v2` - Jar (optional, mut)

**Functionality:**
- Validates currency is supported
- Updates default currency at specified scope
- Maintains backward compatibility

## Jupiter Integration

### SwapParams Structure
```rust
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct SwapParams {
    pub input_mint: Pubkey,
    pub output_mint: Pubkey,
    pub amount_in: u64,
    pub minimum_amount_out: u64,
    pub swap_data: Vec<u8>,  // Jupiter swap instruction data
}
```

### Integration Points
1. **Deposit Flow**: Automatic swapping during deposits
2. **Quote Fetching**: Off-chain quote generation
3. **Slippage Protection**: Minimum output amount validation
4. **Fee Handling**: Jupiter fee integration

## Migration Strategy

### V1 to V2 Migration
- V1 accounts remain functional
- Optional migration instruction for existing users
- Gradual feature rollout
- Backward compatibility maintained

### Data Migration
- Existing jars can be linked to V2 accounts
- Historical data preservation
- Seamless user experience

## Security Considerations

### Access Control
- Owner-only operations for sensitive functions
- Invoice payment validation
- Currency whitelist enforcement

### Economic Security
- Slippage protection on swaps
- Balance validation on all operations
- Overflow protection on arithmetic

### Operational Security
- Rate limiting on account creation
- Unique identifier validation
- Expiration handling for invoices

## Implementation Phases

### Phase 1: Core Infrastructure
- Account and vault creation
- Basic jar management
- Simple deposit/withdrawal

### Phase 2: Invoice System
- Invoice creation and management
- Payment processing
- Link generation

### Phase 3: Jupiter Integration
- Swap functionality
- Multi-currency support
- Advanced deposit flows

### Phase 4: Migration & Optimization
- V1 migration tools
- Performance optimizations
- Advanced features

## Cost Analysis (Updated with Optimizations)

### PDA Creation Costs
- **AccountV2**: ~0.002 SOL (~$0.40)
- **VaultV2**: ~0.003 SOL (~$0.60)
- **JarV2**: ~0.004 SOL (~$0.80)
- **InvoiceV2**: ~0.003 SOL (~$0.60)
- **DepositV2**: ~0.00087 SOL (~$0.17) - 65% cost reduction
- **WithdrawalV2**: ~0.00084 SOL (~$0.17)

### Volume Cost Analysis
**High-Volume Jar (10,000 deposits):**
- Old approach: 24.7 SOL (~$5,000)
- New approach: 8.7 SOL (~$1,700)
- **Savings: 65% cost reduction**

### Optimization Strategies
- **Ultra-lean PDAs**: Essential data only, memo in transaction logs
- **Counter-based indexing**: No separate index PDAs needed
- **Efficient account sizing**: Minimized storage requirements
- **Smart data placement**: Frequently accessed data in PDAs, detailed data in transactions
- **Jupiter fee optimization**: Integrated swap cost management

### Query Patterns
- **Deposit List**: Single RPC call to get PDA data
- **Full Details**: Optional second call for transaction memo/details
- **Pagination**: Counter-based seeds enable efficient range queries

## Testing Strategy

### Unit Tests
- Individual instruction testing
- Account validation
- Error condition handling

### Integration Tests
- End-to-end payment flows
- Jupiter swap integration
- Multi-currency scenarios

### Security Tests
- Access control validation
- Economic attack vectors
- Edge case handling

This specification provides a comprehensive foundation for SolJar V2 implementation while maintaining the flexibility and user-friendly approach of the original platform.