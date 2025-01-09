'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, UserCog } from 'lucide-react';
import apiClient from '@/services/apiClient';
import { getUser_I } from '@/types/user.types';
import { useParams, useRouter } from 'next/navigation';

const CourseIdPage = () => {
  const [courseUser, setCourseUser] = useState<any[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<getUser_I | null>(null);

  const router = useRouter();

  const pathname = useParams();

  const form = useForm<getUser_I>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      mobile: undefined,
      status: 'active',
      role: '',
    },
  });

  const handleEdit = (user: getUser_I) => {
    setSelectedUser(user);
    form.reset(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: getUser_I) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    //   if (selectedUser) {
    //     setUsers(users.filter((user) => user._id !== selectedUser._id));
    //     setIsDeleteDialogOpen(false);
    //     setSelectedUser(null);
    //   }
  };

  const toggleAdminStatus = (userId: string) => {
    //   setUsers(
    //     users.map((user) =>
    //       user._id === userId
    //         ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
    //         : user
    //     )
    //   );
  };

  const toggleUserStatus = (userId: string) => {
    //   setUsers(
    //     users.map((user) =>
    //       user._id === userId
    //         ? {
    //             ...user,
    //             status: user.status === 'active' ? 'inactive' : 'active',
    //           }
    //         : user
    //     )
    //   );
  };

  const onSubmit = (data: getUser_I) => {
    if (selectedUser) {
      // setUsers(
      //   users.map((user) =>
      //     user._id === selectedUser._id ? { ...data, id: user._id } : user
      //   )
      // );
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const getAllUsersOfCourse = async (courseId: string) => {
    try {
      const { data } = await apiClient.get(
        `${process.env.NEXT_PUBLIC_API_URL}/private/courses/enroll/${courseId}`
      );
      console.log(data.data);
      setCourseUser(data.data.students);
    } catch (error) {
      console.log(error);

      return;
    }
  };

  //   console.log('weefef', users);
  useEffect(() => {
    getAllUsersOfCourse(pathname.courseId as string);
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Students enroll in {courseUser[0]?.title || 'AI'}
      </h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[200px]">Address</TableHead>
              <TableHead className="w-[150px]">Phone</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Enrolled at</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseUser?.map((st, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{`${st.user.firstName || '-'} ${st.user.middleName || ''}  ${st.user.lastName || ''} `}</TableCell>
                <TableCell>{st.user.email}</TableCell>
                <TableCell>{st.user.address ?? '-'}</TableCell>
                <TableCell>{st.user.mobile ?? '-'}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      st.user.status === 'active' ? 'default' : 'secondary'
                    }
                    className="cursor-pointer"
                    onClick={() => toggleUserStatus(st.user._id)}
                  >
                    <span
                      className={`${st.user.status === 'active' ? 'text-white' : ''}`}
                    >
                      {st.user.status}
                    </span>
                  </Badge>
                </TableCell>

                <TableCell>{st.enrolledAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className=" max-w-[300px] sm:max-w-[400px] mt-10 h-[420px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="text-white">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <div className="py-4">Are you sure you want to delete this user?</div>
          <DialogFooter className="sm:justify-end">
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseIdPage;
