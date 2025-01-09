import React from 'react';

import LeftSidebar from '@/components/dashboard/components/LeftSidebar';
import StudentDashboard from '@/components/dashboard/dashboard';
import Dashboard from '@/components/dashboard/dashboard';

const page = () => {
  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto max-w-screen-xl mx-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default page;
