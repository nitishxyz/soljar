import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findJarPDA, findSupporterIndexPDA } from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

const ITEMS_PER_PAGE = 25;

export interface TipInfo {
  currency: number;
  amount: number;
}

export interface Supporter {
  signer: PublicKey;
  jar: PublicKey;
  tips: TipInfo[];
  tipCount: number;
  createdAt: number;
  updatedAt: number;
}

export function useSupporters(initialPage = 0) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  return useInfiniteQuery({
    queryKey: ["supporters", userPublicKey?.toString()],
    queryFn: async ({ pageParam = initialPage }) => {
      if (!program || !userPublicKey) {
        return {
          supporters: [],
          totalPages: 0,
          totalSupporters: 0,
          currentPage: pageParam,
        };
      }

      try {
        const jarPda = findJarPDA(program, userPublicKey);
        const jar = await program.account.jar.fetch(jarPda);
        const totalSupporters = jar.supporterCount;

        if (totalSupporters === 0) {
          return {
            supporters: [],
            totalPages: 0,
            totalSupporters: 0,
            currentPage: pageParam,
          };
        }

        const totalPages = Math.ceil(jar.supporterIndex + 1);

        // Calculate start and end indices for this page
        const startIndex = Math.min(totalPages - 1 - pageParam, totalPages - 1);

        // Skip if we're trying to fetch a non-existent page
        if (startIndex < 0) {
          return {
            supporters: [],
            totalPages,
            totalSupporters,
            currentPage: pageParam,
            hasMore: false,
          };
        }

        // Fetch supporter index for the requested page
        const supporterIndexPda = findSupporterIndexPDA(
          program,
          jarPda,
          startIndex
        );
        const supporterIndex = await program.account.supporterIndex.fetch(
          supporterIndexPda
        );

        // Fetch all supporters from the current page
        const supporterPromises = supporterIndex.supporters
          .slice(0, supporterIndex.totalItems)
          .reverse() // Reverse the array to get newest first
          .map((pubkey: PublicKey) => program.account.supporter.fetch(pubkey));

        const supporters = await Promise.all(supporterPromises);

        // Format the supporter data
        const formattedSupporters = supporters.map((supporter: any) => ({
          signer: supporter.signer,
          jar: supporter.jar,
          tips: supporter.tips
            .filter((tip: any) => !tip.amount.isZero())
            .map((tip: any) => ({
              currency: tip.currency,
              amount: tip.amount.toNumber() / 1e9,
            })),
          tipCount: supporter.tipCount,
          createdAt: supporter.createdAt.toNumber(),
          updatedAt: supporter.updatedAt.toNumber(),
        }));

        return {
          supporters: formattedSupporters,
          totalPages,
          totalSupporters,
          currentPage: pageParam,
          hasMore: pageParam < totalPages - 1,
        };
      } catch (error) {
        console.error("Error fetching supporters:", error);
        return {
          supporters: [],
          totalPages: 0,
          totalSupporters: 0,
          currentPage: pageParam,
          hasMore: false,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: initialPage,
  });
}
