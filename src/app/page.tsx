import { apps } from "@/data/apps";
import AppCard from "@/components/common/AppCard";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <p className="mb-8">바이브 코딩으로 만든 미니앱들을 만나보세요.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
