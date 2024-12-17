'use client'
import {
  FaChartLine,
  FaInbox,
  FaUserGraduate,
  FaBookOpen,
  FaUsers,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { IoSettingsSharp } from "react-icons/io5";
import { useState, useEffect } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarItems = [
    { icon: <FaChartLine />, label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: <FaInbox />, label: 'Inbox', href: '/dashboard/inbox', active: pathname === '/dashboard/inbox' },
    { icon: <FaUserGraduate />, label: 'Enrolment', href: '/dashboard/enrolment', active: pathname === '/dashboard/enrolment' },
    { 
      icon: <FaBookOpen />, 
      label: 'Manage Course', 
      href: '/dashboard/manage-course', 
      active: pathname === '/dashboard/manage-course',
      subItems: [
        { label: 'Add New Courses', href: '/dashboard/manage-course/add-new-course', active: pathname === '/dashboard/manage-course/all' },
        
      ]
    },
    { 
      icon: <FaUsers />, 
      label: 'Users', 
      href: '/dashboard/users', 
      active: pathname === '/dashboard/users',
      subItems: [
        { label: 'Admins', href: '/dashboard/users/admins', active: pathname === '/dashboard/users/admins' },
        { label: 'Instructors', href: '/dashboard/users/instructors', active: pathname === '/dashboard/users/instructors' },
        { label: 'Students', href: '/dashboard/users/students', active: pathname === '/dashboard/users/students' },
      ]
    },
    { icon: <FaUserCog />, label: 'Manage Profile', href: '/dashboard/manage-profile', active: pathname === '/dashboard/manage-profile' },
  ];

  if (!mounted) {
    return (
      <aside className="w-1/6 bg-background p-5 flex flex-col justify-between min-h-screen">
        <div>
          <div className="text-xl font-bold text-foreground flex items-center gap-2 mb-4">
            <div className="relative size-6">
              <Image src="/Images/dashboard/logo.png" alt="Harvin Logo" fill className="object-contain" />
            </div>
            <h2 className="text-xl font-bold text-foreground">HARVIN</h2>
          </div>
          <nav>
            <ul className="space-y-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <div className={`flex items-center space-x-2 transition-colors
                    ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                    {item.icon} <span>{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-1/6 bg-background p-5 flex flex-col justify-between min-h-screen">
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
                {item.subItems ? (
                  <div>
                    <div className="flex items-center justify-between w-full">
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-2 transition-colors flex-1
                          ${item.active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                      >
                        {item.icon} <span>{item.label}</span>
                      </Link>
                      <button
                        onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
                        className="p-1"
                      >
                        <MdOutlineKeyboardArrowRight className={`transform transition-transform duration-200 ${
                          expandedMenu === item.label ? 'rotate-90' : ''
                        }`} />
                      </button>
                    </div>
                    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      expandedMenu === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="ml-6 mt-2 space-y-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={`${index}-${subIndex}`}>
                            <Link
                              href={subItem.href}
                              className={`block transition-colors
                                ${subItem.active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 transition-colors
                      ${item.active ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    {item.icon} <span>{item.label}</span>
                  </Link>
                )}
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
