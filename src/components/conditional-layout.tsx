'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isHaloMap = pathname === '/halomap';

  if (isHaloMap) {
    // HaloMap has its own sidebar, so no global sidebar
    return <main className="min-h-screen">{children}</main>;
  }

  // Other pages use the global sidebar
  return (
    <div className="flex">
      <div className="hidden md:block fixed left-0 top-14 h-[calc(100vh-3.5rem)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Sidebar />
      </div>
      <main className="flex-1 md:ml-64 min-h-screen">{children}</main>
    </div>
  );
}
