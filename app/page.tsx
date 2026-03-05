"use client";

import { AskPanel } from "@/components/search/AskPanel";
import type { AskResult } from "@/components/search/AskPanel";
import { useRepo } from "@/context/RepoContext";
import { listFunctions, getFunction } from "@/services/api";

export default function TestPage() {
  const { config } = useRepo();

  const realSearch = async (query: string): Promise<AskResult[]> => {
    if (!config) return [];

    const { functions } = await listFunctions(config.repoName);

    const matches = (functions as any[]).filter((f) =>
      f.function_name.toLowerCase().includes(query.toLowerCase())
    );

    const detailed = await Promise.all(
      matches.slice(0, 6).map((f) =>
        getFunction(config.repoName, f.filepath, f.function_name)
      )
    );

    return detailed.filter(Boolean).map((d: any) => ({
      functionName: d.function_name,
      filepath: d.filepath,
      repo: d.repo,
      snippet: d.decision_log?.why_it_exists ?? "No analysis yet.",
      owner: d.ownership?.primary_owner ?? "unknown",
    }));
  };

  return (
    <div className="h-screen">
      <AskPanel onSearch={realSearch} />
    </div>
  );
}