'use client';

import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-4xl font-bold gradient-text mb-8">Dashboard</h1>
      <DashboardOverview />
    </div>
  );
}
