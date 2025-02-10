"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

export const Root = ({ children }: { children: React.ReactNode }) => {
  useAuthGuard();

  return <>{children}</>;
};
