"use client";

import { useState, useEffect } from "react";
import TimerRing from "./TimerRing";
import TimerControls from "./TimerControls";
import AppLayout from "@/components/common/AppLayout";

const DEFAULT_WORK_TIME = 25;

export default function Timer() {
  const [workTime] = useState(DEFAULT_WORK_TIME);
  const [timeLeft, setTimeLeft] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

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
    <AppLayout title="Timer">
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
    </AppLayout>
  );
}
