import { apps } from "@/data/apps";
import AppCard from "@/components/common/AppCard";

export default function Home() {
  return (
    <div className="mx-auto p-4 text-center">
      <p className="mb-8">바이브 코딩으로 만든 미니앱들을 만나보세요.</p>
      <div className="grid w-fit mx-auto grid-cols-3 gap-6 place-items-center">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
