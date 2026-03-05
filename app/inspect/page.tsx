// app/inspect/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FunctionPanel } from "@/components/inspector/FunctionPanel";
import { BlastRadiusList } from "@/components/inspector/BlastRadiusList";
import { OwnerCard } from "@/components/inspector/OwnerCard";
import { RepoSetupForm } from "@/components/ui/RepoSetupForm";
import { useExplain } from "@/hooks/useExplain";
import { useRepo } from "@/context/RepoContext";
import { useAnalyze } from "@/hooks/useAnalyze";

export default function InspectPage() {
  const searchParams  = useSearchParams();
  const fnName  = searchParams.get("fn") ?? "";
  const repo    = searchParams.get("repo") ?? "";

  const { isConfigured } = useRepo();
  const { explain, loading: explainLoading } = useExplain();
  const { analyze } = useAnalyze();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!isConfigured || !fnName) return;
    // filepath comes from the URL or you can load from listFunctions first
    const filepath = searchParams.get("filepath") ?? "";
    Promise.all([
      explain(filepath, fnName),
      analyze(filepath, fnName),
    ]).then(([decisionLog, analysis]) => setData({ decisionLog, analysis }));
  }, [isConfigured, fnName]);

  return (
    <div className="p-6 h-full flex gap-4">
      <RepoSetupForm />
      {explainLoading && <p className="font-mono text-xs text-[#6b6b6b]">analyzing...</p>}
      {data && (
        <>
          <FunctionPanel
            functionName={fnName}
            filepath={searchParams.get("filepath") ?? ""}
            primaryOwner={data.decisionLog?.ownership?.primary_owner ?? "unknown"}
            confidence={data.decisionLog?.ownership?.confidence ?? 0}
            generatedAt={data.decisionLog?.decision_log?.generated_at ?? new Date().toISOString()}
            whyItExists={data.decisionLog?.decision_log?.why_it_exists ?? ""}
            keyDecisions={data.decisionLog?.decision_log?.key_decisions ?? []}
            linkedIssues={(data.decisionLog?.decision_log?.linked_issues ?? []).map((id: string) => ({
              id, title: id, type: id.toLowerCase().startsWith("pr") ? "pr" : "issue"
            }))}
            callers={data.analysis?.analysis?.callers ?? []}
            callees={data.analysis?.analysis?.callees ?? []}
          />
          <BlastRadiusList
            functionName={fnName}
            entries={(data.analysis?.analysis?.blast_radius ?? []).map((fn: string) => ({
              functionName: fn, filepath: "", severity: "direct" as const
            }))}
          />
        </>
      )}
    </div>
  );
}