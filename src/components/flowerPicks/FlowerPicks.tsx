"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/common/AppLayout";

interface Flower {
  name: string;
  meaning: string;
}

interface SearchResult {
  flowers: Flower[];
  similarMeanings: string[];
}

const FLOWER_EMOJIS: Record<string, string> = {
  장미: "🌹",
  튤립: "🌷",
  카네이션: "💐",
  해바라기: "🌻",
  벚꽃: "🌸",
  백합: "🪷",
};

const MOCK_RESULT: SearchResult = {
  flowers: [
    { name: "장미", meaning: "사랑, 열정" },
    { name: "튤립", meaning: "사랑의 고백" },
    { name: "카네이션", meaning: "당신을 사랑합니다" },
  ],
  similarMeanings: ["열정", "그리움", "애정", "헌신"],
};

export default function FlowerPicks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);

  const searchFlowers = () => {
    if (!searchTerm.trim()) return;
    // TODO: AI API 연동
    setResult(MOCK_RESULT);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") searchFlowers();
  };

  const handleSimilarClick = (meaning: string) => {
    setSearchTerm(meaning);
    setResult(MOCK_RESULT);
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
          onClick={searchFlowers}
          className="rounded-full font-bold px-6 shrink-0"
        >
          검색
        </Button>
      </div>

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
                  {FLOWER_EMOJIS[flower.name] ?? "🌼"}
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
