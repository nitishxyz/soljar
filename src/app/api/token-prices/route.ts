import { NextResponse } from "next/server";

const SOLANA_TRACKER_API = "https://data.solanatracker.io";

// Token addresses for SOL, USDC, and USDT on Solana
const TOKEN_ADDRESSES = {
  SOL: "So11111111111111111111111111111111111111112",
  USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
};

async function fetchTokenPrice(tokenAddress: string): Promise<number> {
  const url = `${SOLANA_TRACKER_API}/tokens/${tokenAddress}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": process.env.SOLANA_TRACKER_API_KEY || "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    let price;
    if (data && data.pools && data.pools[0] && data.pools[0].price) {
      price = data.pools[0].price.usd;
    } else {
      price = tokenAddress === TOKEN_ADDRESSES.SOL ? 0 : 1;
    }

    return price;
  } catch (error) {
    console.error(`Error fetching price for ${tokenAddress}:`, error);
    return tokenAddress === TOKEN_ADDRESSES.SOL ? 0 : 1;
  }
}

export async function GET() {
  try {
    // Add delay between requests
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const solPrice = await fetchTokenPrice(TOKEN_ADDRESSES.SOL);
    await delay(1000);

    const usdcPrice = await fetchTokenPrice(TOKEN_ADDRESSES.USDC);
    await delay(1000);

    const usdtPrice = await fetchTokenPrice(TOKEN_ADDRESSES.USDT);

    const prices = {
      SOL: solPrice,
      USDC: usdcPrice,
      USDT: usdtPrice,
    };

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return NextResponse.json(
      {
        SOL: 200,
        USDC: 1,
        USDT: 1,
      },
      { status: 500 }
    );
  }
}
