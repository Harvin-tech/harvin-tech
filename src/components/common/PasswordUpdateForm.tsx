'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { nextApiClient } from '@/services/apiClient';
import { cn } from '@/lib/utils';

interface PasswordUpdateFormProps {
  userEmail: string;
  isAdmin?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

export default function PasswordUpdateForm({
  userEmail,
  isAdmin = false,
  onSuccess,
  onCancel,
  className,
}: PasswordUpdateFormProps) {
  const [formData, setFormData] = useState({
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
      toast.error('Please enter email');
      return;
    }

    // Only require old password if not admin
    if (!isAdmin && !formData.oldPassword.trim()) {
      toast.error('Please enter old password');
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
      toast.error('New Password and Confirm Password should be same');
      return;
    }

    // Format the data to match API requirements
    const passwordData = {
      email: userEmail,
      oldPassword: isAdmin ? undefined : formData.oldPassword,
      newPassword: formData.newPassword,
    };

    setIsLoading(true);

    try {
      const response = await nextApiClient.post(
        `/api/private/users/change-password`,
        passwordData
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Password Updated Successfully');

        // Reset form
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.data.message || 'Something Went Wrong');
      }
    } catch (err: any) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message ||
        'An error occurred during password update';
      setError(errorMessage);
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

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center bg-background text-foreground max-w-md',
        className
      )}
    >
      <div className="w-full">
        <form className="mt-6 space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}

          <div className="rounded-md space-y-3">
            {/* Email Display */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Email *</div>
                <input
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 opacity-40"
                  placeholder="Email address"
                  value={userEmail}
                  disabled={true}
                />
              </div>
            </div>

            {/* Old Password - Only show if not admin */}
            {!isAdmin && (
              <div className="relative">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Old Password *
                  </div>
                  <input
                    name="oldPassword"
                    type="password"
                    className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            {/* New password */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  New Password *
                </div>
                <input
                  name="newPassword"
                  type="password"
                  className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Confirm Password *
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-input text-sm font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50"
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
