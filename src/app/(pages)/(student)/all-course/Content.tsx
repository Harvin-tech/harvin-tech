'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourse } from '@/api';
import { setCourses, setLoading } from '@/app/store/courseSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

const AllCourse = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get all required state in one selector
  const {
    courses: { allCourses, loading: coursesLoading },
    auth: { user, isAuthenticated, loading: authLoading },
  } = useSelector((state: any) => state);
  const userId = user?._id;

  useEffect(() => {
    // Handle authentication check inside useEffect
    if (!userId) {
      // toast.error('Please login to continue');
      window.location.href='/login';
      return;
    }

    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getUserCourse(userId);
        const userCourses = response.data.courses.map((item: any) => ({
          id: uuidv4(),
          courseId: item?.courseId,
          title: item?.courseDetails?.title || 'No Title',
          price: item?.courseDetails?.price || 'N/A',
          desc: item?.courseDetails?.description || 'No Description',
          instructor: item?.courseDetails?.instructor || 'Unknown Instructor',
          rating: item?.courseDetails?.rating || 0,
          reviewsCount: item?.courseDetails?.reviewsCount || 0,
        }));
        dispatch(setCourses(userCourses));
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        // toast.error(error.response.data.message || "Failed to fetch courses");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCourses();
  }, [userId, dispatch, router]);

  // Show loading state when either auth or courses are loading
  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const handleCourseClick = (course: any) => {
    router.push(`/courses?course_id=${course.courseId}`);
  };

  return (
    <div className="px-4 pt-4 space-y-4 w-full">
      <div className="max-w-screen-xl mx-auto">
        <div>
          <h3 className="text-lg font-semibold mb-2">All Courses</h3>

          {coursesLoading ? (
            <div className="text-center text-gray-500">Loading courses...</div>
          ) : !allCourses?.length ? (
            <div className="text-center text-gray-500">
              You have no courses available.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 mb-2">
              {allCourses.map((course: any, index: number) => (
                <div
                  key={course.id}
                  className="border rounded-lg shadow-sm p-2 hover:shadow-md transition cursor-pointer bg-white"
                  onClick={() => handleCourseClick(course)}
                >
                  <img
                    src={Images[index]}
                    alt={course.title}
                    className="w-full h-50 object-contain rounded-md mb-4"
                  />
                  <h4 className="text-lg font-semibold mb-2 truncate">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {course.instructor}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Rating: {course.rating}</span>
                    <span>Reviews: {course.reviewsCount}</span>
                  </div>
                  <div className="mt-2 text-base font-semibold text-gray-800">
                    ${course.price}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourse;

const Images = [
  '/Images/home/course1.png',
  '/Images/home/course2.png',
  '/Images/home/course3.png',
  '/Images/home/topcourse1.png',
  '/Images/home/topcourse2.png',
  '/Images/home/topcourse3.png',
  '/Images/home/course1.png',
  '/Images/home/course2.png',
  '/Images/home/course3.png',
];
