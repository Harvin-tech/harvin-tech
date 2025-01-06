import React from 'react';
import RightSidebar from '../../(admin)/dashboard/(component)/RightSidebar';
import LeftSidebar from '../../(admin)/dashboard/(component)/LeftSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <RightSidebar />
    </div>
  );
}
