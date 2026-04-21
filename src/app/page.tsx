import { apps } from "@/data/apps";
import AppCard from "@/components/common/AppCard";

export default function Home() {
  return (
    <div className="mx-auto px-4 py-12 text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-display mb-3">미니앱 모음</h2>
        <p className="text-gray-500">
          바이브 코딩으로 만든 미니앱들을 만나보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-fit mx-auto">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
