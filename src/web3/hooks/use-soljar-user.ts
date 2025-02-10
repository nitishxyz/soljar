import { PublicKey } from "@solana/web3.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSoljarProgram } from "../soljar-data-access";
import { findUserNamePDA, findUserPDA } from "../pda-helper";
import toast from "react-hot-toast";
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
  const { program, userPublicKey } = useSoljarProgram();
  const { toast } = useToast();

  const getUser = useQuery({
    queryKey: ["soljar", "user"],
    queryFn: async () => {
      if (!userPublicKey) {
        return null;
      }
      const userPDA = findUserPDA(program, userPublicKey);
      const user = await program.account.user.fetch(userPDA);
      return user;
    },
  });

  const getUserByUsername = useQuery({
    queryKey: ["soljar", "user-by-username"],
    queryFn: async ({ queryKey }) => {
      const username = queryKey[2] as string;
      const userByNamePDA = findUserNamePDA(program, username);

      try {
        const userByName = await program.account.userByName.fetch(
          userByNamePDA
        );
        return userByName;
      } catch (error) {
        console.error("Error fetching user by username:", error);
        return null;
      }
    },
    enabled: false,
  });

  const createUser = useMutation({
    mutationKey: ["soljar", "create-user"],
    mutationFn: async (username: string) => {
      return program.methods
        .createUser(username)
        .accounts({})
        .postInstructions([
          await program.methods.initIndexes(0).accounts({}).instruction(),
          await program.methods.initTreasury().accounts({}).instruction(),
          await program.methods
            .initTipLink(username, "My tiplink", 0)
            .accounts({})
            .instruction(),
        ])
        .rpc();
    },
    onSuccess: (signature) => {
      toast({
        title: "User created successfully",
        description: "User created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create user",
        description: error.message,
      });
    },
  });

  return {
    getUser,
    getUserByUsername,
    createUser,
  };
}
