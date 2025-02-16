import { PublicKey, Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

export const SOLANA_CLUSTER = "devnet";

export type Currency = "SOL" | "USDC" | "USDT";

/**
 * Determines the appropriate token program ID based on the mint address by checking the mint account's owner
 * @param connection The Solana connection object
 * @param mint The mint address of the token
 * @returns The corresponding token program ID (TOKEN_PROGRAM_ID or TOKEN_2022_PROGRAM_ID)
 */
export const getTokenProgramId = async (
  connection: Connection,
  mint: PublicKey
): Promise<PublicKey> => {
  try {
    const mintAccount = await connection.getAccountInfo(mint);

    if (!mintAccount) {
      throw new Error("Mint account not found");
    }

    // Check if the mint account's owner is TOKEN_2022_PROGRAM_ID
    return mintAccount.owner.equals(TOKEN_2022_PROGRAM_ID)
      ? TOKEN_2022_PROGRAM_ID
      : TOKEN_PROGRAM_ID;
  } catch (error) {
    console.error("Error determining token program ID:", error);
    // Default to regular SPL token program if there's an error
    return TOKEN_PROGRAM_ID;
  }
};

/**
 * Converts an amount to the smallest unit of a currency
 * @param amount The amount to convert
 * @param currency The currency to convert to
 * @returns The amount in the smallest unit of the currency
 */

// Helper function to convert amount to smallest unit (lamports for SOL, base units for tokens)
export const convertAmountToSmallestUnit = (
  amount: number,
  currency: Currency
) => {
  switch (currency) {
    case "SOL":
      return Math.floor(amount * 1e9); // Convert to lamports
    case "USDC":
    case "USDT":
      return Math.floor(amount * 1e6); // Both USDC and USDT use 6 decimals
    default:
      throw new Error("Unsupported currency");
  }
};

/**
 * Gets the mint address for a given currency
 * @param currency The currency to get the mint address for
 * @returns The mint address for the given currency
 */
export const getMintAddress = (currency: Currency): PublicKey => {
  switch (currency) {
    case "SOL":
      return PublicKey.default; // Native SOL mint
    case "USDC":
      return new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // Mainnet USDC
    case "USDT":
      return new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"); // Mainnet USDT
    default:
      throw new Error("Unsupported currency");
  }
};

/**
 * Formats an address by showing the first 4 and last 4 characters
 * @param address The address to format
 * @returns The formatted address
 */
export const formatAddress = (address: string) => {
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const NATIVE_MINT = PublicKey.default; // SOL's native mint
export const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
export const USDT_MINT = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
);

export const getCurrencyFromMint = (mint: PublicKey): Currency => {
  if (mint.equals(NATIVE_MINT)) return "SOL";
  if (mint.equals(USDC_MINT)) return "USDC";
  if (mint.equals(USDT_MINT)) return "USDT";
  return "SOL"; // Default fallback
};

/**
 * Fetches the most recent transaction signature for a given account
 * @param connection The Solana connection object
 * @param address The account address to fetch the signature for
 * @returns The transaction signature
 */
export const fetchTransactionSignature = async (
  connection: Connection,
  address: string
): Promise<string | null> => {
  try {
    const signatures = await connection.getSignaturesForAddress(
      new PublicKey(address),
      { limit: 1 }
    );

    return signatures[0]?.signature || null;
  } catch (error) {
    console.error("Error fetching transaction signature:", error);
    return null;
  }
};

export function formatCurrencyAmount(amount: number, currency: string) {
  if (currency === "SOL") {
    // For SOL, show up to 9 decimals if significant
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 9,
    });
  }

  // For other currencies (USDC, USDT), show up to 3 decimals if significant
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
}
