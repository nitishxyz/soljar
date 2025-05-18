"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";

// Complete list of disallowed usernames from the Solana program
const DISALLOWED_USERNAMES = [
  "admin",
  "moderator",
  "mod",
  "support",
  "help",
  "system",
  "official",
  "dogs",
  "solana",
  "sol",
  "jar",
  "tip",
  "tips",
  "phantom",
  "solflare",
  "squads",
  "squad",
  "fuse",
  "cats",
  "pudgypenguins",
  "pudgypenguin",
  "penguin",
  "penguins",
  "pudgy",
  "bonk",
];

// Regex for valid username format: lowercase letters, numbers, and underscores only
const USERNAME_REGEX = /^[a-z0-9_]+$/;
const MAX_USERNAME_LENGTH = 15;

export function CreateUserForm() {
  const { useGetUserByUsername, createUser } = useSoljarUser();
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  const userByName = useGetUserByUsername(username, { enabled: false });

  // Validate username on change
  useEffect(() => {
    if (!username) {
      setValidationError(null);
      return;
    }

    if (username.length > MAX_USERNAME_LENGTH) {
      setValidationError("Username must be 15 characters or less");
    } else if (DISALLOWED_USERNAMES.includes(username)) {
      setValidationError("This username is not allowed");
    } else if (!USERNAME_REGEX.test(username)) {
      setValidationError(
        "Username can only contain lowercase letters, numbers, and underscores"
      );
    } else {
      setValidationError(null);
    }
  }, [username]);

  const handleCreateUser = async () => {
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter a username",
        variant: "destructive",
      });
      return;
    }

    if (validationError) {
      toast({
        title: "Invalid username",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const result = await userByName.refetch();
      if (result.data?.usernameTaken) {
        setValidationError("This username is already in use");
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
      <div className="space-y-2 mb-4">
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
        {validationError && (
          <p className="text-sm text-red-500 pl-1">{validationError}</p>
        )}
      </div>
      <Button
        className="w-full h-12 text-lg"
        onClick={handleCreateUser}
        disabled={isChecking || !username || !!validationError}
      >
        {isChecking ? "Checking..." : "Create Tip Jar"}
      </Button>
    </>
  );
}
