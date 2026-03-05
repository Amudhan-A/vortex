// components/ui/RepoSetupForm.tsx
"use client";
import { useState } from "react";
import { useRepo } from "@/context/RepoContext";
import { VortexButton } from "@/components/ui/button";
import { GitBranch } from "lucide-react";

export function RepoSetupForm() {
  const { setConfig, isConfigured, config } = useRepo();
  const [open, setOpen]         = useState(!isConfigured); // opens if not configured
  const [repoPath, setRepoPath] = useState(config?.repoPath ?? "");
  const [owner, setOwner]       = useState(config?.owner ?? "");
  const [repoName, setRepoName] = useState(config?.repoName ?? "");

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="fixed top-3 right-4 z-40 flex items-center gap-2 font-mono text-[10px] text-[#6b6b6b] hover:text-[#4ec9b0] transition-colors"
    >
      <GitBranch size={12} />
      {config?.repoName ?? "connect repo"}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#252526] border border-[#3e3e42] rounded-sm p-6 flex flex-col gap-4 w-96 shadow-2xl">
        <div className="flex items-center gap-2">
          <GitBranch size={14} className="text-[#4ec9b0]" />
          <span className="font-mono text-sm text-white">Connect Repository</span>
        </div>

        {[
          { label: "Repo Path (local)",  value: repoPath, set: setRepoPath, placeholder: "C:/Users/you/projects/my-repo" },
          { label: "GitHub Owner",       value: owner,    set: setOwner,    placeholder: "Amudhan-A" },
          { label: "Repo Name",          value: repoName, set: setRepoName, placeholder: "git-blame-app-backend" },
        ].map(({ label, value, set, placeholder }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6b6b6b]">
              {label}
            </span>
            <input
              value={value}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              className="bg-[#1e1e1e] border border-[#3e3e42] rounded-sm px-3 py-2 font-mono text-xs text-[#d4d4d4] outline-none focus:border-[#4ec9b0]/50 placeholder:text-[#3e3e42]"
            />
          </div>
        ))}

        <div className="flex gap-2 pt-1">
          <VortexButton
            variant="primary"
            size="sm"
            disabled={!repoPath || !owner || !repoName}
            onClick={() => {
              setConfig({ repoPath, owner, repoName });
              setOpen(false);
            }}
          >
            Connect
          </VortexButton>
          {isConfigured && (
            <VortexButton variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </VortexButton>
          )}
        </div>
      </div>
    </div>
  );
}