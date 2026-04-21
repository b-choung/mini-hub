"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/common/AppLayout";
import { useAiFetch } from "@/lib/useAiFetch";

interface Flower {
  name: string;
  emoji: string;
  meaning: string;
}

interface SearchResult {
  flowers: Flower[];
  similarMeanings: string[];
}

export default function FlowerPicks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const { isLoading, error, call } = useAiFetch<SearchResult>();

  const searchFlowers = async (keyword: string = searchTerm) => {
    if (!keyword.trim()) return;
    const data = await call("/api/flower-search", { keyword }, "꽃 검색에 실패했어요. 다시 시도해주세요.");
    if (data) setResult(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchFlowers();
  };

  const handleSimilarClick = (meaning: string) => {
    setSearchTerm(meaning);
    searchFlowers(meaning);
  };

  return (
    <AppLayout title="Flower Picks">
      <p className="text-gray-400 text-sm -mt-2 mb-8">
        꽃말을 입력하면 어울리는 꽃을 추천해드려요
      </p>

      <div className="flex gap-2 max-w-md mx-auto mb-10">
        <Input
          placeholder="예: 사랑, 희망, 그리움"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-full px-5"
        />
        <Button
          onClick={() => searchFlowers()}
          disabled={isLoading}
          className="rounded-full font-bold px-6 shrink-0"
        >
          {isLoading ? "검색 중..." : "검색"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center mb-6">{error}</p>
      )}

      {result && (
        <div className="max-w-md mx-auto">
          {result.similarMeanings.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                유사 꽃말 추천
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {result.similarMeanings.map((meaning) => (
                  <button
                    key={meaning}
                    onClick={() => handleSimilarClick(meaning)}
                    className="px-4 py-1.5 rounded-full text-sm border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {meaning}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {result.flowers.map((flower, i) => (
              <div
                key={flower.name}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-pink-50 rounded-full shrink-0">
                  {flower.emoji ?? "🌼"}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{flower.name}</p>
                  <p className="text-sm text-gray-400">{flower.meaning}</p>
                </div>
                <span className="ml-auto text-xs text-gray-200 font-bold">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
