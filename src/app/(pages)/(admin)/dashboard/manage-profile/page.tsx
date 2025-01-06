'use client';

import ProfilePage from '@/app/(pages)/(component)/Profile';
import React from 'react';

const ManageProfile = () => {
  return (
    <div>
      <ProfilePage isCreatingUser={false} />
    </div>
  );
};

export default ManageProfile;
