'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserCourse, updateCourse } from "@/api";
import CourseFilters from "./CourseFilters";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import StudentProfile from "./StudentProfile";

interface Course {
  id: string;
  title: string;
  status: "lock" | "unlock";
  price?: string;
  desc?: string;
  instructor?: string;
  rating?: number;
  reviewsCount?: number;
  category?: string;
}

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    instructor: "all",
    price: "all",
    search: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async (userId: string) => {
      try {
        setLoading(true);
        const response = await getUserCourse(userId);
        const userCourses = response.data.courses.map((item: any) => ({
          id: item?.courseId,
          title: item?.courseDetails?.title || "No Title",
          category: item?.courseDetails?.category || "No Category",
          status: item?.courseDetails?.status || "lock",
          price: item?.courseDetails?.price || "N/A",
          desc: item?.courseDetails?.description || "No Description",
          instructor: item?.courseDetails?.instructor || "Unknown Instructor",
          rating: item?.courseDetails?.rating || 0,
          reviewsCount: item?.courseDetails?.reviewsCount || 0,
        }));

        setCourses(userCourses);
        setFilteredCourses(userCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error Loading Courses", {
          description: "Failed to load courses. Please try again.",
          className: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;

    if (!userData) {
      toast.error("Authentication Required", {
        description: "Please log in to view courses.",
        className: "destructive",
      });
      router.push("/login");
    } else {
      fetchCourses(userData._id);
    }
  }, [router]);

  const applyFilters = () => {
    const filtered = courses.filter((course) => {
      const matchesCategory =
        filters.category === "all" || course.category === filters.category;
      const matchesStatus =
        filters.status === "all" || course.status === filters.status;
      const matchesInstructor =
        filters.instructor === "all" || course.instructor === filters.instructor;
      const matchesPrice =
        filters.price === "all" || course.price === filters.price;
      const matchesSearch =
        filters.search === "" ||
        course.title.toLowerCase().includes(filters.search.toLowerCase());

      return (
        matchesCategory &&
        matchesStatus &&
        matchesInstructor &&
        matchesPrice &&
        matchesSearch
      );
    });


    setFilteredCourses(filtered);
    toast.success("Filters Applied", {
      description: `Showing ${filtered.length} of ${courses.length} courses`,
      className: "bg-blue-50 border-blue-200",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();

    setFilters((prevFilters) => ({
      ...prevFilters,
      search: query,
    }));

    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query) ||
        course.instructor?.toLowerCase().includes(query)
    );

    setFilteredCourses(filtered);
  };

  const handleLockCourse = async (courseId: string, newStatus: string, courseTitle: string, category: string, description: string) => {
    try {
      const payload = {
        status: newStatus === "Lock" ? 0 : 1,
        title: courseTitle,
        category: category,
        description: description
      };

      const response = await updateCourse(courseId, payload);


      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? { ...course, status: newStatus === "Lock" ? "lock" : "unlock" }
            : course
        )
      );
      window.location.reload();

      toast.success("Course Updated Successfully", {
        description: `${courseTitle} has been ${newStatus.toLowerCase()}ed`,
        className: "bg-green-50 border-green-200",
      });

      setSelectedCourse(null);
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Update Failed", {
        description: `Failed to ${newStatus.toLowerCase()} ${courseTitle}`,
        className: "destructive",
      });
    } finally {
      setSelectedCourse(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 ">
      <StudentProfile
        name="Harvin"
        email="harvin@gmail.com"
        activeCourses={courses.filter((course) => Number(course.status) === 1).length}
      />
      <div className="bg-card rounded-md shadow-sm p-4">
        <CourseFilters
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
        />
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Search courses..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        <div className="h-[340px] overflow-y-scroll">
          <table className="w-full whitespace-nowrap">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground text-center text-sm">
                <th className="p-4">#</th>
                <th className="p-4">Title</th>
                <th className="p-4">Categories</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr key={index} className="hover:bg-muted/50 text-center text-sm">
                  <td className="p-4 text-muted-foreground">{index + 1}</td>
                  <td className="p-4 text-primary tracking-tight cursor-pointer">
                    {course.title}
                  </td>
                  <td className="p-4">{course.category}</td>
                  <td className="p-4">{course.instructor}</td>
                  <td className="p-4">{course.price}</td>
                  <td className="p-4">
                    {Number(course.status) === 1 ? (
                      <span className="text-green-600 border border-green-600 px-2 py-1 rounded-md">
                        Unlock
                      </span>
                    ) : (
                      <span className="text-destructive border-destructive border px-2 py-1 rounded-md">
                        Lock
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <Dialog open={selectedCourse === course.id} onOpenChange={(open) => !open && setSelectedCourse(null)}>
                      <DialogTrigger asChild>
                        {Number(course.status) === 1 ? (
                          <Button onClick={() => setSelectedCourse(course.id)} variant="outline">
                            Lock
                          </Button>
                        ) : (
                          <Button onClick={() => setSelectedCourse(course.id)} variant="outline">
                            Unlock
                          </Button>
                        )}
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {Number(course.status) === 1 ? "Lock Course" : "Unlock Course"}
                          </DialogTitle>
                          <DialogDescription>
                            Are you sure you want to{" "}
                            {Number(course.status) === 1 ? "Lock" : "Unlock"} the{" "}
                            <span className="font-bold text-foreground">{course.title}</span> course?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedCourse(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-primary text-white"
                            onClick={() => handleLockCourse(
                              course.id,
                              Number(course.status) === 1 ? "Lock" : "Unlock",
                              course.title,
                              course.category || "No Category",
                              course.desc || "No Description"
                            )}
                          >
                            Confirm
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;