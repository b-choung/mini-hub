import { WeatherData } from "./OutfitForecast";

const WEATHER_MAP: Record<number, { emoji: string; label: string }> = {
  0:  { emoji: "☀️",  label: "맑음" },
  1:  { emoji: "🌤️", label: "대체로 맑음" },
  2:  { emoji: "⛅",  label: "구름 조금" },
  3:  { emoji: "☁️",  label: "흐림" },
  45: { emoji: "🌫️", label: "안개" },
  48: { emoji: "🌫️", label: "안개" },
  51: { emoji: "🌦️", label: "이슬비" },
  53: { emoji: "🌦️", label: "이슬비" },
  55: { emoji: "🌦️", label: "이슬비" },
  61: { emoji: "🌧️", label: "비" },
  63: { emoji: "🌧️", label: "비" },
  65: { emoji: "🌧️", label: "강한 비" },
  71: { emoji: "❄️",  label: "눈" },
  73: { emoji: "❄️",  label: "눈" },
  75: { emoji: "❄️",  label: "강한 눈" },
  80: { emoji: "🌦️", label: "소나기" },
  81: { emoji: "🌦️", label: "소나기" },
  82: { emoji: "⛈️",  label: "강한 소나기" },
  95: { emoji: "⛈️",  label: "천둥번개" },
};

function getWeatherInfo(code: number) {
  return WEATHER_MAP[code] ?? { emoji: "🌡️", label: "알 수 없음" };
}

interface WeatherCardProps {
  weather: WeatherData;
  locationName: string;
}

export default function WeatherCard({ weather, locationName }: WeatherCardProps) {
  const { emoji, label } = getWeatherInfo(weather.weatherCode);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border-2 border-sky-300 shadow-[4px_4px_0px_#7dd3fc] rounded-3xl p-8 mb-4 text-center">
        {locationName && (
          <p className="text-sm font-display text-gray-400 mb-3">📍 {locationName}</p>
        )}
        <div className="text-6xl mb-2">{emoji}</div>
        <p className="text-lg font-display font-semibold text-gray-500 mb-1">{label}</p>
        <p className="text-7xl font-display font-bold text-gray-900 leading-none mb-2">
          {Math.round(weather.temperature)}°
        </p>
        <p className="text-sm font-display text-gray-400 mb-1">
          체감 {Math.round(weather.apparentTemperature)}°
        </p>
        <p className="text-sm font-display text-gray-500">
          최고 {Math.round(weather.temperatureMax)}° / 최저 {Math.round(weather.temperatureMin)}°
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border-2 border-sky-300 shadow-[3px_3px_0px_#7dd3fc] rounded-2xl p-4 text-center">
          <p className="text-2xl mb-1">💨</p>
          <p className="text-xs font-display text-gray-400 mb-1">바람</p>
          <p className="text-xl font-display font-bold text-gray-800">
            {Math.round(weather.windSpeed)}
          </p>
          <p className="text-xs font-display text-gray-400">km/h</p>
        </div>
        <div className="bg-white border-2 border-sky-300 shadow-[3px_3px_0px_#7dd3fc] rounded-2xl p-4 text-center">
          <p className="text-2xl mb-1">☔</p>
          <p className="text-xs font-display text-gray-400 mb-1">강수 확률</p>
          <p className="text-xl font-display font-bold text-gray-800">
            {weather.precipitationProbability}
          </p>
          <p className="text-xs font-display text-gray-400">%</p>
        </div>
      </div>
    </div>
  );
}
