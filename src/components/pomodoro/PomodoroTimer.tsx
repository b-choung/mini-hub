'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const STORAGE_KEY = 'minihub_pomodoro';

interface Settings {
  workTime: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLongBreak: number;
}

const defaultSettings: Settings = {
  workTime: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionsBeforeLongBreak: 4,
};

export default function PomodoroTimer() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [timeLeft, setTimeLeft] = useState(settings.workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      setTimeLeft(parsed.workTime * 60);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
    setIsRunning(false);
    if (currentSession === 'work') {
      setSessionCount(prev => prev + 1);
      if (sessionCount + 1 >= settings.sessionsBeforeLongBreak) {
        setCurrentSession('longBreak');
        setTimeLeft(settings.longBreak * 60);
        setSessionCount(0);
      } else {
        setCurrentSession('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
      }
    } else {
      setCurrentSession('work');
      setTimeLeft(settings.workTime * 60);
    }
    // 알림
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', { body: `${currentSession} 세션이 끝났습니다!` });
      }
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.workTime * 60);
    setCurrentSession('work');
    setSessionCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {currentSession === 'work' ? '작업 시간' : currentSession === 'shortBreak' ? '짧은 휴식' : '긴 휴식'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-mono mb-4">{formatTime(timeLeft)}</div>
          <div className="flex gap-2 justify-center">
            {!isRunning ? (
              <Button onClick={startTimer}>시작</Button>
            ) : (
              <Button onClick={pauseTimer}>일시정지</Button>
            )}
            <Button variant="outline" onClick={resetTimer}>리셋</Button>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            완료된 세션: {sessionCount}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}