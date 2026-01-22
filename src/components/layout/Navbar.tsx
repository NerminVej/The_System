'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Target, TrendingUp, Heart, Settings, Home } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/quests', label: 'Quests', icon: Target },
  { href: '/habits', label: 'Habits', icon: Heart },
  { href: '/stats', label: 'Stats', icon: TrendingUp },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-sl-cyan/20 bg-sl-black-light shadow-glow-cyan">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">The System</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                    isActive
                      ? 'bg-sl-cyan/10 text-sl-cyan border border-sl-cyan/50 shadow-glow-cyan'
                      : 'text-muted-foreground hover:text-foreground hover:bg-sl-black-lighter hover:border hover:border-sl-cyan/20'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
