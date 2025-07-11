# SolJar - Comprehensive Crypto Payment Platform

SolJar is a versatile payment platform built on Solana that makes accepting cryptocurrency payments as simple as sharing a link. What started as a tipping platform has evolved into a complete suite of payment solutions for individuals, creators, and businesses.

## Why SolJar?

Traditional payment processors charge 3-5% fees, take days to settle, and exclude millions globally. Crypto payments should be instant and cheap, but most solutions are too complex for everyday use.

SolJar solves this by leveraging Solana's speed and low fees to create an intuitive payment experience that works for everyone.

## Core Features

### For Everyone
- **Personal Payment Links**: Create custom payment links (soljar.xyz/username) for receiving funds
- **QR Code Payments**: Generate QR codes for in-person transactions
- **Multi-Currency Support**: Accept SOL, USDC, USDT with more tokens coming
- **Near-Instant Settlement**: Transactions complete in seconds, not days
- **Minimal Fees**: Under $0.01 transaction costs vs 3-5% traditional processors

### For Creators
- **Tip Jars**: Customizable tip collection with supporter recognition
- **Content Monetization**: Gate content behind one-time or recurring payments
- **Subscription Management**: Create recurring payment options for premium content
- **Supporter Analytics**: Track and acknowledge your community with leaderboards and badges

### For Businesses
- **Payment Processing**: Accept crypto payments for products and services
- **Professional Invoicing**: Create and track invoices with payment links
- **E-commerce Integration**: Embeddable payment buttons and checkout experiences
- **Business Analytics**: Track payment flows, customer insights, and revenue streams
- **Batch Payments**: Process multiple payments efficiently
- **Split Payments**: Automatically divide payments between multiple recipients

## Technical Architecture

- **Backend**: Rust-based Solana program using Anchor framework for secure, trustless transactions
- **Frontend**: Next.js React application with Tailwind CSS and Framer Motion animations
- **Authentication**: Non-custodial wallet-based authentication (users control their keys)
- **State Management**: React Query for efficient data fetching and caching
- **Security**: All transactions signed through connected wallets with no private key exposure

## Use Cases

- **E-commerce stores** processing crypto payments with minimal fees
- **Content creators** monetizing with tip jars and subscriptions
- **Freelancers** sending invoices globally without banking restrictions
- **Friends** splitting bills and expenses
- **Event organizers** collecting payments and donations
- **Software companies** accepting recurring SaaS payments

## Roadmap

### Coming Soon
- USD off-ramps (direct USDC/USDT to bank account transfers)
- Mobile application for on-the-go payments
- Advanced escrow services
- Cross-chain bridge integration
- Enterprise-grade compliance features

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.31.0 or higher
- Solana CLI 1.18.17 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
pnpm install
```

#### Start the web app

```
pnpm dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `pnpm`, eg: `pnpm anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
pnpm anchor keys sync
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
pnpm anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
pnpm dev
```

Build the web app

```shell
pnpm build
```
