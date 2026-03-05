import { useState } from "react"
import { analyzeFunction } from "@/services/api"
import {
  AnalyzeRequest,
  AnalyzeResponse
} from "@/types/apiTypes"

export function useAnalyze() {

  const [data, setData] = useState<AnalyzeResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function analyze(payload: AnalyzeRequest) {

    try {

      setLoading(true)
      setError(null)

      const result = await analyzeFunction(payload)

      setData(result)

      return result

    } catch (err) {

      console.error(err)
      setError("Failed to analyze function")

    } finally {

      setLoading(false)

    }

  }

  return {
    analyze,
    data,
    loading,
    error
  }

}