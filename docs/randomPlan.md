# Random Plan

## 개요

원하는 시간을 입력하면, 그 시간 동안 하면 좋을 활동들을 AI가 추천해주는 앱입니다.
예를 들어 "2시간"을 입력하면 AI가 그 시간에 맞게 활동들을 조합해서 플랜을 제안합니다.

## 저장 키

- `minihub_randomPlan`

## 기능

- 시간 입력 (분 또는 시간 단위)
- 플랜 방향 선택 (활동적인 / 정적인 / 종합적인 등)
- AI 활동 추천 (입력한 시간과 방향에 맞는 활동 목록 생성)
- 추천 결과 재생성 (마음에 안 들면 다시 뽑기)
- 추천 히스토리 저장

## 데이터 구조

```ts
type PlanStyle = "활동적인" | "정적인" | "종합적인";

interface PlanResult {
  id: string;
  duration: number;       // 분 단위
  style: PlanStyle;
  activities: Activity[];
  createdAt: string;      // ISO string
}

interface Activity {
  title: string;
  duration: number;       // 분 단위
  description: string;
}
```

## 컴포넌트 구조

- `src/app/randomPlan/page.tsx`
- `src/components/randomPlan/RandomPlan.tsx` — 상태 관리
- `src/components/randomPlan/PlanForm.tsx` — 시간 입력 폼
- `src/components/randomPlan/PlanResult.tsx` — 추천 결과 표시

## API

- `src/app/api/random-plan/route.ts` — Claude AI 호출 (claude-haiku-4-5-20251001)
- `ANTHROPIC_API_KEY` 환경 변수 필요

## UI 규칙 반영

- 버튼 `rounded-full`
- 카드 `rounded-2xl`
- 텍스트 가운데 정렬
- 로딩 중 스켈레톤 또는 스피너 표시

## 확장 아이디어

- 활동 카테고리 필터 (휴식, 운동, 공부 등)
- 즐겨찾기 저장
- 활동 완료 체크
