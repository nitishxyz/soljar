"use client";

import { AuthGuard } from "@/components/auth-guard";

export const Root = ({ children }: { children: React.ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};
