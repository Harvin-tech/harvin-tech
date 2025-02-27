import LeftSidebar from '@/components/dashboard/components/LeftSidebar';
import RightSidebar from '@/components/dashboard/components/RightSidebar';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen  mx-auto">
        <LeftSidebar />
        <main className="flex-1 overflow-y-auto max-w-screen-xl mx-auto">
          {children}
        </main>
        {/* <RightSidebar /> */}
      </div>
      <Footer />
    </>
  );
}
