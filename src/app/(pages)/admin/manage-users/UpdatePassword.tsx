'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MailIcon, UserIcon, LockIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { inputStyle } from '@/constants';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { nextApiClient } from '@/services/apiClient';
import { cn } from '@/lib/utils';

export default function UpdatePassword({
  userEmail,
  updatePassword,
  setUpdatePassword,
}: any) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userEmail) {
      toast.error('Please enter  email');
      return;
    }

    if (!formData.oldPassword.trim()) {
      toast.error('Please enter old  password');
      return;
    }

    if (!formData.newPassword.trim()) {
      toast.error('Please enter new password');
      return;
    }
    if (!formData.confirmPassword.trim()) {
      toast.error('Please enter confirm password');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New Password and Confirm Password should be same ');
      return;
    }

    // Format the data to match API requirements
    const passwordData = {
      email: userEmail,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    setIsLoading(true);

    try {
      const response = await nextApiClient.post(
        `/api/private/users/change-password`,
        passwordData
      );
      // const result = response.data.data;

      console.log(response, 'response');
      // return

      if (response.data.success) {
        toast.success(response.data.message || 'Password Udpated Successfully');
        setUpdatePassword(false);
      } else {
        toast.error(response.data.message || 'Something Went Wrong');
      }

      // console.log('updatePassword',response)
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || 'An error occurred during Creating';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('e',e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground   max-w-md ">
      <div className="w-full">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          <div className="rounded-md space-y-3">
            {/* Email */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Email *</div>
                <input
                  name="email"
                  type="email"
                  className={cn(inputStyle, 'opacity-40')}
                  placeholder="Email address"
                  value={userEmail}
                  disabled={true}
                />
              </div>
            </div>

            {/* old Password */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Old Password *
                </div>
                <input
                  name="oldPassword"
                  type="password"
                  className={inputStyle}
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* new password */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  New Password *
                </div>
                <input
                  name="newPassword"
                  type="New password"
                  className={inputStyle}
                  placeholder="Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* confirm password */}

            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Confirm Password *
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  className={inputStyle}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
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
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
}
