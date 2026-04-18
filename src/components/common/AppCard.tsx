"use client";

import Link from "next/link";
import { App } from "@/types/apps";
import * as MdIcons from "react-icons/md";

interface AppCardProps {
  app: App;
}

const AppCard = ({ app }: AppCardProps) => {
  const IconComponent = (MdIcons as any)[app.icon];

  return (
    <Link href={`/${app.id}`} className="inline-block">
      <div className="px-8 py-10 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer w-64 flex flex-col text-center items-center justify-center gap-4 bg-white">
        {IconComponent && (
          <div
            className={`${app.color} rounded-full p-4 text-4xl flex items-center justify-center`}
          >
            <IconComponent />
          </div>
        )}
        <h2 className="text-xl font-semibold line-clamp-2">{app.name}</h2>
        <p className="text-xs text-gray-500 line-clamp-2 break-keep">
          {app.description}
        </p>
      </div>
    </Link>
  );
};

export default AppCard;
