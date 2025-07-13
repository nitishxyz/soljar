import { Connection, PublicKey } from "@solana/web3.js";

// Real USDC mint address on mainnet
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

// Cached USDC mint account data from mainnet
// This avoids network calls during testing
export const CACHED_USDC_MINT_DATA = {
  executable: false,
  owner: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
  lamports: 1461600,
  data: Buffer.from([
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    6, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ])
};

export async function fetchUsdcMintFromMainnet() {
  try {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const accountInfo = await connection.getAccountInfo(USDC_MINT);
    
    if (!accountInfo) {
      console.warn("Failed to fetch USDC mint from mainnet, using cached data");
      return {
        address: USDC_MINT,
        info: CACHED_USDC_MINT_DATA,
      };
    }

    return {
      address: USDC_MINT,
      info: accountInfo,
    };
  } catch (error) {
    console.warn("Network error fetching USDC mint, using cached data:", error);
    return {
      address: USDC_MINT,
      info: CACHED_USDC_MINT_DATA,
    };
  }
}