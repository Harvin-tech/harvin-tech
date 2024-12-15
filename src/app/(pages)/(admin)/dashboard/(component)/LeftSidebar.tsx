'use client'
import {
  FaChartLine,
  FaInbox,
  FaUserGraduate,
  FaBookOpen,
  FaUsers,
  FaUserCog,
  FaSignOutAlt
} from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { IoSettingsSharp } from "react-icons/io5";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarItems = [
    { icon: <FaChartLine />, label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: <FaInbox />, label: 'Inbox', href: '/dashboard/inbox', active: pathname === '/dashboard/inbox' },
    { icon: <FaUserGraduate />, label: 'Enrolment', href: '/dashboard/enrolment', active: pathname === '/dashboard/enrolment' },
    { icon: <FaBookOpen />, label: 'Manage Course', href: '/dashboard/manage-course', active: pathname === '/dashboard/manage-course' },
    { icon: <FaUsers />, label: 'Users', href: '/dashboard/users', active: pathname === '/dashboard/users' },
    { icon: <FaUserCog />, label: 'Manage Profile', href: '/dashboard/manage-profile', active: pathname === '/dashboard/manage-profile' },
  ];

  return (
    <aside className="w-1/6 h-screen bg-background p-5 flex flex-col justify-between">
      <div>
        <div className="text-xl font-bold  text-foreground flex items-center gap-2 mb-4">
          <div className="relative size-6">

            <Image src="/Images/dashboard/logo.png" alt="Harvin Logo" fill className="object-contain" />
          </div>
          <h2 className="text-xl font-bold  text-foreground">HARVIN</h2>
        </div>
        <nav>
          <ul className="space-y-4">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 transition-colors
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
        <button
          className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <IoSettingsSharp />  <span>Settings</span>
        </button>
        <button
          className="flex items-center space-x-2 text-destructive font-medium hover:text-destructive/90 transition-colors"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
