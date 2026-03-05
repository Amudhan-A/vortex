// services/api.ts

import {
  AnalyzeRequest,
  AnalyzeResponse,
  ExplainRequest,
  ExplainResponse
} from "@/types/apiTypes"


/* -------------------------------
   Backend Base URL
-------------------------------- */

const API_BASE_URL = "http://127.0.0.1:8000";


/* -------------------------------
   Analyze Function
-------------------------------- */

export async function analyzeFunction(
  payload: AnalyzeRequest
): Promise<AnalyzeResponse> {

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error("Failed to analyze function")
  }

  return response.json()
}


/* -------------------------------
   Explain Function
-------------------------------- */

export async function explainFunction(
  payload: ExplainRequest
): Promise<ExplainResponse> {

  const response = await fetch(`${API_BASE_URL}/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error("Failed to generate explanation")
  }

  return response.json()
}