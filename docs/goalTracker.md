# Goal Tracker

## 개요

개인 목표를 세우고 진행률을 관리하는 앱입니다. 각 목표가 앱 카드 형식으로 노출되고, 클릭 시 목표 세부 화면으로 이동합니다. 세부 화면은 달력 형식이며, 매일 달성 여부를 체크할 수 있습니다.
목표를 추가할 때는 30일/50일/100일 중 하나를 목표 기간으로 선택합니다.

## 저장 키

- `minihub_goalTracker`

## 기능

- 목표 추가 기능 (시작일 / 목표 기간)
- 목표 삭제
- 로컬 스토리지에 저장

## 데이터 구조

```ts
interface Goal {
  id: string;
  name: string;
  startDate: string;
  duration: 30 | 50 | 100;
  checkins: string[]; // YYYY-MM-DD 형식
}
```

## 컴포넌트 구조

- `src/app/goalTracker/page.tsx`
- `src/components/goalTracker/GoalTracker.tsx` — 상태 관리, 목록/세부 화면 전환
- `src/components/goalTracker/GoalList.tsx` — 목표 카드 목록 + 추가 폼
- `src/components/goalTracker/GoalDetail.tsx` — 달력 형식 세부 화면

## UI 규칙 반영

- 카드 `rounded-2xl`
- 버튼 `rounded-full`
- 입력 폼 가운데 정렬

## 확장 아이디어

- 목표 상태 필터링
- 완료 목표 표시 / 달성 배지
- 목표 우선순위 추가
