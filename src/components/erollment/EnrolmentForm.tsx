import { enrollCourse, fetchUsers, getCourses } from '@/services';
import React, { useEffect, useState } from 'react';
import EnrolmentHistory from './EnrolmentHistory';
import { toast } from 'sonner';
import { Combobox } from '@/components/ui/combobox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProfilePage from '@/components/profile/Profile';

interface User {
  _id: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
}

const EnrolmentForm: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [users, setUsers] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  async function getUsers() {
    try {
      const response = await fetchUsers();
      setUsers(
        response.data.users.map((item: User) => ({
          value: item._id,
          label: item.email,
        }))
      );
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async function fetchCourses() {
    setLoading(true);
    try {
      const response = await getCourses();
      console.log(response, 'inside enrolmentform');
      setCourses(
        response.data.courses.map((item: Course) => ({
          value: item._id,
          label: item.title,
        }))
      );
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
    fetchCourses();
  }, []);

  const handleEnrollSubmit = async () => {
    if (!selectedUser || !selectedCourse) {
      toast.error('Please select both a user and a course!');
      return;
    }

    try {
      setLoading(true);
      const response = await enrollCourse(selectedCourse, selectedUser);
      if (response.status === 200) {
        toast.success('Enrollment successful!');
        setSelectedUser(null);
        setSelectedCourse(null);
      } else {
        toast.error('Enrollment failed! Please try again.');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response.data.message || 'Enrollment failed! Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4 mb-3">
        <h2 className="text-sm font-medium mb-2">Enrolment Form</h2>

        <div className="mb-3">
          <label
            htmlFor="users"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Users*
          </label>
          <Combobox
            items={users}
            placeholder="Search for a user..."
            selectedValue={selectedUser}
            onSelect={(item) => setSelectedUser(item?.value || null)}
          />
        </div>

        <div>
          <label
            htmlFor="course"
            className="block text-gray-700 font-medium mb-1 text-sm"
          >
            Course to Enroll*
          </label>
          <Combobox
            items={courses}
            placeholder="Select a course..."
            selectedValue={selectedCourse}
            onSelect={(item) => setSelectedCourse(item?.value || null)}
          />
        </div>

        <div className="mt-4 space-x-2">
          <button
            onClick={handleEnrollSubmit}
            disabled={!selectedUser || !selectedCourse || loading}
            className="px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-md disabled:bg-gray-300 text-sm"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-md text-sm transition-colors duration-300">
                Create user
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] h-[80vh] mt-8  overflow-y-auto">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              {/* Form fields for creating a user */}
              <ProfilePage isCreatingUser={true} />
              {/* <DialogFooter>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-300 mt-2 md:mt-0"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // toast.success("User created successfully!");
                    setIsDialogOpen(false);
                  }}
                  className="px-4 py-2 bg-primary/90 hover:bg-primary text-white rounded-md text-sm"
                >
                  Create
                </button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <EnrolmentHistory />
    </div>
  );
};

export default EnrolmentForm;
