import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { findJarPDA, findWithdrawlPDA } from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

interface Withdrawal {
  jar: PublicKey;
  amount: number;
  createdAt: number;
  currency: number;
}

const ITEMS_PER_PAGE = 25;

export function useWithdrawls(initialPage = 0) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  return useInfiniteQuery({
    queryKey: ["withdrawls", userPublicKey?.toString()],
    queryFn: async ({ pageParam = 0 }) => {
      if (!program || !userPublicKey) {
        return {
          withdrawls: [],
          totalPages: 0,
          totalWithdrawls: 0,
          currentPage: pageParam,
        };
      }

      try {
        const jarPda = findJarPDA(program, userPublicKey);
        const jar = await program.account.jar.fetch(jarPda);
        const totalWithdrawls = jar.withdrawlCount;

        if (totalWithdrawls === 0) {
          return {
            withdrawls: [],
            totalPages: 0,
            totalWithdrawls: 0,
            currentPage: pageParam,
          };
        }

        const totalPages = Math.ceil(totalWithdrawls / ITEMS_PER_PAGE);

        // Calculate start and end indices for this page
        const startIndex = Math.min(
          totalWithdrawls - 1 - pageParam * ITEMS_PER_PAGE, // subtract 1 for zero-based index
          totalWithdrawls - 1
        );
        const endIndex = Math.max(startIndex - ITEMS_PER_PAGE + 1, 0); // changed to 0 for zero-based

        const withdrawls: Withdrawal[] = [];

        // Fetch withdrawals for this page
        for (let i = startIndex; i >= endIndex; i--) {
          try {
            const withdrawlPda = findWithdrawlPDA(program, jarPda, i);
            const withdrawl = await program.account.withdrawl.fetch(
              withdrawlPda
            );
            withdrawls.push({
              jar: withdrawl.jar,
              amount: withdrawl.amount.toNumber(),
              createdAt: withdrawl.createdAt.toNumber(),
              currency: withdrawl.currency,
            });
          } catch (withdrawlError) {
            console.warn(
              `Skipping withdrawl ${i}: ${
                withdrawlError instanceof Error
                  ? withdrawlError.message
                  : "Unknown error"
              }`
            );
            continue;
          }
        }

        return {
          withdrawls: withdrawls.sort((a, b) => b.createdAt - a.createdAt),
          totalPages,
          totalWithdrawls,
          currentPage: pageParam,
          hasMore: pageParam < totalPages - 1,
        };
      } catch (error) {
        console.error("Error fetching withdrawls:", error);
        return {
          withdrawls: [],
          totalPages: 0,
          totalWithdrawls: 0,
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
