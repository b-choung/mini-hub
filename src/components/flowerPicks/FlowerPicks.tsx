"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/common/AppLayout";

interface Flower {
  name: string;
  meaning: string;
}

const flowers: Flower[] = [
  { name: "장미", meaning: "사랑" },
  { name: "튤립", meaning: "명예" },
  { name: "해바라기", meaning: "숭배" },
  { name: "카네이션", meaning: "어머니의 사랑" },
  { name: "백합", meaning: "순결" },
  { name: "데이지", meaning: "희망" },
  { name: "제비꽃", meaning: "겸손" },
  { name: "국화", meaning: "충성" },
  { name: "벚꽃", meaning: "생명의 아름다움" },
  { name: "수선화", meaning: "자만심" },
];

export default function FlowerPicks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState<Flower[]>([]);

  const searchFlowers = () => {
    if (!searchTerm.trim()) return;
    const filtered = flowers.filter((flower) =>
      flower.meaning.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setRecommendations(filtered);
  };

  return (
    <AppLayout title="Flower Picks">
      <Card className="mb-4 rounded-2xl">
        <CardHeader>
          <CardTitle>꽃말로 꽃 찾기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="꽃말을 입력하세요 (예: 사랑)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={searchFlowers}>검색</Button>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {recommendations.map((flower) => (
          <Card key={flower.name} className="rounded-2xl">
            <CardHeader>
              <CardTitle>{flower.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>꽃말: {flower.meaning}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
