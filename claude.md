# Mini Hub

## 프로젝트 개요

바이브 코딩(Claude Code)으로 만든 미니앱을 모아둔 허브.

## 기술 스택

- Next.js 15
- React 19
- Tailwind 4
- shadcn/ui
- Typescript
- recharts (차트 라이브러리)
- react-icons (아이콘)
- @anthropic-ai/sdk (AI 기능)

## 중요 규칙

- 각 앱은 완전히 독립된 컴포넌트로 만들어야 합니다.
- UI는 shadcn/ui로 통일합니다.
- Local Storage만 사용합니다.
- 로그인/인증은 금지합니다.
- 데이터베이스는 사용하지 않습니다.
- 단일 컴포넌트 200줄 초과를 금지합니다. (초과시 컴포넌트 분리)

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

- [ ✓ ] Task Board
- [ ✓ ] Timer
- [ ✓ ] Goal Tracker
- [ ✓ ] Mood Tracker
- [ ✓ ] Flower Picks
- [ ✓ ] Memo
- [ ✓ ] Random Plan

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
  icon: "앱 아이콘",
  color: "bg-color text-color",
  shadowColor: "#hexcode"
}
```

## 디자인 시스템 (키치/네오브루탈리즘)

### UI 기본 규칙

- layout 의 max-width는 1200px
- 모든 input의 focus 스타일 제거

### 폰트

- **`font-display`**: `var(--font-pacifico), var(--font-jua)` — 영문은 Pacifico, 한글은 Jua로 렌더링. 페이지 타이틀, 섹션 레이블, 카드 제목·내용, 앱 카드 이름 등 사용자에게 노출되는 텍스트에 폭넓게 적용
- **한국어 본문**: Jua (`--font-jua`) — body `font-family`에 Geist 다음 fallback으로 등록. 한글은 `font-display` 없이도 자동으로 Jua 적용
- **영문 본문**: Geist Sans

### 배경

- 전체 페이지 도트 패턴: `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)` / `20px 20px`

### 헤더 / 푸터

- 그라디언트: `bg-linear-to-r from-violet-500 via-pink-500 to-orange-400`
- 경계선: 헤더 `shadow-[0_3px_0_#fff]`, 푸터 `shadow-[0_-3px_0_#fff]`

### 앱 카드 (AppCard)

- 흰 배경 + `border-2` + 컬러 border/shadow (앱 고유 색상 `shadowColor` 사용)
- CSS 변수 `--card-shadow`로 각 앱의 색상 hex 값 주입
- 호버: 위로 살짝 뜨면서 1도 회전 (`hover:-translate-y-1 hover:rotate-1`)
- 각 앱에 `shadowColor` hex 값 필수 등록 (`src/data/apps.ts`)

### 버튼 (Button 컴포넌트)

- 섀도우·테두리 컬러: 딥 바이올렛 `#5b21b6`
- `default` / `outline` / `destructive`: `border-2 border-[#5b21b6] shadow-[3px_3px_0px_#5b21b6]`
- 호버: 섀도우 확장 + 1px 위로 (`hover:shadow-[4px_4px_0px_#5b21b6] hover:-translate-y-px`)
- 클릭: 섀도우 축소 + 눌리는 효과 (`active:shadow-[1px_1px_0px_#5b21b6] active:translate-x-[2px] active:translate-y-[2px]`)
- `ghost` / `link`: 테두리·섀도우 없음 (기존 스타일 유지)
