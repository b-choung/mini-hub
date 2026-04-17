# Mini Hub

## 프로젝트 개요

바이브 코딩(Claude Code)으로 만든 미니앱을 모아둔 허브.

## 기술 스택

- Next.js 15
- React 19
- Tailwind 4
- shadcn/ui
- Typescript

## 중요 규칙

- 각 앱은 완전히 독립된 컴포넌트로 만들어야 합니다.
- UI는 shadcn/ui로 통일합니다.
- Local Storage만 사용합니다.
- 로그인/인증은 금지합니다.
- 데이터베이스는 사용하지 않습니다.
- 단일 컴포넌트 200줄 초과 금지 (초과시 컴포넌트 분리)

## 파일 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── [app]/
│       ├── page.tsx
│       └── components/
├── components/
│   ├── ui/
│   └── [app]/
├── data/
├── types/
└── lib/
```

## 앱 목록

- [ ] Task Board
- [ ] Timer
- [ ] Goal Tracker
- [ ] Mood Tracker
- [ ] Flower Picks
- [ ] Memo

## Local Storage 키 네이밍 규칙

```
minihub_[app id]
```

예시 `minihub_taskboard`

## 앱 추가 방법

1. `src/data/apps.ts` 에 앱 메타데이터 객체 추가
2. `src/components/new` 및 `src/app/new` 폴더 생성
3. `src/app/new` 에 `page.tsx` 파일 생성 및 필요 컴포넌트 import

```js
// apps.ts 예시
{
  id: '새 앱 아이디',
  name: '새 앱 이름',
  description: '한 줄 설명',
  icon: "앱 아이콘"
}
```

## UI 규칙

- 기본 rounded-2xl의 둥근 느낌 유지
- 버튼은 rounded-full 사용
- 버튼 내부 텍스트는 bold 사용
- 버튼 호버 시, cursor-pointer 적용
- 텍스트는 모두 가운데 정렬
- layout의 max-width는 1200px
- 모든 input의 focus 스타일 제거
