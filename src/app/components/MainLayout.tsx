import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }} className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] mt-[56px] p-6 max-w-[1440px]">
        {children}
      </main>
    </div>
  );
}
