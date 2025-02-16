import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSoljarBase } from "../soljar-base-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  findUserNamePDA,
  findUserPDA,
  findJarPDA,
  findTipLinkPDA,
} from "../pda-helper";
import { useToast } from "@/hooks/use-toast";

export interface UserAccount {
  user: PublicKey;
  platform: PublicKey;
  username: string;
  receiverWallet: PublicKey;
  jar: PublicKey;
  createdAt: number;
  updatedAt: number;
}

export function useSoljarUser() {
  const { program } = useSoljarBase();
  const { publicKey } = useWallet();
  const { toast } = useToast();

  const getUser = useQuery({
    queryKey: ["soljar", "user"],
    queryFn: async () => {
      if (!publicKey) {
        return null;
      }
      const userPDA = findUserPDA(program, publicKey);
      try {
        const user = await program.account.user.fetch(userPDA);
        return user;
      } catch (error) {
        console.log("Error fetching user:", error);
        return null;
      }
    },
    enabled: !!publicKey,
  });

  const checkUser = useQuery({
    queryKey: ["soljar", "check-user", publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) {
        return null;
      }
      const userPDA = findUserPDA(program, publicKey);
      try {
        const user = await program.account.user.fetch(userPDA);
        return user;
      } catch (error) {
        console.log("Error checking user:", error);
        return null;
      }
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const useGetUserByUsername = (
    username: string,
    options?: { enabled: boolean }
  ) =>
    useQuery({
      queryKey: ["soljar", "user-by-username", username],
      queryFn: async () => {
        if (!username) return { usernameTaken: false };

        const userByNamePDA = findUserNamePDA(program, username);

        try {
          const userByName = await program.account.userByName.fetch(
            userByNamePDA
          );
          return { usernameTaken: true, user: userByName };
        } catch (error) {
          console.error("Error fetching user by username:", error);
          return { usernameTaken: false };
        }
      },
      enabled: options?.enabled ?? true,
    });

  const createUser = useMutation({
    mutationKey: ["soljar", "create-user"],
    mutationFn: async (username: string) => {
      if (!publicKey) throw new Error("Wallet not connected");

      return program.methods
        .createUser(username)
        .postInstructions([
          await program.methods
            .createSupporterIndex(1)
            .accounts({})
            .instruction(),
        ])
        .accounts({})
        .rpc();
    },
    onSuccess: (signature) => {
      toast({
        title: "User created successfully",
        description: "User created successfully",
      });
      getUser.refetch();
      checkUser.refetch();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast({
        title: "Failed to create user",
        description: error.message,
      });
    },
  });

  return {
    getUser,
    checkUser,
    useGetUserByUsername,
    createUser,
  };
}
