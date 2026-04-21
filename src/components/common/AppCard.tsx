"use client";

import Link from "next/link";
import React from "react";
import { App } from "@/types/apps";
import * as MdIcons from "react-icons/md";

interface AppCardProps {
  app: App;
}

const AppCard = ({ app }: AppCardProps) => {
  const IconComponent = (MdIcons as Record<string, React.ComponentType>)[app.icon];

  return (
    <Link href={`/${app.id}`} className="inline-block">
      <div
        style={{ "--card-shadow": app.shadowColor } as React.CSSProperties}
        className="px-8 h-60 rounded-2xl border-2 border-(--card-shadow) [box-shadow:5px_5px_0px_var(--card-shadow)] hover:[box-shadow:7px_7px_0px_var(--card-shadow)] hover:-translate-y-1 hover:rotate-1 transition-all duration-150 cursor-pointer w-64 flex flex-col text-center items-center justify-center gap-4 bg-white"
      >
        {IconComponent && (
          <div
            className={`${app.color} rounded-full p-4 text-4xl flex items-center justify-center`}
          >
            <IconComponent />
          </div>
        )}
        <h2 className="text-xl font-display line-clamp-2">{app.name}</h2>
        <p className="text-xs text-gray-500 line-clamp-2 break-keep">
          {app.description}
        </p>
      </div>
    </Link>
  );
};

export default AppCard;
