import { Metadata } from "next";
import { Program } from "@coral-xyz/anchor";
import { findTipLinkPDA } from "@/web3/pda-helper";
import { getSoljarProgram, getSoljarProgramId } from "@project/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

export async function generateMetadata({
  params,
}: {
  params: { tipLink: string };
}): Promise<Metadata> {
  const username = params.tipLink;

  // Initialize connection and program
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const programId = getSoljarProgramId("mainnet" as any);
  const program = getSoljarProgram({ connection } as any, programId);

  try {
    // Check if tip link exists
    const tipLinkPDA = findTipLinkPDA(program, username);
    const tipLink = await program.account.tipLink.fetch(tipLinkPDA);

    if (!tipLink) {
      // If tip link doesn't exist, return generic metadata
      return {
        title: "Tip Link Not Found | Soljar",
        description:
          "This Soljar tip link does not exist. Create your own tip link to start accepting crypto payments on Solana.",
        openGraph: {
          title: "Tip Link Not Found | Soljar",
          description:
            "This Soljar tip link does not exist. Create your own tip link to start accepting crypto payments on Solana.",
          url: `https://soljar.xyz/${username}`,
          siteName: "Soljar",
          images: [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Soljar - Web3 Payment Platform",
            },
          ],
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: "Tip Link Not Found | Soljar",
          description:
            "This Soljar tip link does not exist. Create your own tip link to start accepting crypto payments on Solana.",
          images: ["/og-image.jpg"],
        },
      };
    }

    // If tip link exists, return personalized metadata
    return {
      title: `Send Crypto to ${username} | Soljar`,
      description: `Send SOL, USDC, or USDT to ${username} instantly. Fast, secure, and on-chain transactions on Solana.`,
      openGraph: {
        title: `Send Crypto to ${username}`,
        description: `Send SOL, USDC, or USDT to ${username} instantly. Fast, secure, and on-chain transactions on Solana.`,
        url: `https://soljar.xyz/${username}`,
        siteName: "Soljar",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: `Send Crypto to ${username} on Soljar`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Send Crypto to ${username}`,
        description: `Send SOL, USDC, or USDT to ${username} instantly. Fast, secure, and on-chain transactions on Solana.`,
        images: ["/og-image.jpg"],
      },
    };
  } catch (error) {
    // If there's an error fetching the tip link, return generic metadata
    console.error("Error fetching tip link:", error);
    return {
      title: "Tip Link Not Found | Soljar",
      description:
        "This Soljar tip link does not exist. Create your own tip link to start accepting crypto payments on Solana.",
      openGraph: {
        title: "Tip Link Not Found | Soljar",
        description:
          "This Soljar tip link does not exist. Create your own tip link to start accepting crypto payments on Solana.",
        url: `https://soljar.xyz/${username}`,
        siteName: "Soljar",
        images: [
          {
            url: "/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Soljar - Web3 Payment Platform",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Tip Link Not Found | Soljar",
        description:
          "This Soljar tip link does not exist. Create your own tip link to start accepting crypto payments on Solana.",
        images: ["/og-image.jpg"],
      },
    };
  }
}

export default function TipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
