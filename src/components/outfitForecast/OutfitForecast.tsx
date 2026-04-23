"use client";

import { useState, useEffect, useCallback } from "react";
import AppLayout from "@/components/common/AppLayout";
import WeatherCard from "./WeatherCard";
import { Button } from "@/components/ui/button";


export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  temperatureMax: number;
  temperatureMin: number;
  windSpeed: number;
  precipitationProbability: number;
  weatherCode: number;
}

type Status = "idle" | "locating" | "loading" | "success" | "error";

export default function OutfitForecast() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchWeather = useCallback(() => {
    setStatus("locating");
    setErrorMsg("");

    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMsg("위치 정보를 사용할 수 없는 브라우저입니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setStatus("loading");

        try {
          const [weatherRes, geoRes] = await Promise.all([
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,wind_speed_10m,precipitation_probability,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
            ),
            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            ),
          ]);

          const weatherJson = await weatherRes.json();
          const geoJson = await geoRes.json();

          const c = weatherJson.current;
          const d = weatherJson.daily;

          setWeather({
            temperature: c.temperature_2m,
            apparentTemperature: c.apparent_temperature,
            temperatureMax: d.temperature_2m_max[0],
            temperatureMin: d.temperature_2m_min[0],
            windSpeed: c.wind_speed_10m,
            precipitationProbability: c.precipitation_probability,
            weatherCode: c.weather_code,
          });

          const addr = geoJson.address;
          setLocationName(addr.city || addr.town || addr.county || addr.state || "");
          setStatus("success");
        } catch {
          setStatus("error");
          setErrorMsg("날씨 정보를 불러오지 못했어요. 다시 시도해주세요.");
        }
      },
      () => {
        setStatus("error");
        setErrorMsg("위치 정보 접근이 거부되었어요. 브라우저 설정을 확인해주세요.");
      }
    );
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const isLoading = status === "idle" || status === "locating" || status === "loading";

  return (
    <AppLayout title="Outfit Forecast">
      <p className="text-gray-400 text-sm -mt-2 mb-8">
        오늘의 날씨에 맞는 옷차림을 알아보세요
      </p>

      {isLoading && (
        <p className="text-gray-400 text-sm">
          {status === "locating" ? "위치 정보를 가져오는 중..." : "날씨를 불러오는 중..."}
        </p>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-400 text-sm">{errorMsg}</p>
          <Button onClick={fetchWeather} className="rounded-full px-6">
            다시 시도
          </Button>
        </div>
      )}

      {status === "success" && weather && (
        <div className="flex justify-center">
          <WeatherCard weather={weather} locationName={locationName} />
        </div>
      )}
    </AppLayout>
  );
}
