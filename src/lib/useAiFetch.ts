"use client";

import { useState } from "react";

export function useAiFetch<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (url: string, body: unknown, errorMsg: string): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();

      return await res.json() as T;
    } catch {
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, setError, call };
}
