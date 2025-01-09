'use client';
import React, { useState } from 'react';
import ClassCard from './components/ClassCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { appContent } from '@/constants/variants';
import { useSearchParams } from 'next/navigation';
import { getUserCourse } from '@/api';
import { v4 as uuidv4 } from 'uuid';
import { setCourses, setOneCourses } from '@/app/store/courseSlice';
import { useDispatch } from 'react-redux';

const dummyId = uuidv4();

const TopCourse = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('getUser_Id');
  const courseId = searchParams.get('course_id');
  const [loading, setLoading] = React.useState(false);
  const [localCourses, setLocalCourses] = useState([]);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const fetchData = async (userId: string) => {
  //     setLoading(true);
  //     try {
  //       const response = await getUserCourse(userId);
  //       const userCourses = response.data.courses.map((item: any) => ({
  //         id: item?._id,
  //         courseId: item?.courseId,
  //         title: item?.courseDetails?.title || "No Title",
  //         subtitle: `Professor ${item?.courseDetails?.instructor || "Unknown"}`,
  //         description: item?.courseDetails?.description || "No Description",
  //         ctaText: 'Enroll the classes',
  //         image: '/Images/home/topcourse1.png', // Default image since API doesn't provide images
  //       }));
  //       setLocalCourses(userCourses);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (userId) {
  //     fetchData(userId);
  //   }
  // }, [userId]);

  const handleEnrollClick = (courseId: string) => {
    // Handle enrollment logic here
    console.log(`Enrolling in course: ${courseId}`);
  };

  if (loading) {
    return (
      <div
        className={appContent({
          className: 'max-w-screen-lg mx-auto mb-12 md:mb-20',
        })}
      >
        <div className="text-center py-10">Loading top courses...</div>
      </div>
    );
  }

  const displayCourse = dummyCourses;

  return (
    <div
      className={appContent({
        className: 'max-w-screen-lg mx-auto mb-12 md:mb-20',
      })}
    >
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-8">
        <div className="text-4xl md:text-5xl text-primary font-semibold tracking-tight">
          Top Courses
        </div>
        <div className="text-base text-foreground/80">
          Learn how to design, build, and implement Internet of Things..
        </div>
      </div>

      <div className="relative px-4 md:px-8">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {displayCourse.map((course) => (
              <CarouselItem
                key={course.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="shadow-none border-0 bg-transparent min-h-[385px] h-full">
                  <CardContent className="p-0 h-full">
                    <ClassCard
                      image={'/Images/home/course2.png'}
                      title={course.title}
                      // subtitle={course?.subtitle || ""}
                      description={course.description}
                      // ctaText={course?.ctaText || ""}
                      courseId={course.courseId}
                      userId={userId || ''}
                      onClick={() => {
                        dispatch(setOneCourses(course as any));
                      }}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex w-10 h-10 md:w-12 md:h-12 -left-2 lg:-left-6 border border-black/20" />
          <CarouselNext className="hidden md:flex w-10 h-10 md:w-12 md:h-12 -right-2 lg:-right-6 border border-black/20" />
        </Carousel>
      </div>
    </div>
  );
};

export default TopCourse;

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
