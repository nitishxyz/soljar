// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { findPlatformPDA } from "../pda-helper";
// import { useSoljarBase } from "../soljar-base-provider";
// import { useWallet } from "@solana/wallet-adapter-react";

// export const usePlatform = () => {
//   const { publicKey } = useWallet();
//   const { program } = useSoljarBase();
//   const queryClient = useQueryClient();

//   const { data: platform, isLoading: isPlatformLoading } = useQuery({
//     queryKey: ["platform"],
//     queryFn: async () => {
//       if (!program) return null;
//       try {
//         const platformPDA = findPlatformPDA(program);
//         const platform = await program.account.platform.fetch(platformPDA);
//         return platform;
//       } catch (error) {
//         console.error("Error fetching platform:", error);
//         return null;
//       }
//     },
//     enabled: !!program,
//   });

//   const { mutateAsync: initPlatform } = useMutation({
//     mutationFn: async () => {
//       if (!program || !publicKey) throw new Error("Program or user not found");

//       const tx = await program.methods.initPlatform().accounts({}).rpc();
//       return tx;
//     },
//     onSuccess: () => {
//       // Invalidate and refetch platform data after successful initialization
//       queryClient.invalidateQueries({ queryKey: ["platform"] });
//     },
//     onError: (error) => {
//       console.error("Error initializing platform:", error);
//       throw error;
//     },
//   });

//   return {
//     platform,
//     isPlatformLoading,
//     initPlatform,
//   };
// };
