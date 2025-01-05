import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Trash2 } from "lucide-react";

interface Course {
  id: number;
  name: string;
  emailCoursed: string; // Email associated with the course
  title: string;
  email: string;
  isLocked: boolean;
}

interface CourseManagementTableProps {
  courses: Course[];
}

const CourseManagementTable: React.FC<CourseManagementTableProps> = ({ courses: initialCourses }) => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleDelete = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter(course => course.id !== selectedCourse.id));
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const toggleLock = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isLocked: !course.isLocked }
        : course
    ));
  };

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-lg shadow-md whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[200px]">Course Title</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>{course.emailCoursed}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>
                <Button
                  variant={course.isLocked ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => toggleLock(course.id)}
                  className="gap-2"
                >
                  {course.isLocked ? (
                    <>
                      <Lock className="h-4 w-4" />
                      Locked
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4" />
                      Unlocked
                    </>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Are you sure you want to delete this course?
            {selectedCourse && (
              <p className="mt-2 text-sm text-gray-500">
                Course: {selectedCourse.title}
              </p>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagementTable;