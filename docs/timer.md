# Timer

## 개요

집중 타이머 앱입니다. 원하는 시간을 편리하게 선택할 수 있습니다.

## 기능

- 작업 세션
- 시작/일시정지/리셋
- 알림 기능
- 1분/5분/10분 단위 시간 더하기 버튼

## 데이터 구조

```ts
interface TimerStorage {
  workTime: number;
  timeLeft: number;
  isRunning: boolean;
}
```

## 컴포넌트 구조

- `src/app/timer/page.tsx`
- `src/components/timer/Timer.tsx`

## UI 규칙 반영

- 버튼은 `rounded-full`
- 메인 카드 `rounded-2xl`
- 텍스트 가운데 정렬
- 타이머는 원형

## 확장 아이디어

- 세션 설정 UI 추가
- 사운드 알림
- 자동 시작 옵션
- 통계/오늘 집중 기록
