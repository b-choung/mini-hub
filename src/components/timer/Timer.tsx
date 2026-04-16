"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STORAGE_KEY = "minihub_timer";
const DEFAULT_WORK_TIME = 25;

interface TimerStorage {
  workTime: number;
  timeLeft: number;
  isRunning: boolean;
}

export default function Timer() {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<TimerStorage>;
        const savedWorkTime =
          typeof parsed.workTime === "number" &&
          Number.isFinite(parsed.workTime)
            ? parsed.workTime
            : DEFAULT_WORK_TIME;
        const savedTimeLeft =
          typeof parsed.timeLeft === "number" &&
          Number.isFinite(parsed.timeLeft)
            ? parsed.timeLeft
            : 0;

        setWorkTime(savedWorkTime);
        setTimeLeft(savedTimeLeft);
        setIsRunning(parsed.isRunning ?? false);
      } catch {
        setWorkTime(DEFAULT_WORK_TIME);
        setTimeLeft(0);
        setIsRunning(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ workTime, timeLeft, isRunning }),
    );
  }, [workTime, timeLeft, isRunning]);

  useEffect(() => {
    if (!Number.isFinite(timeLeft)) {
      setTimeLeft(workTime * 60);
      return;
    }

    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setFinished(true);
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("Timer", { body: "타이머가 종료되었습니다." });
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, workTime]);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "00:00";
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startTimer = () => {
    if (timeLeft === 0 && !finished) {
      setTimeLeft(workTime * 60);
    }
    setFinished(false);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setFinished(false);
    setTimeLeft(0);
  };

  const addMinutes = (minutes: number) => {
    setTimeLeft((prev) => prev + minutes * 60);
    setFinished(false);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Timer</h1>
      <Card className="max-w-md mx-auto rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center">작업 세션</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => addMinutes(1)}
            >
              +1분
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => addMinutes(5)}
            >
              +5분
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => addMinutes(10)}
            >
              +10분
            </Button>
          </div>
          <div className="flex gap-2 justify-center mb-4">
            {!isRunning ? (
              <Button
                className="px-6 py-3 text-base rounded-full"
                onClick={startTimer}
              >
                시작
              </Button>
            ) : (
              <Button
                className="px-6 py-3 text-base rounded-full"
                onClick={pauseTimer}
              >
                일시정지
              </Button>
            )}
            <Button
              variant="outline"
              className="px-6 py-3 text-base rounded-full"
              onClick={resetTimer}
            >
              리셋
            </Button>
          </div>
          {finished ? (
            <div className="text-sm text-green-600">
              타이머가 종료되었습니다.
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              원하는 만큼 시간을 더할 수 있어요.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
