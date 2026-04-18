import { App } from "@/types/apps";

export const apps: App[] = [
  {
    id: "taskboard",
    name: "Task Board",
    description: "칸반 보드 스타일로 할 일 관리를 도와주는 앱입니다",
    icon: "MdCheckCircle",
    color: "bg-blue-100 text-blue-500",
  },
  {
    id: "timer",
    name: "Timer",
    description: "원하는 시간의 타이머를 설정하여 집중력을 높이는 앱입니다",
    icon: "MdTimer",
    color: "bg-violet-100 text-violet-500",
  },
  {
    id: "goalTracker",
    name: "Goal Tracker",
    description: "목표를 설정하고 추적할 수 있는 앱입니다",
    icon: "MdFlag",
    color: "bg-green-100 text-green-500",
  },
  {
    id: "moodTracker",
    name: "Mood Tracker",
    description: "기분을 기록하고 분석할 수 있는 앱입니다",
    icon: "MdMood",
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    id: "flowerPicks",
    name: "Flower Picks",
    description: "원하는 꽃말에 어울리는 꽃을 추천해주는 앱입니다",
    icon: "MdLocalFlorist",
    color: "bg-pink-100 text-pink-500",
  },
  {
    id: "memo",
    name: "Memo",
    description: "여러개의 메모를 작성하고 관리할 수 있는 앱입니다",
    icon: "MdNote",
    color: "bg-orange-100 text-orange-500",
  },
  {
    id: "randomPlan",
    name: "Random Plan",
    description: "원하는 시간과 방향을 입력하면 AI가 활동 플랜을 추천해주는 앱입니다",
    icon: "MdShuffle",
    color: "bg-teal-100 text-teal-500",
  },
];
