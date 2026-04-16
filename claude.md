# Mini Hub

바이브 코딩(Claude Code)으로 만든 미니앱을 모아둔 허브입니다.

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
- API 호출은 금지합니다.
- 외부 라이브러리는 최소화합니다.

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

- [ ] Todo App
- [ ] Calculator
- [ ] Weather App
- [ ] Note App
- [ ] Pomodoro Timer
- [ ] Expense Tracker
- [ ] Recipe Book
- [ ] Habit Tracker
- [ ] Flashcard App
- [ ] Music Player# Mini Hub

## 프로젝트 개요

바이브 코딩(Claude Code)으로 만든 미니앱을 모아둔 허브.

## 기술 스택

- Next.js 15
- React 19
- Tailwind 4
- shadcn/ui
- Typescript

## 중요 규칙

- 각 앱을 '완전히 독립된 컴포넌트'로 만들 것
- UI는 처음부터 shadcn으로 통일
- Local Storage만 사용 (외부 DB 연결 금지)
- 로그인/인증 구현 금지
- 단일 컴포넌트 200줄 초과 금지
- `src/app` 안의 최상위 `page.tsx` 를 제외한 모든 `page.tsx` 의 컴포넌트는 `상위 폴더명+Page`의 이름을 갖는다 (예시: `taskBoard/page.tsx` 내의 컴포넌트 명은 `TaskBoardPage`)

## 파일 구조

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── taskBoard/
│   │   └── page.tsx   
│   ├── pomodoro/
│   │   └── page.tsx       
│   ├── moodTracker/
│   │   └── page.tsx
│   ├── floriography/
│   │   └── page.tsx    
│   ├── memo/
│   │   └── page.tsx   
│   └── page.tsx
├── components/
│   ├── common/            # 공통으로 사용되는 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AppCard.tsx
│   ├── TaskBoard/
│   │   └── index.tsx
│   ├── Pomodoro/
│   │   └── index.tsx
│   ├── MoodTracker/
│   │   └── index.tsx
│   ├── Floriography/
│   │   └── index.tsx
│   └── Memo/
│       └── index.tsx
├── data/
│   └── apps.ts            # 앱 데이터 배열
└── types/
    ├── apps.ts
    ├── taskboard.ts
    ├── pomodoro.ts
    ├── moodTracker.ts
    ├── floriography.ts
    └── memo.ts
```

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
