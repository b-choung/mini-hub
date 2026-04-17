"use client";

import { useState, useEffect } from "react";
import TimerRing from "./TimerRing";
import TimerControls from "./TimerControls";

const STORAGE_KEY = "minihub_timer";
const DEFAULT_WORK_TIME = 25;

interface TimerStorage {
  workTime: number;
  timeLeft: number;
  maxTime: number;
  isRunning: boolean;
}

export default function Timer() {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [timeLeft, setTimeLeft] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<TimerStorage>;
        const savedWorkTime =
          typeof parsed.workTime === "number" && Number.isFinite(parsed.workTime)
            ? parsed.workTime : DEFAULT_WORK_TIME;
        const savedTimeLeft =
          typeof parsed.timeLeft === "number" && Number.isFinite(parsed.timeLeft)
            ? parsed.timeLeft : 0;
        const savedMaxTime =
          typeof parsed.maxTime === "number" && Number.isFinite(parsed.maxTime)
            ? parsed.maxTime : 0;
        setWorkTime(savedWorkTime);
        setTimeLeft(savedTimeLeft);
        setMaxTime(savedMaxTime);
        setIsRunning(parsed.isRunning ?? false);
      } catch {
        setWorkTime(DEFAULT_WORK_TIME);
        setTimeLeft(0);
        setIsRunning(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ workTime, timeLeft, maxTime, isRunning }));
  }, [workTime, timeLeft, maxTime, isRunning]);

  useEffect(() => {
    if (!Number.isFinite(timeLeft)) { setTimeLeft(workTime * 60); return; }

    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => Math.max(prev - 1, 0)), 1000);
    }
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setFinished(true);
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification("Timer", { body: "타이머가 종료되었습니다." });
      }
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning, timeLeft, workTime]);

  const startTimer = () => {
    if (timeLeft === 0 && !finished) {
      const start = workTime * 60;
      setTimeLeft(start);
      setMaxTime(start);
    }
    setFinished(false);
    setIsRunning(true);
  };

  const addMinutes = (minutes: number) => {
    const newTime = timeLeft + minutes * 60;
    setTimeLeft(newTime);
    setMaxTime(isRunning ? (prev) => prev + minutes * 60 : newTime);
    setFinished(false);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-6">Timer</h1>
      <div className="flex flex-col items-center gap-6">
        <TimerRing timeLeft={timeLeft} maxTime={maxTime} />
        <TimerControls
          isRunning={isRunning}
          finished={finished}
          onStart={startTimer}
          onPause={() => setIsRunning(false)}
          onReset={() => { setIsRunning(false); setFinished(false); setTimeLeft(0); setMaxTime(0); }}
          onAddMinutes={addMinutes}
        />
      </div>
    </div>
  );
}
