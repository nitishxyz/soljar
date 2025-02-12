import { useInfiniteQuery } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import {
  findWithdrawlIndexPDA,
  findIndexPDA,
  findJarPDA,
  findUserPDA,
} from "../pda-helper";
import { PublicKey } from "@solana/web3.js";
import { useSoljarAuth } from "../soljar-auth-provider";

export function useWithdrawls(initialPage = 0) {
  const { program } = useSoljarBase();
  const { userPublicKey } = useSoljarAuth();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["withdrawls", userPublicKey?.toString()],
    queryFn: async ({ pageParam = initialPage }) => {
      if (!program || !userPublicKey)
        return { withdrawls: [], totalPages: 0, totalwithdrawls: 0 };

      // Get necessary PDAs
      const userPda = findUserPDA(program, userPublicKey);
      const jarPda = findJarPDA(program, userPda);
      const indexPda = findIndexPDA(program, jarPda);

      // First fetch the index account
      const index = await program.account.index.fetch(indexPda);
      console.log(index);
      const totalPages = Math.ceil(index.totalWithdrawls / 50);

      // Calculate the page number from the end (reverse order)
      const reversedPageParam = totalPages - 1 - pageParam;

      // Fetch withdrawl index for the requested page
      const withdrawlIndexPda = findWithdrawlIndexPDA(
        program,
        indexPda,
        reversedPageParam
      );
      const withdrawlIndex = await program.account.withdrawlIndex.fetch(
        withdrawlIndexPda
      );

      // Fetch all withdrawls from the current page
      const withdrawlPromises = withdrawlIndex.withdrawls
        .slice(0, withdrawlIndex.totalItems)
        .reverse() // Reverse the array to get newest first
        .map(async (pubkey: PublicKey) => {
          const withdrawl = await program.account.withdrawl.fetch(pubkey);
          return withdrawl;
        });

      const withdrawls = await Promise.all(withdrawlPromises);

      // Format the withdrawl data
      const formattedwithdrawls = withdrawls.map((withdrawl: any) => ({
        signer: userPublicKey,
        jar: withdrawl.jar,
        currencyMint: withdrawl.currencyMint,
        amount: withdrawl.amount.toNumber() / 1e9,
        createdAt: withdrawl.createdAt.toNumber(),
        transactionId: withdrawl.transactionId?.toString(),
      }));

      return {
        withdrawls: formattedwithdrawls,
        totalPages,
        totalwithdrawls: index.totalWithdrawls,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) => {
      if (
        !lastPage?.currentPage ||
        lastPage.currentPage >= lastPage.totalPages - 1
      ) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    initialPageParam: initialPage,
  });

  // Flatten the pages and maintain reverse chronological order
  const withdrawls = data?.pages.flatMap((page) => page.withdrawls) ?? [];
  const totalwithdrawls = data?.pages[0]?.totalwithdrawls ?? 0;

  return {
    data: { withdrawls, totalwithdrawls },
    fetchNextPage,
    hasNextPage: Boolean(hasNextPage),
    isLoading,
  };
}
