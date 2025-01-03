'use client';
import { appContent } from '@/constants/variants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from '@/api/services/authService';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const searchParams = useSearchParams();
  const courseId = searchParams?.get('course_id');


  // First, modify the route array definition:
  const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
  const userId = userData?.id;

  const route = [
    {
      title: 'Home',
      path: "/",
    },
    {
      title: 'Course',
      path: "/courses"
    },
    {
      title: 'Admin',
      path: "/dashboard",
      requiresAuth: true  // Add this flag to identify protected routes
    },
  ];

  useEffect(() => {
    // Check if user is logged in
    if (userId) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
      } else {
        toast.error("Something is error !")
      }

      setIsAuthenticated(false);
      setUser(null);
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error logging out');
      // Still set authenticated to false and clear user state
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const AuthenticatedDropdown = () => (
    <DropdownMenuContent>
      <DropdownMenuLabel>
        Welcome, {user?.firstName || 'User'}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/profile`} className="w-full">
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={`/dashboard`} className="w-full">
          Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  );

  const UnauthenticatedDropdown = () => (
    <DropdownMenuContent>
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/login" className="w-full">
          Log in
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/signup" className="w-full">
          Sign Up
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  return (
    <div className="sticky top-0 left-0 right-0 bg-background z-[20] h-[55px] sm:h-[67px] md:h-[83px] border-b border-border shadow-sm">
      <div className="lg:max-w-screen-xl lg:mx-auto flex justify-between items-center px-4 sm:px-6">
        <Link href={userId ? `/?user_id=${userId}` : "/"}>
          <div className="relative size-12 md:size-20">
            <Image
              className="absolute"
              fill
              src="/harvinlogo.jpg"
              alt="Harvin"
            />
          </div>
        </Link>

        <button
          className="lg:hidden text-3xl text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-background z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="p-6 space-y-8">
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl text-foreground"
              >
                <RiCloseLine />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-primary rounded-full">
                <RiAccountCircleLine className="text-4xl text-white" />
              </div>
              {isAuthenticated ? (
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="text-lg font-medium">
                    Welcome, {user?.firstName ? user.firstName : 'User'}
                  </div>
                  <Link
                    href={`/profile/?user_id=${userId}`}
                    className="w-full text-center py-3 px-4 text-base font-medium border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-3 px-4 text-base font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 w-full">
                  <Link
                    href="/login"
                    className="w-full text-center py-3 px-4 text-base font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full text-center py-3 px-4 text-base font-medium border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <ul className="space-y-6">
              {route.map((item, index) => (
                <Link
                  href={item.path}
                  key={index}
                  onClick={(e) => {
                    if (item.requiresAuth) {
                      e.preventDefault();
                      if (!userData) {
                        toast.error("Please login first to access dashboard");
                        let timeoutId = setTimeout(() => {
                         router.push('/login');
                        }, 1000);
                        return;
                      }
                      router.push(item.path);
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  <li className="text-lg font-medium text-foreground hover:text-primary transition-all duration-300 tracking-tight">
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="gap-6 items-center hidden lg:flex">
          <ul className="flex gap-6 text-xl">
            {route.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                onClick={(e) => {
                  if (item.requiresAuth) {
                    e.preventDefault(); // Prevent default navigation
                    if (!userData) {
                      toast.error("Please login first to access dashboard");
                      let timeoutId = setTimeout(() => {
                        router.push('/login');
                      }, 1000);
                      return;
                    }
                    router.push(item.path)
                  }
                }}
              >
                <li className="text-foreground hover:text-primary transition-all duration-300 tracking-tight text-lg">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex items-center gap-4 bg-primary rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 flex justify-center items-center outline-none">
                <RiAccountCircleLine className="text-2xl text-white" />
              </DropdownMenuTrigger>
              {isAuthenticated ? (
                <AuthenticatedDropdown />
              ) : (
                <UnauthenticatedDropdown />
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
