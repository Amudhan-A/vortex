// context/RepoContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface RepoConfig {
  repoPath: string;
  owner: string;
  repoName: string;
}

interface RepoContextValue {
  config: RepoConfig | null;
  setConfig: (c: RepoConfig) => void;
  isConfigured: boolean;
}

const RepoContext = createContext<RepoContextValue | null>(null);

export function RepoProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<RepoConfig | null>(null);
  return (
    <RepoContext.Provider value={{ config, setConfig, isConfigured: !!config }}>
      {children}
    </RepoContext.Provider>
  );
}

export function useRepo() {
  const ctx = useContext(RepoContext);
  if (!ctx) throw new Error("useRepo must be used inside RepoProvider");
  return ctx;
}