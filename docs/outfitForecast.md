# Outfit Forecast

## 개요

오늘의 날씨(기온, 바람, 강수 확률 등)를 보여주고, 날씨에 맞는 옷차림을 AI가 추천해주는 앱입니다.

## 저장 키

- 없음 (날씨 데이터는 실시간 조회, Local Storage 미사용)

## 기능

- 현재 위치 기반 날씨 조회 (Geolocation API)
- 오늘의 날씨 정보 표시
  - 기온 (현재 / 최고 / 최저)
  - 바람 (풍속)
  - 강수 확률
  - 날씨 상태 (맑음 / 흐림 / 비 / 눈 등)
- 날씨 기반 AI 옷차림 추천

## 날씨 API

- [Open-Meteo](https://open-meteo.com/) — 무료, 키 불필요, 위도/경도 기반 조회

## 데이터 구조

```ts
interface WeatherData {
  temperature: number;       // 현재 기온 (°C)
  temperatureMax: number;    // 최고 기온
  temperatureMin: number;    // 최저 기온
  windSpeed: number;         // 풍속 (km/h)
  precipitationProbability: number; // 강수 확률 (%)
  weatherCode: number;       // WMO 날씨 코드
}

interface OutfitRecommendation {
  summary: string;           // 한 줄 날씨 요약
  items: string[];           // 추천 옷차림 목록
  tip: string;               // 날씨 대응 팁
}
```

## 컴포넌트 구조

- `src/app/outfitForecast/page.tsx`
- `src/components/outfitForecast/OutfitForecast.tsx` — 상태 관리
- `src/components/outfitForecast/WeatherCard.tsx` — 날씨 정보 표시
- `src/components/outfitForecast/OutfitResult.tsx` — AI 옷차림 추천 결과
- `src/app/api/outfit-recommend/route.ts` — AI 추천 API

## 확장 아이디어

- 시간대별 날씨 예보
- 내일 날씨 및 옷차림 미리보기
- 사용자 스타일 선호도 입력 (캐주얼 / 포멀 등)
