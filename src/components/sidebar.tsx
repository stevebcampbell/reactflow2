'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'HaloMap', href: '/halomap', icon: '🗺️' },
  { name: 'Flow Demo', href: '/flow', icon: '🔄' },
  { name: 'Components', href: '/components', icon: '🎨' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tools
          </h2>
          <div className="space-y-1">
            <Link
              href="/about"
              className={cn(
                'flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground',
                pathname === '/about'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <span className="text-lg">ℹ️</span>
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
