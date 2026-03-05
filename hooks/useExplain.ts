// hooks/useExplain.ts
import { useState } from "react";
import { explainFunction } from "@/services/api";
import { useRepo } from "@/context/RepoContext";

export function useExplain() {
  const { config } = useRepo();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const explain = async (filepath: string, functionName: string) => {
    if (!config) throw new Error("No repo configured");
    setLoading(true); setError(null);
    try {
      return await explainFunction(config, filepath, functionName);
    } catch (e: any) {
      setError(e.message); return null;
    } finally {
      setLoading(false);
    }
  };

  return { explain, loading, error };
}