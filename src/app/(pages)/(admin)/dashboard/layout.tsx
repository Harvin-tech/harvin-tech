import React from 'react'
import LeftSidebar from './(component)/LeftSidebar';
import RightSidebar from './(component)/RightSidebar';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex'>
        <LeftSidebar />
        <div className='flex-1'>
            {children}
        </div>
        <RightSidebar />
    </div>
  )
}

export default DashboardLayout;
