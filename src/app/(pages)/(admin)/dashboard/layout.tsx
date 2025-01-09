import React from 'react';
import LeftSidebar from '../../../../components/dashboard-home/LeftSidebar';
import RightSidebar from '../../../../components/dashboard-home/RightSidebar';

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
      <RightSidebar />
    </div>
  );
}
