import React from 'react';
import Link from 'next/link';
import { App } from '@/types/apps';

interface AppCardProps {
  app: App;
}

const AppCard = ({ app }: AppCardProps) => {
  return (
    <Link href={`/${app.id}`}>
      <div className="p-4 border rounded shadow cursor-pointer hover:shadow-lg transition-shadow min-h-[200px] flex flex-col">
        <h2 className="text-xl font-semibold">{app.name}</h2>
        <p className="flex-1">{app.description}</p>
      </div>
    </Link>
  );
};

export default AppCard;