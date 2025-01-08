'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { appContent } from '@/constants/variants';
import { Card, CardContent } from '../ui/card';
import { GoArrowRight } from 'react-icons/go';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { setOneCourses } from '@/app/store/courseSlice';
// Define dummy data with the same structure as API data
const dummyCourses = [
  {
    id: uuidv4(),
    courseId: '1',
    title: 'Introduction to Web Development',
    instructor: 'Jane Doe',
    description:
      'Learn the basics of HTML, CSS, and JavaScript to create your first website.',
    rating: 4.5,
    reviewsCount: 128,
  },
  {
    id: uuidv4(),
    courseId: '2',
    title: 'Advanced React Techniques',
    instructor: 'John Smith',
    description:
      'Dive deep into advanced concepts like hooks, context API, and performance optimization.',
    rating: 4.8,
    reviewsCount: 256,
  },
  {
    id: uuidv4(),
    courseId: '3',
    title: 'Mastering Python for Data Science',
    instructor: 'Emily Brown',
    description:
      'Discover how to use Python for data analysis, visualization, and machine learning.',
    rating: 4.6,
    reviewsCount: 184,
  },
  {
    id: uuidv4(),
    courseId: '4',
    title: 'Cloud Computing Fundamentals',
    instructor: 'Michael Johnson',
    description:
      'Understand the principles of cloud computing and how to deploy applications on the cloud.',
    rating: 4.7,
    reviewsCount: 142,
  },
  {
    id: uuidv4(),
    courseId: '5',
    title: 'Digital Marketing Essentials',
    instructor: 'Sarah Davis',
    description:
      'Learn strategies for SEO, social media marketing, and content creation.',
    rating: 4.4,
    reviewsCount: 198,
  },
];

const Courses = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('getUser_Id');
  const [localCourses, localSetCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const OPTIONS = {
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    loop: true,
    navigation: true,
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  };

  // useEffect(() => {
  //   const fetchData = async (userId: string) => {
  //     setLoading(true);
  //     try {
  //       const response = await getUserCourse(userId);
  //       const userCourses = response.data.courses.map((item: any) => ({
  //         id: uuidv4(),
  //         courseId: item?.courseId,
  //         title: item?.courseDetails?.title || "No Title",
  //         description: item?.courseDetails?.description || "No Description",
  //         instructor: item?.courseDetails?.instructor || "Unknown Instructor",
  //         rating: item?.courseDetails?.rating || 0,
  //         reviewsCount: item?.courseDetails?.reviewsCount || 0,
  //       }));
  //       localSetCourses(userCourses);

  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //       localSetCourses([]); // Reset courses on error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (userId) {
  //     fetchData(userId);
  //   }
  // }, [userId]);

  // Determine which courses to display
  const displayCourses = dummyCourses;

  if (loading) {
    return <div className="text-center py-10">Loading courses...</div>;
  }

  return (
    <div className={appContent({ className: 'space-y-5 mb-12 lg:mb-20' })}>
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <div className="text-5xl text-primary font-semibold tracking-tight">
          Courses
        </div>
        <div className="text-base text-foreground/80">
          Skilline is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage
          assignments, quizzes, and exams; monitor due dates; grade results, and
          provide students with feedback all in one place.
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto relative">
        <Swiper {...OPTIONS}>
          {displayCourses.map((course) => (
            <SwiperSlide
              key={course.id}
              className="flex"
              onClick={() => {
                dispatch(setOneCourses(course as any));
              }}
            >
              <Link href={'/courses?preview=true'} className="w-full">
                <Card className="flex flex-col h-full group pb-3">
                  <CardContent className="flex flex-col justify-between gap-2 min-h-[385px] py-2 px-2">
                    <div className="w-full h-48 relative">
                      <Image
                        src="/Images/home/course1.png"
                        alt={course.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                      <div className="font-semibold text-primary text-base">
                        {course.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.instructor}
                      </div>
                      <p className="text-sm mt-2 text-foreground/80 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-primary">
                          <span>Learn More</span>
                          <GoArrowRight
                            className="ml-2 group-hover:translate-x-2 transition-all duration-300"
                            strokeWidth={1}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Courses;
