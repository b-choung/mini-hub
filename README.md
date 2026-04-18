# Mini Hub

바이브 코딩(Claude Code)으로 만든 미니앱 모음 허브입니다.

## 앱 목록

| 앱           | 설명                          |
| ------------ | ----------------------------- |
| Task Board   | 칸반 스타일의 할 일 관리 보드 |
| Timer        | 집중 타이머                   |
| Goal Tracker | 목표 설정 및 진행 추적        |
| Mood Tracker | 데일리 기분 기록 및 차트 분석 |
| Flower Picks | 꽃말 검색 및 추천             |
| Memo         | 메모 작성 및 관리             |

## 기술 스택

- **Next.js 15** + **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** — UI 컴포넌트
- **recharts** — 차트
- **react-icons** — 아이콘
- **@anthropic-ai/sdk** — AI 기능

## 시작하기

```bash
npm install
npm run dev
```

## 규칙

- 각 앱은 완전히 독립된 컴포넌트로 구성
- 데이터는 Local Storage에만 저장 (`minihub_[앱id]` 형식)
- 로그인/인증/데이터베이스 없음
- 단일 컴포넌트 200줄 초과 시 분리
