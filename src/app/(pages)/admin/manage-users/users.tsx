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
  DialogTrigger,
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
import { Eye, Pencil, Trash2, UserCog } from 'lucide-react';
import apiClient from '@/services/apiClient';
import { getUser_I } from '@/types/user.types';
import { useRouter } from 'next/navigation';
import CreateUser from '@/components/users/create-user';

const Users = () => {
  const [users, setUsers] = useState<getUser_I[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<getUser_I | null>(null);

  const router = useRouter();

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
    if (selectedUser) {
      setUsers(users.filter((user) => user._id !== selectedUser._id));
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const toggleAdminStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user._id === userId
          ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
          : user
      )
    );
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user._id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active',
            }
          : user
      )
    );
  };

  const onSubmit = (data: getUser_I) => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user._id === selectedUser._id ? { ...data, id: user._id } : user
        )
      );
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const getAllusers = async () => {
    try {
      const { data } = await apiClient.get(`/api/private/users`);

      setUsers(data.data.users);
    } catch (error) {
      console.log(error);

      return;
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="w-full flex justify-end">
        {/* TODO : Create User and EDIT USER Do in SAME COMPONENT */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-md text-sm transition-colors duration-300">
              Create user
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[600px] h-[70vh] mt-8  overflow-y-auto">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            {/* Form fields for creating a user */}
            <CreateUser />
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[200px]">Address</TableHead>
              <TableHead className="w-[150px]">Phone</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[100px]">Admin</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{`${user.firstName || '-'} ${user.middleName || ''}  ${user.lastName || ''} `}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address ?? '-'}</TableCell>
                <TableCell>{user.mobile ?? '-'}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => toggleUserStatus(user._id)}
                  >
                    <span
                      className={`${user.status === 'active' ? 'text-white' : ''}`}
                    >
                      {user.status}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant={user.role === 'admin' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleAdminStatus(user._id)}
                  >
                    <UserCog
                      className={`h-4 w-4 mr-1 ${user.role === 'admin' ? 'text-white' : ''}`}
                    />
                    {user.role === 'admin' ? (
                      <span className="text-white">Admin</span>
                    ) : (
                      'User'
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/manage-users/${user._id}`)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    O
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
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

export default Users;
