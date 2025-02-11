"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";

export function CreateUserForm() {
  const { useGetUserByUsername, createUser } = useSoljarUser();
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const userByName = useGetUserByUsername(username, { enabled: false });

  const handleCreateUser = async () => {
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    if (username.length > 15) {
      toast({
        title: "Username too long",
        description: "Username must be 15 characters or less",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const result = await userByName.refetch();
      if (result.data?.usernameTaken) {
        toast({
          title: "Username taken",
          description: "This username is already in use",
          variant: "destructive",
        });
        return;
      }

      await createUser.mutateAsync(username);
    } catch (error: any) {
      toast({
        title: "Error creating user",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
          soljar.xyz/
        </div>
        <Input
          placeholder="username"
          className="pl-24 text-lg h-12"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
      </div>
      <Button
        className="w-full mt-4 h-12 text-lg"
        onClick={handleCreateUser}
        disabled={isChecking || !username || username.length > 15}
      >
        {isChecking ? "Checking..." : "Create Tip Jar"}
      </Button>
    </>
  );
}
