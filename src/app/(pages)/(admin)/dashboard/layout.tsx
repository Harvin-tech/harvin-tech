import React from 'react'
import LeftSidebar from './(component)/LeftSidebar';
import RightSidebar from './(component)/RightSidebar';

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
