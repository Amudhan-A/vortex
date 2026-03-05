// services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface RepoConfig {
  repoPath: string;
  owner: string;
  repoName: string;
}

// POST /analyze
export async function analyzeFunction(
  config: RepoConfig,
  filepath: string,
  functionName: string
) {
  const params = new URLSearchParams({
    repo_path: config.repoPath,
    filepath,
    function_name: functionName,
    owner: config.owner,
    repo_name: config.repoName,
  });
  const res = await fetch(`${BASE_URL}/analyze?${params}`, { method: "POST" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// POST /explain-function
export async function explainFunction(
  config: RepoConfig,
  filepath: string,
  functionName: string
) {
  const res = await fetch(`${BASE_URL}/explain-function`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      repo_path: config.repoPath,
      filepath,
      function_name: functionName,
      owner: config.owner,
      repo_name: config.repoName,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// GET /functions?repo_name=
export async function listFunctions(repoName: string) {
  const res = await fetch(`${BASE_URL}/functions?repo_name=${encodeURIComponent(repoName)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { functions: [{filepath, function_name}] }
}

// GET /function?repo=&filepath=&function_name=
export async function getFunction(repoName: string, filepath: string, functionName: string) {
  const params = new URLSearchParams({ repo: repoName, filepath, function_name: functionName });
  const res = await fetch(`${BASE_URL}/function?${params}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// GET /files?repo_name=
export async function listFiles(repoName: string) {
  const res = await fetch(`${BASE_URL}/files?repo_name=${encodeURIComponent(repoName)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json(); // { files: [string] }
}