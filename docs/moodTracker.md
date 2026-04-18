# Mood Tracker

## 개요

데일리로 기분과 100자 이내의 간단한 일기를 입력할 수 있습니다.
입력된 기분은 주간/월간/연간별 차트로 정리되어 볼 수 있고, 일기는 AI가 주간/월간/연간별로 분석하여 나의 상태를 간단히 리뷰해줍니다.

## 저장 키

- `minihub_moodTracker`

## 기능

- 날짜 선택
- 기분 선택 버튼 (이모지 포함)
- 100자 이내 일기 작성
- 기분 차트 (주간 / 월간 / 연간)
- 기록 리스트 표시 및 삭제
- AI 일기 분석 리뷰 (TODO)

## 데이터 구조

```ts
interface MoodEntry {
  id: string;
  date: string;       // YYYY-MM-DD
  mood: string;
  diary: string;      // 100자 이내
  createdAt: string;  // ISO string
}
```

## 기분 목록

| 기분 | 이모지 | 점수 |
|------|--------|------|
| 행복 | 😊 | 5 |
| 흥분 | 🤩 | 4 |
| 평온 | 😌 | 3 |
| 피곤 | 😴 | 2 |
| 슬픔 | 😢 | 1 |
| 화남 | 😠 | 0 |

## 컴포넌트 구조

- `src/app/moodTracker/page.tsx`
- `src/components/moodTracker/MoodTracker.tsx` — 상태 관리
- `src/components/moodTracker/MoodForm.tsx` — 기록 입력 폼
- `src/components/moodTracker/MoodChart.tsx` — 기간별 차트
- `src/components/moodTracker/MoodList.tsx` — 기록 리스트

## UI 규칙 반영

- 버튼 `rounded-full`
- 카드 `rounded-2xl`
- 텍스트 가운데 정렬
- 차트 라이브러리: recharts

## 확장 아이디어

- AI 주간/월간/연간 일기 분석 리뷰
- 기분별 태그 컬러 필터
- 검색 기능
