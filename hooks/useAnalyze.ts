// hooks/useAnalyze.ts
import { useState } from "react";
import { analyzeFunction, listFunctions } from "@/services/api";
import { useRepo } from "@/context/RepoContext";

export function useAnalyze() {
  const { config } = useRepo();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const analyze = async (filepath: string, functionName: string) => {
    if (!config) throw new Error("No repo configured");
    setLoading(true); setError(null);
    try {
      return await analyzeFunction(config, filepath, functionName);
    } catch (e: any) {
      setError(e.message); return null;
    } finally {
      setLoading(false);
    }
  };

  const getFunctions = async () => {
    if (!config) return [];
    const data = await listFunctions(config.repoName);
    return data.functions ?? [];
  };

  return { analyze, getFunctions, loading, error };
}