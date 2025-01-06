'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourse } from '@/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import { setCourses, setLoading } from '@/app/store/courseSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { LineChart } from '../../(admin)/dashboard/(component)/LineChart';
import { StatCard } from '../../(admin)/dashboard/(component)/StatsCard';
import { VideoCard } from '../../(admin)/dashboard/(component)/VideoCard';

const StudentDashboard = () => {
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
      toast.error('Please login to continue');
      router.push('/login');
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
      } catch (error) {
        // toast.error("Failed to fetch courses");
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
    <div className="px-3 pt-2 space-y-2 md:space-y-3 w-full mb-4">
      <div className="max-w-screen-xl">
        <div className="font-semibold mb-2 text-base md:text-lg">Overview</div>
        <div className="relative bg-white p-3 md:p-4 lg:p-6 border rounded-md shadow-sm">
          <div className="grid  place-items-center gap-3 mb-4">
            <StatCard title="Number of Active Courses" value={3} />
          </div>

          <div className="w-full h-[200px] md:h-[260px] lg:h-[300px]">
            <LineChart />
          </div>
        </div>

        <div className="mt-2">
          <h3 className="text-base md:text-lg font-semibold">
            Continue Watching
          </h3>

          {coursesLoading ? (
            <div className="text-center text-gray-500">Loading courses...</div>
          ) : !allCourses?.length ? (
            <div className="text-center text-gray-500">
              You have no courses available.
            </div>
          ) : (
            <div>
              <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel]}
                className="w-full h-auto mx-12"
              >
                {allCourses?.map((video: any) => (
                  <SwiperSlide key={video.id} className="!w-auto mt-2">
                    <div onClick={() => handleCourseClick(video)}>
                      <VideoCard
                        imageSrc="/harvinlogo.jpg"
                        title={video.title}
                        instructor={video.instructor}
                        rating={video.rating}
                        reviewsCount={video.reviewsCount}
                        price={Number(video.price)}
                        originalPrice={video.originalPrice || 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
