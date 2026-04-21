import { ReactNode } from "react";

interface AppLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <div className="px-4 py-12 text-center">
      <h1 className="text-3xl font-display mb-4">{title}</h1>
      {children}
    </div>
  );
}
