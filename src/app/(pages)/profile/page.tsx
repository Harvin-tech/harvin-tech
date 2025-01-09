import LeftSidebar from '@/components/dashboard/components/LeftSidebar';
import ProfilePage from '@/components/profile/Profile';
import React from 'react';

const page = () => {
  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <main className="flex-1 overflow-y-auto max-w-screen-xl mx-auto">
        <ProfilePage isCreatingUser={false} />
      </main>
    </div>
  );
};

export default page;
