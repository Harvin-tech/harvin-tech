'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { inputStyle } from '@/constants';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/authSlice';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    const loadingToast = toast.loading('Signing in...');
    setIsLoading(true);

    try {
      const res = await authService.login(formData);

      dispatch(loginSuccess(res.data.user));
      toast.dismiss(loadingToast);
      toast.success('Signed in successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || 'Invalid email or password';
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-16 bg-background text-foreground">
      <div className="text-center text-xl md:text-2xl pb-4 font-semibold tracking-tight">
        Sign in to your account
      </div>
      <div className="max-w-sm md:max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-md border border-border">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          <div className="rounded-md space-y-3">
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
                {/* <div className="text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary/90"
                  >
                    Forgot your password?
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
