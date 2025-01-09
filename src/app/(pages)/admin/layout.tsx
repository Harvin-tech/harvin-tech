import LeftSidebar from '@/components/dashboard/components/LeftSidebar';
import RightSidebar from '@/components/dashboard/components/RightSidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto max-w-screen-xl mx-auto">
        {children}
      </main>
      {/* <RightSidebar /> */}
    </div>
  );
}
