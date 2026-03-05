<<<<<<< HEAD
"use client";

import { useState } from "react";
import { useAnalyze } from "@/hooks/useAnalyze";

export default function InspectPage() {

  const [repoPath, setRepoPath] = useState("");
  const [filePath, setFilePath] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [owner, setOwner] = useState("");
  const [repoName, setRepoName] = useState("");

  const { analyze, loading, data, error } = useAnalyze();

  const handleAnalyze = async () => {

    await analyze({
      repo_path: repoPath,
      filepath: filePath,
      function_name: functionName,
      owner: owner,
      repo_name: repoName
    });

  };

  return (

    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-semibold">
        Function Inspector
      </h1>

      <div className="space-y-4 max-w-xl">

        <input
          className="w-full p-2 rounded bg-[#2d2d2d] border border-[#3c3c3c]"
          placeholder="Repository Path"
          value={repoPath}
          onChange={(e) => setRepoPath(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#2d2d2d] border border-[#3c3c3c]"
          placeholder="File Path"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#2d2d2d] border border-[#3c3c3c]"
          placeholder="Function Name"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#2d2d2d] border border-[#3c3c3c]"
          placeholder="Repo Owner (GitHub username)"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-[#2d2d2d] border border-[#3c3c3c]"
          placeholder="Repository Name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Analyze
        </button>

      </div>

      {loading && (
        <p className="text-gray-400">
          Analyzing repository...
        </p>
      )}

      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      {data && (

        <div className="mt-8 space-y-6">

          <div>
            <h2 className="text-xl font-semibold">Callers</h2>
            <ul className="list-disc pl-6">
              {data.analysis.callers?.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Callees</h2>
            <ul className="list-disc pl-6">
              {data.analysis.callees?.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Blast Radius</h2>
            <ul className="list-disc pl-6">
              {data.analysis.blast_radius?.map((f: string) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Owner</h2>
            <p>{data.ownership.primary_owner}</p>
            <p className="text-sm text-gray-400">
              Confidence: {data.ownership.confidence}
            </p>
          </div>

        </div>

      )}

    </div>

  );

=======
export default function InspectPage() {
  return (
    <div className="p-8">
      <p className="font-mono text-xs text-[#6b6b6b]">inspector coming soon</p>
    </div>
  );
>>>>>>> c47344fd60c41b96008d561978d3756a9e94efb3
}