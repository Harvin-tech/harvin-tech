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
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoSettingsSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { authService } from '@/api';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { user: currentUser } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   setMounted(true);
  //   // Get user from localStorage on component mount
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setUser(parsedUser);
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Error logging out');
      setIsAuthenticated(false);
      setUser(null);
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
      href: '/dashboard-info/profile',
      active: pathname === '/dashboard/profile',
    },
    {
      icon: <FaBookOpen />,
      label: 'All Courses',
      href: '/dashboard-info/all-course',
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

  // Determine which sidebar items to show based on user role
  const sidebarItems =
    currentUser?.role === 'admin' ? adminSidebarItems : studentSidebarItems;

  if (!mounted) {
    return (
      <aside className="sticky top-[83px] h-screen w-[210px] xl:w-[250px] bg-card p-4 shadow-lg hidden xl:block overflow-y-auto">
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
            <h2 className="text-xl font-bold text-foreground">HARVIN</h2>
          </div>
          <nav>
            <ul className="space-y-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 transition-colors 
                    ${item.active ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {item.icon} <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sticky top-[83px] h-screen w-[210px] xl:w-[250px] bg-card p-4 shadow-lg hidden xl:block overflow-y-auto">
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

      <div className="space-y-4">
        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors ">
          <IoSettingsSharp /> <span>Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-destructive font-medium hover:text-destructive/90 transition-colors text-sm"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
