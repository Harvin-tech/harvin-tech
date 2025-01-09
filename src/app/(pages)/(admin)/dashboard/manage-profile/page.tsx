'use client';

import ProfilePage from '@/components/profile/Profile';
import React from 'react';

const ManageProfile = () => {
  return (
    <div>
      <ProfilePage isCreatingUser={false} />
    </div>
  );
};

export default ManageProfile;
