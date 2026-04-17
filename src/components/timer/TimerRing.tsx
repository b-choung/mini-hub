interface TimerRingProps {
  timeLeft: number;
  maxTime: number;
}

const RADIUS = 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function TimerRing({ timeLeft, maxTime }: TimerRingProps) {
  const progress = maxTime > 0 ? timeLeft / maxTime : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className="relative">
      <svg width="280" height="280">
        <circle cx="140" cy="140" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="14" />
        <circle
          cx="140" cy="140" r={RADIUS}
          fill="none"
          className="stroke-primary"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 140 140)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-mono font-bold">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
}
