# Task Board

## 개요

칸반 보드 스타일로 할 일을 관리하는 앱입니다. 사용자는 카드 추가, 이동, 삭제를 통해 작업 흐름을 관리할 수 있어야 합니다.

## 저장 키

- `minihub_taskboard`

## 기능

- `To Do`, `In Progress`, `Done` 3개 컬럼
- 카드 추가 기능
- 카드 이동 기능 (드래그 앤 드롭 사용)
- 카드 삭제 기능
- 카드 편집 기능
- 로컬 스토리지에 상태 저장

## 데이터 구조

```ts
interface TaskCard {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
  cards: TaskCard[];
}
```

## 컴포넌트 구조

- `src/app/taskboard/page.tsx`
- `src/components/taskboard/TaskBoard.tsx`

## UI 규칙 반영

- 카드와 버튼 모두 `rounded-2xl` 또는 `rounded-full` 스타일 적용
- 텍스트 가운데 정렬
- 카드 높이 통일

## 확장 아이디어

- 카드 편집 기능
- 키워드 검색 / 필터
- 컬럼 추가/삭제
