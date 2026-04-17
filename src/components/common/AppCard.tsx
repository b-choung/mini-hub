"use client";

import React from "react";
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
      <div className="px-8 py-10 border rounded-2xl shadow cursor-pointer hover:shadow-lg transition-shadow w-64 flex flex-col text-center items-center justify-center gap-4">
        <h2 className="text-xl font-semibold line-clamp-2">{app.name}</h2>
        {IconComponent && (
          <div className="text-5xl">
            <IconComponent />
          </div>
        )}
        <p className="text-sm text-gray-600 line-clamp-2 break-keep">
          {app.description}
        </p>
      </div>
    </Link>
  );
};

export default AppCard;
