import { enrollCourse, fetchUsers, getCourses } from "@/api";
import React, { useEffect, useState } from "react";
import EnrolmentHistory from "./EnrolmentHistory";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

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
  const [courses, setCourses] = useState<Array<{ value: string; label: string }>>([]);
  const [users, setUsers] = useState<Array<{ value: string; label: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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
        console.error("Error fetching users:", error);
        // toast.error("Something went wrong.");
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      try {
        const response = await getCourses();
        console.log(response,"inside enrolmentform")
        setCourses(
          response.data.courses.map((item: Course) => ({
            value: item._id,
            label: item.title,
          }))
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
        // toast.error("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleSubmit = async () => {
    // console.log(selectedCourse,"id id id")
    if (!selectedUser || !selectedCourse) {
      toast.error("Please select both a user and a course!");
      return;
    }
    

    try {
      setLoading(true);
      const response = await enrollCourse(selectedCourse, selectedUser);
      if (response.success) {
        toast.success("Enrollment successful!");
        setSelectedUser(null);
        setSelectedCourse(null);
      } else {
        toast.error("Enrollment failed! Please try again.");
      }
    } catch (error) {
      toast.error("Enrollment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-md p-4 mb-3">
        <h2 className="text-sm font-medium mb-2">Enrolment Form</h2>

        <div className="mb-3">
          <label htmlFor="users" className="block text-gray-700 font-medium mb-1 text-sm">
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
          <label htmlFor="course" className="block text-gray-700 font-medium mb-1 text-sm">
            Course to Enroll*
          </label>
          <Combobox
            items={courses}
            placeholder="Select a course..."
            selectedValue={selectedCourse}
            onSelect={(item) => setSelectedCourse(item?.value || null)}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedUser || !selectedCourse || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>

      <EnrolmentHistory />
    </div>
  );
};

export default EnrolmentForm;
