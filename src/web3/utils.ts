import { PublicKey, Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";

type Currency = "SOL" | "USDC" | "USDT";

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
    case "USDC":
      return new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // Mainnet USDC
    case "USDT":
      return new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"); // Mainnet USDT
    default:
      throw new Error("Unsupported currency");
  }
};
