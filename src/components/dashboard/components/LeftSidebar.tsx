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
import { TfiArrowCircleRight } from 'react-icons/tfi';
import { IoSettingsSharp } from 'react-icons/io5';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { authService } from '@/services';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authSlice';
import { GrCertificate } from 'react-icons/gr';

const LeftSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      toast.success('Logged out successfully');
      window.location.href = '/';
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Error logging out');
    }
  };

  const studentSidebarItems = [
    {
      icon: <FaChartLine />,
      label: 'Dashboard',
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      icon: <FaUserCog />,
      label: 'Profile',
      href: '/dashboard/profile',
      active: pathname === '/dashboard/profile',
    },
    {
      icon: <FaBookOpen />,
      label: 'Python',
      href: '/dashboard/python',
      active: pathname === '/dashboard/python',
    },
    {
      icon: <FaBookOpen />,
      label: 'Nanoscience',
      href: '/dashboard/nanoscience',
      active: pathname === '/dashboard/nanoscience',
    },
    {
      icon: <GrCertificate />,
      label: 'Certificate',
      href: '/dashboard/certificates',
      active: pathname === '/dashboard/certificates',
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
      icon: <FaUserCog />,
      label: 'Quiz Dashboard',
      href: '/admin/dashboard/quiz',
      active: pathname === '/admin/dashboard/quiz',
    },
    {
      icon: <FaUserGraduate />,
      label: 'Enrolment',
      href: '/admin/enrolment',
      active: pathname === '/admin/enrolment',
    },
    // {
    //   icon: <FaBookOpen />,
    //   label: 'Manage Course',
    //   href: '/admin/manage-course',
    //   active: pathname === '/admin/manage-course',
    // },
    {
      icon: <FaUsers />,
      label: 'Manage Users',
      href: '/admin/manage-users',
      active: pathname === '/admin/manage-users',
    },
    {
      icon: <FaUserCog />,
      label: 'Manage Profile',
      href: '/dashboard/profile',
      active: pathname === '/dashboard/profile',
    },
  ];

  const sidebarItems =
    currentUser?.role === 'admin' ? adminSidebarItems : studentSidebarItems;

  return (
    <div className="min-h-[100vh] flex">
      {/* Main sidebar container */}
      <div
        className={`
          lg:sticky lg:top-[83px] h-[calc(100vh-43px)]
          fixed top-[55px] md:top-[83px] left-0 
          transition-transform duration-300 ease-in-out transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 z-[990]
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-2 -right-8 z-[1000] lg:hidden bg-white p-2 rounded-r-xl 
            shadow-md hover:shadow-lg transition-all duration-300 group`}
        >
          <TfiArrowCircleRight
            size={18}
            className={`text-primary group-hover:scale-110 transition-all duration-300
              ${isOpen ? 'rotate-180 text-destructive' : ''}`}
          />
        </button>

        {/* Sidebar Content */}
        <aside className="w-[210px] xl:w-[250px] bg-card p-4 shadow-lg h-full overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Logo and Navigation */}
            <div>
              <div className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
                <div className="relative size-6">
                  <Image
                    src="/images/dashboard/logo.png"
                    alt="Harvinn Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-lg font-bold text-foreground">HARVINN</h2>
              </div>

              <nav className="flex-grow">
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

            {/* Settings and Logout */}
            <div className="mt-auto pt-8 space-y-4 text-base">
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <IoSettingsSharp /> <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-destructive font-medium hover:text-destructive/90 transition-colors"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[985] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LeftSidebar;
