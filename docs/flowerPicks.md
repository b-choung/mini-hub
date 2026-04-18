# Flower Picks

## 개요

꽃말을 검색하면 연동된 AI가 해당 의미에 알맞은 꽃을 추천해주는 앱 입니다.

## 기능

- 꽃말 검색 입력
- 검색 결과에 해당하는 꽃 리스트 추천
- 유사 꽃말 리스트 표시

## 데이터 구조

```ts
interface Flower {
  name: string;
  meaning: string;
}
```

## 컴포넌트 구조

- `src/app/flowerPicks/page.tsx`
- `src/components/flowerPicks/FlowerPicks.tsx`

## UI 규칙 반영

- 버튼 `rounded-full`
- 카드 `rounded-2xl`
- 텍스트 가운데 정렬

## 확장 아이디어

- 검색어 기록 저장
- 꽃 사진/일러스트 추가
- 꽃말 카테고리 필터
