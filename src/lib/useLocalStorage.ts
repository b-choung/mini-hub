"use client";

import { useState, useEffect, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 서버와 클라이언트 모두 initialValue로 시작해 hydration mismatch 방지
  const [value, setValue] = useState<T>(initialValue);
  const isInitialMount = useRef(true);

  // 마운트 후 localStorage에서 로드
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      setValue(JSON.parse(saved) as T);
    }
  }, [key]);

  // 첫 마운트(initialValue 상태)는 저장 건너뜀 → 로드 후 값이 바뀔 때만 저장
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
