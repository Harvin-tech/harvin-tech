'use client';
import {
  FaChartLine,
  FaInbox,
  FaUserGraduate,
  FaBookOpen,
  FaUsers,
  FaUserCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { TfiArrowCircleRight } from "react-icons/tfi";
import { IoSettingsSharp } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { authService } from '@/api';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user: currentUser } = useSelector((state: any) => state.auth);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Error logging out');
    }
  };

  const studentSidebarItems = [
    {
      icon: <FaChartLine />,
      label: 'Dashboard',
      href: '/dashboard-info',
      active: pathname === '/dashboard',
    },
    {
      icon: <FaUserCog />,
      label: 'Profile',
      href: '/profile',
      active: pathname === '/dashboard/profile',
    },
    {
      icon: <FaBookOpen />,
      label: 'All Courses',
      href: '/all-course',
      active: pathname === '/dashboard/all-courses',
    },
  ];

  const adminSidebarItems = [
    {
      icon: <FaChartLine />,
      label: 'Dashboard',
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      icon: <FaUserGraduate />,
      label: 'Enrolment',
      href: '/dashboard/enrolment',
      active: pathname === '/dashboard/enrolment',
    },
    {
      icon: <FaBookOpen />,
      label: 'Manage Course',
      href: '/dashboard/manage-course',
      active: pathname === '/dashboard/manage-course',
    },
    {
      icon: <FaUsers />,
      label: 'Users',
      href: '/dashboard/users',
      active: pathname === '/dashboard/users',
    },
    {
      icon: <FaUserCog />,
      label: 'Manage Profile',
      href: '/dashboard/manage-profile',
      active: pathname === '/dashboard/manage-profile',
    },
  ];

  const sidebarItems = currentUser?.role === 'admin' ? adminSidebarItems : studentSidebarItems;

  //fixed issue with hydration error

  

  return (
    <>
      {/* Toggle Button for mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-[62px] md:top-[85px] left-[-2px]  z-[60]   lg:hidden"
      >
        <TfiArrowCircleRight size={15} className={`text-gray-900 ${isOpen ? 'rotate-180 ml-[245px] transition-all duration-300' : ''}`}  />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed min-h-screen w-[250px] bg-white p-4 shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out z-[50]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:sticky`}
      >
        <div>
          <div className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
            <div className="relative size-6">
              <Image
                src="/Images/dashboard/logo.png"
                alt="Harvin Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-bold text-foreground">HARVIN</h2>
          </div>
          
          <nav>
            <ul className="space-y-4 whitespace-nowrap">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 transition-colors text-base 
                      ${item.active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    {item.icon} <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 space-y-4">
          <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm">
            <IoSettingsSharp /> <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-destructive font-medium hover:text-destructive/90 transition-colors text-sm"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>

        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0  z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </aside>
    </>
  );
};

export default Sidebar;