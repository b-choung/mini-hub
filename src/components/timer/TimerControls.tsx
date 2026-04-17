import { Button } from "@/components/ui/button";
import { MdPlayArrow, MdPause, MdReplay } from "react-icons/md";

interface TimerControlsProps {
  isRunning: boolean;
  finished: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onAddMinutes: (minutes: number) => void;
}

export default function TimerControls({
  isRunning,
  finished,
  onStart,
  onPause,
  onReset,
  onAddMinutes,
}: TimerControlsProps) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="outline" onClick={() => onAddMinutes(1)}>+1분</Button>
        <Button variant="outline" onClick={() => onAddMinutes(5)}>+5분</Button>
        <Button variant="outline" onClick={() => onAddMinutes(10)}>+10분</Button>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="outline" className="size-12 text-2xl" onClick={onReset}>
          <MdReplay />
        </Button>
        {!isRunning ? (
          <Button size="icon" className="size-12 text-2xl" onClick={onStart}>
            <MdPlayArrow />
          </Button>
        ) : (
          <Button size="icon" className="size-12 text-2xl" onClick={onPause}>
            <MdPause />
          </Button>
        )}
      </div>
      {finished ? (
        <p className="text-sm text-green-600">타이머가 종료되었습니다.</p>
      ) : (
        <p className="text-sm text-gray-600">원하는 만큼 시간을 더할 수 있어요.</p>
      )}
    </>
  );
}
