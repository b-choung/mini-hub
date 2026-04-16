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
- [ ] Pomodoro Timer
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
  id: 'new',
  name: '새 앱 이름',
  description: '한 줄 설명',
}
```
