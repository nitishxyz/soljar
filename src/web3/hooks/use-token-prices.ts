import { useQuery } from "@tanstack/react-query";

interface TokenPrices {
  SOL: number;
  USDC: number;
  USDT: number;
}

async function fetchTokenPrices(): Promise<TokenPrices> {
  try {
    const response = await fetch("/api/token-prices");
    if (!response.ok) {
      throw new Error("Failed to fetch token prices");
    }
    return await response.json();
  } catch (error) {
    console.error("[TokenPrices] Error fetching token prices:", error);
    return {
      SOL: 200,
      USDC: 1,
      USDT: 1,
    };
  }
}

export function useTokenPrices() {
  const query = useQuery({
    queryKey: ["token-prices"],
    queryFn: fetchTokenPrices,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
    refetchOnWindowFocus: false,
  });

  return query;
}

// Helper function to get price for a specific token
export function useTokenPrice(token: keyof TokenPrices) {
  const { data: prices } = useTokenPrices();
  const price = prices?.[token] ?? (token === "SOL" ? 0 : 1);

  return price;
}
