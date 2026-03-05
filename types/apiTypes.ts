export interface AnalyzeRequest {
  repo_path: string
  filepath: string
  function_name: string
  owner: string
  repo_name: string
}

export interface Contributor {
  author: string
  commits: number
}

export interface Analysis {
  function_name: string
  callers: string[]
  callees: string[]
  blast_radius: string[]
}

export interface Ownership {
  primary_owner: string
  confidence: number
  contributors: Contributor[]
}

export interface AnalyzeResponse {
  analysis: Analysis
  ownership: Ownership
}
export interface ExplainRequest {
  repo_path: string
  filepath: string
  function_name: string
  owner: string
  repo_name: string
}

export interface ExplainResponse {
  explanation: string
}