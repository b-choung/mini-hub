# Memo

## 개요

간단한 메모를 작성하고 수정/삭제할 수 있는 앱입니다. 여러 메모를 로컬에 저장합니다.
우측에 새 메모 추가 버튼이 있으며, 각 메모가 앱 카드 형식으로 노출됩니다. 새 메모 생성 시 초기 제목은 '새 메모', 초기 내용은 비어있습니다.

## 저장 키

- `minihub_memo`

## 기능

- 메모 추가
- 메모 편집
- 메모 삭제
- 로컬 스토리지에 저장

## 데이터 구조

```ts
interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
```

## 컴포넌트 구조

- `src/app/memo/page.tsx`
- `src/components/memo/MemoApp.tsx`

## UI 규칙 반영

- 버튼 `rounded-full`
- 카드 `rounded-2xl`
- 텍스트 가운데 정렬

## 확장 아이디어

- 메모 검색 기능
- 메모 카테고리/태그
- 메모 정렬 옵션
