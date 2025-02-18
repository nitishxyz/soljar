import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findDepositPDA, findJarPDA } from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

interface Tip {
  signer: PublicKey;
  tipLink: string;
  currency: number;
  amount: number;
  createdAt: number;
  memo: string;
}

const ITEMS_PER_PAGE = 25;

export function useTips(initialPage = 0) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  return useInfiniteQuery({
    queryKey: ["tips", userPublicKey?.toString()],
    queryFn: async ({ pageParam = 0 }) => {
      if (!program || !userPublicKey) {
        return {
          tips: [],
          totalPages: 0,
          totalTips: 0,
          currentPage: pageParam,
        };
      }

      try {
        const jarPda = findJarPDA(program, userPublicKey);
        const jar = await program.account.jar.fetch(jarPda);
        const totalTips = jar.depositCount;

        if (totalTips === 0) {
          return {
            tips: [],
            totalPages: 0,
            totalTips: 0,
            currentPage: pageParam,
          };
        }

        const totalPages = Math.ceil(totalTips / ITEMS_PER_PAGE);

        // Calculate start and end indices for this page
        const startIndex = Math.min(
          totalTips - 1 - pageParam * ITEMS_PER_PAGE,
          totalTips - 1
        );
        const endIndex = Math.max(startIndex - ITEMS_PER_PAGE + 1, 0);

        const tips: Tip[] = [];

        // Fetch deposits for this page
        for (let i = startIndex; i >= endIndex; i--) {
          try {
            const depositPda = findDepositPDA(program, jarPda, i);
            const deposit = await program.account.deposit.fetch(depositPda);
            tips.push({
              signer: deposit.signer,
              tipLink: deposit.linkId,
              currency: deposit.currency,
              amount: deposit.amount.toNumber(),
              createdAt: deposit.createdAt.toNumber(),
              memo: deposit.memo,
            });
          } catch (depositError) {
            console.warn(
              `Skipping tip ${i}: ${
                depositError instanceof Error
                  ? depositError.message
                  : "Unknown error"
              }`
            );
            continue;
          }
        }

        return {
          tips: tips.sort((a, b) => b.createdAt - a.createdAt),
          totalPages,
          totalTips,
          currentPage: pageParam,
          hasMore: pageParam < totalPages - 1,
        };
      } catch (error) {
        console.error("Error fetching tips:", error);
        return {
          tips: [],
          totalPages: 0,
          totalTips: 0,
          currentPage: pageParam,
          hasMore: false,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },
    initialPageParam: 0,
  });
}
