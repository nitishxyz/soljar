import { useQuery } from "@tanstack/react-query";

interface TokenPrices {
  SOL: number;
  USDC: number;
  USDT: number;
}

const SOLANA_TRACKER_API = "https://data.solanatracker.io";
const SOLANA_TRACKER_API_KEY = process.env.SOLANA_TRACKER_API_KEY;

// Token addresses for SOL, USDC, and USDT on Solana
const TOKEN_ADDRESSES = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
};

// Helper function to add delay between requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTokenPrice(tokenAddress: string): Promise<number> {
  const url = `${SOLANA_TRACKER_API}/tokens/${tokenAddress}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": SOLANA_TRACKER_API_KEY || "",
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${responseText}`
      );
    }

    const data = JSON.parse(responseText);

    const price =
      data.pools?.[0]?.price?.usd ??
      (tokenAddress === TOKEN_ADDRESSES.SOL ? 0 : 1);

    return price;
  } catch (error) {
    console.error(`[TokenPrices] Detailed error for ${tokenAddress}:`, {
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return tokenAddress === TOKEN_ADDRESSES.SOL ? 0 : 1;
  }
}

async function fetchTokenPrices(): Promise<TokenPrices> {
  try {
    // Fetch prices sequentially with 1 second delay between each
    const solPrice = await fetchTokenPrice(TOKEN_ADDRESSES.SOL);
    await delay(1000); // Wait 1 second

    const usdcPrice = await fetchTokenPrice(TOKEN_ADDRESSES.USDC);
    await delay(1000); // Wait 1 second

    const usdtPrice = await fetchTokenPrice(TOKEN_ADDRESSES.USDT);

    const prices = {
      SOL: solPrice,
      USDC: usdcPrice,
      USDT: usdtPrice,
    };

    console.log("[TokenPrices] Successfully fetched all prices:", prices);
    return prices;
  } catch (error) {
    console.error("[TokenPrices] Error fetching token prices:", error);
    return {
      SOL: 200, // More reasonable default for SOL
      USDC: 1,
      USDT: 1,
    };
  }
}

export function useTokenPrices() {
  const apiKey = process.env.SOLANA_TRACKER_API_KEY;

  const query = useQuery({
    queryKey: ["token-prices"],
    queryFn: fetchTokenPrices,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
    refetchOnWindowFocus: false,
    enabled: !!apiKey,
  });

  return query;
}

// Helper function to get price for a specific token
export function useTokenPrice(token: keyof TokenPrices) {
  const { data: prices } = useTokenPrices();
  const price = prices?.[token] ?? (token === "SOL" ? 0 : 1);

  return price;
}
