import { useCallback } from "react";
import { useSoljarProgram } from "../soljar-data-access";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { findPlatformPDA } from "../pda-helper";

export const usePlatform = () => {
  const { program, userPublicKey, connection } = useSoljarProgram();
  const queryClient = useQueryClient();

  const { data: platform, isLoading: isPlatformLoading } = useQuery({
    queryKey: ["platform"],
    queryFn: async () => {
      if (!program) return null;
      try {
        const platformPDA = findPlatformPDA(program);
        const platform = await program.account.platform.fetch(platformPDA);
        return platform;
      } catch (error) {
        console.error("Error fetching platform:", error);
        return null;
      }
    },
    enabled: !!program,
  });

  const { mutateAsync: initPlatform } = useMutation({
    mutationFn: async () => {
      if (!program || !userPublicKey)
        throw new Error("Program or user not found");

      const tx = await program.methods.initPlatform().accounts({}).rpc();
      return tx;
    },
    onSuccess: () => {
      // Invalidate and refetch platform data after successful initialization
      queryClient.invalidateQueries({ queryKey: ["platform"] });
    },
    onError: (error) => {
      console.error("Error initializing platform:", error);
      throw error;
    },
  });

  console.log(connection.rpcEndpoint);

  return {
    platform,
    isPlatformLoading,
    initPlatform,
  };
};
