'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Camera, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Type definitions
interface ProfilePageProps {
  isCreatingUser: boolean;
}

interface User {
  name: string;
  email: string;
  mobileNumber?: string;
  address?: string;
  profileImage?: string;
  role?: string;
}

// Validation schema for profile form
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: 'Invalid mobile number',
    }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

// Validation schema for password form
const adminPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

const userPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ProfilePage = ({ isCreatingUser }: ProfilePageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Profile form setup
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      mobileNumber: '',
      address: '',
    },
  });

  // Password form setup
  const passwordForm = useForm({
    resolver: zodResolver(
      isCreatingUser ? adminPasswordSchema : userPasswordSchema
    ),
    defaultValues: isCreatingUser
      ? { newPassword: '' }
      : { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  // Load user data on mount (if not creating user)
  useEffect(() => {
    if (!isCreatingUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        profileForm.reset({
          name: parsedUser.name,
          email: parsedUser.email,
          mobileNumber: parsedUser.mobileNumber || '',
          address: parsedUser.address || '',
        });
        if (parsedUser.profileImage) {
          setProfileImage(parsedUser.profileImage);
        }
      }
    }
  }, [isCreatingUser, profileForm]);

  // Handle profile submit
  const handleProfileSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || 'Error updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImageLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/user/profile-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const { imageUrl } = await response.json();
      setProfileImage(imageUrl);

      if (user) {
        const updatedUser = { ...user, profileImage: imageUrl };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      toast.success('Profile image updated successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || 'Error uploading image');
    } finally {
      setImageLoading(false);
    }
  };

  // Handle password submit
  const handlePasswordSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          isCreatingUser,
        }),
      });

      if (!response.ok) throw new Error('Failed to update password');

      passwordForm.reset();
      toast.success('Password updated successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || 'Error updating password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`max-w-screen-xl mx-auto ${isCreatingUser ? 'p-0' : 'p-4'}`}
    >
      <div className="space-y-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isCreatingUser ? 'Create User' : 'Profile Settings'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isCreatingUser
              ? 'Fill out the details to create a new user.'
              : 'Manage your account settings and profile information.'}
          </p>
        </div>
        <Separator />

        {/* Profile Image Section */}
        <Card className="border-none shadow-none ">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Profile Image</CardTitle>
            <CardDescription>
              This will be displayed on your profile and in your courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="relative size-24 rounded-full overflow-hidden bg-muted">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <Camera className="size-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                    <Loader2 className="size-5 text-white animate-spin" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="max-w-xs"
                  disabled={imageLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: Square JPG, PNG. Max 2MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Personal Information Section */}
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                className="space-y-4 max-w-md"
              >
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isCreatingUser && (
                  <>
                    <FormField
                      control={profileForm.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your mobile number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="text-white"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Separator />

        {/* Password Section */}
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {isCreatingUser ? 'Set Password' : 'Update Password'}
            </CardTitle>
            <CardDescription>
              {isCreatingUser
                ? 'Set a password for your new account.'
                : 'Change your password if you want to update it.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                className="space-y-4 max-w-md"
              >
                {!isCreatingUser && (
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Enter your current password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter your new password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isCreatingUser && (
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="Confirm your new password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="text-white"
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Save Password
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
