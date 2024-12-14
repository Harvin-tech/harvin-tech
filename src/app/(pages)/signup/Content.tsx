'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailIcon, UserIcon, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { inputStyle } from '@/constants';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-16 bg-background text-foreground mt-[83px]">
      <div className="text-center text-xl md:text-2xl pb-4 font-semibold tracking-tight">
        Create your account
      </div>
      <div className="max-w-sm md:max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-md border border-border">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          <div className="rounded-md space-y-3">
            <div className="relative">
              <div className="absolute z-10 inset-y-0 left-0 top-5 pl-3 flex items-center pointer-events-none">
                <UserIcon
                  className="h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                />
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Name</div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className={inputStyle}
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute z-10 inset-y-0 left-0 top-6 pl-3 flex items-center pointer-events-none">
                <MailIcon
                  className="h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                />
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Email</div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputStyle}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 z-10 left-0 top-[-5px] pl-3 flex items-center pointer-events-none">
                <LockIcon
                  className="h-5 w-5 text-muted-foreground"
                  strokeWidth={2}
                />
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Password</div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={inputStyle}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary/90"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
            >
              Sign up
            </button>
          </div>

          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
