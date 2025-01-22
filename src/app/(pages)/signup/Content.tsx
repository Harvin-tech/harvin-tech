'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailIcon, UserIcon, LockIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { inputStyle } from '@/constants';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const splitName = (fullName: string) => {
    const names = fullName.trim().split(/\s+/);
    return {
      firstName: names[0] || '',
      middleName: names.length === 3 ? names[1] : '',
      lastName:
        names.length === 2 ? names[1] : names.length === 3 ? names[2] : '',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Manual form validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!validateEmail(formData.email)) {
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Please enter your password');
      return;
    }

    if (!validatePassword(formData.password)) {
      return;
    }

    // Split the name and format the data
    const { firstName, middleName, lastName } = splitName(formData.name);

    // Format the data to match API requirements
    const signupData = {
      firstName,
      middleName: middleName || undefined,
      lastName: lastName || undefined,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile ? parseInt(formData.mobile) : undefined,
    };

    const loadingToast = toast.loading('Creating your account...');
    setIsLoading(true);

    try {
      const res = await authService.signup(signupData);
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!');
      router.push('/login');
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || 'An error occurred during signup';
      setError(errorMessage);
      toast.dismiss(loadingToast);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-16 bg-background text-foreground ">
      <div className="text-center text-xl md:text-2xl pb-4 font-semibold tracking-tight">
        Create your account
      </div>
      <div className="max-w-sm md:max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-md border border-border">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          <div className="rounded-md space-y-3">
            {/* Full Name */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Full Name *</div>
                <input
                  name="name"
                  type="text"
                  className={inputStyle}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Email *</div>
                <input
                  name="email"
                  type="email"
                  className={inputStyle}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Mobile</div>
                <input
                  name="mobile"
                  type="tel"
                  className={inputStyle}
                  placeholder="Mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Password *</div>
                <input
                  name="password"
                  type="password"
                  className={inputStyle}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50"
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>

          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
