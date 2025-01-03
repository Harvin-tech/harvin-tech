'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourse } from "@/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { StatCard } from "./(component)/StatsCard";
import { VideoCard } from "./(component)/VideoCard";
import { LineChart } from "./(component)/LineChart";
import { setCourses, setLoading } from "@/app/store/courseSlice";
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

const Dashboard = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state: any) => state.courses);
  const {user}=useSelector((state:any)=>state.auth);
  const userId = user?._id;


  

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      if (!userId) {
        
        toast.success("Please login to continue");
        router.push('/login');
        // toast.error("Please login to continue");
        return;
      }
      dispatch(setLoading(true));
      try {
        // console.log(user._id)
        const response = await getUserCourse(userId);
        const userCourses = response.data.courses.map((item: any) => ({
          id: uuidv4(),
          courseId: item?.courseId,
          title: item?.courseDetails?.title || "No Title",
          price: item?.courseDetails?.price || "N/A",
          desc: item?.courseDetails?.description || "No Description",
          instructor: item?.courseDetails?.instructor || "Unknown Instructor",
          rating: item?.courseDetails?.rating || 0,
          reviewsCount: item?.courseDetails?.reviewsCount || 0,
        }));
        dispatch(setCourses(userCourses));
      } catch (error) {
        toast.error("Failed to fetch courses");
      } finally {
        dispatch(setLoading(false));
        setIsAuthChecked(true);
      }
    };

    checkAuthAndFetchData();
  }, [router, dispatch]);

  // Don't render anything until auth check is complete
  if (!isAuthChecked || loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const handleCourseClick = (course: any) => {
    router.push(`/courses?user_id=${userId}&course_id=${course.courseId}`);
  };

  return (
    <div className="px-3 pt-2 space-y-2 md:space-y-3 w-full mb-4">
      {/* Rest of the JSX remains the same */}
      <div className="max-w-screen-xl">
        <div className="font-semibold mb-2 text-base md:text-lg">Overview</div>
        <div className="relative bg-white p-3 md:p-4 lg:p-6 border rounded-md shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            <StatCard title="Number of Courses" value={courses.length} />
            <StatCard title="Number of Enrolment" value={1502} />
            <StatCard title="Number of Students" value={302} />
          </div>

          <div className="w-full h-[200px] md:h-[260px] lg:h-[300px]">
            <LineChart />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-base md:text-lg font-semibold mb-2">Continue Watching</h3>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          mousewheel={true}
          modules={[FreeMode, Mousewheel]}
          className="w-full h-auto mx-12"
        >
          {courses.map((video: any) => (
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
    </div>
  );
};

export default Dashboard;