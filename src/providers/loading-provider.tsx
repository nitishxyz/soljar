"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isInitialLoading: boolean;
  setIsInitialLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isInitialLoading, setIsInitialLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
