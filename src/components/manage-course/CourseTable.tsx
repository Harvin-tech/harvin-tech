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
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Trash2 } from 'lucide-react';
import apiClient from '@/services/apiClient';
import { API_ENDPOINTS } from '@/config/backend-routes';
import { getCourse_I } from '@/types/course.types';
import { useRouter } from 'next/navigation';

const CourseManagementTable = () => {
  const [courses, setCourses] = useState<getCourse_I[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<getCourse_I | null>(
    null
  );

  const router = useRouter();
  const getAllCourses = async () => {
    try {
      const { data } = await apiClient.get(API_ENDPOINTS.COURSES.BASE);
      console.log(data);
      setCourses(data.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const handleDelete = (course: getCourse_I) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      setCourses(courses.filter((course) => course._id !== selectedCourse._id));
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const toggleLock = (courseId: string) => {
    setCourses(
      courses.map((course) =>
        course._id === courseId
          ? {
              ...course,
              status: course.status === 0 ? 1 : course.status === 1 ? 0 : -1,
            }
          : course
      )
    );
  };

  return (
    <div className="w-full overflow-x-auto p-4 bg-white rounded-lg shadow-md whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Course Title</TableHead>
            <TableHead className="w-[200px]">Category</TableHead>
            <TableHead className="w-[200px]">Level</TableHead>
            <TableHead className="w-[200px]">instructor</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course._id}
              onClick={() => router.push(`/admin/manage-course/${course._id}`)}
              className="cursor-pointer"
            >
              <TableCell>{course.title}</TableCell>
              <TableCell className="font-medium">
                {course.category ?? '-'}
              </TableCell>
              <TableCell>{course.level ?? '-'}</TableCell>
              <TableCell>{course.instructor?.name ?? '-'}</TableCell>
              <TableCell>
                <Button
                  variant={course.status ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => toggleLock(course._id)}
                  className="gap-2"
                >
                  {course.status ? (
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

export default CourseManagementTable;
