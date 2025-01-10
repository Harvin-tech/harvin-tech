'use client';
import React from 'react';
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
import { setOneCourses } from '@/redux/courseSlice';

// Move dummy data outside component to prevent recreating on each render
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
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  // Improved responsive Swiper options
  const OPTIONS = {
    spaceBetween: 24,
    freeMode: true,
    grabCursor: true,
    loop: false,
    navigation: {
      enabled: true,
      hideOnClick: true
    },
    breakpoints: {
      320: { 
        slidesPerView: 1,
        spaceBetween: 12 
      },
      640: { 
        slidesPerView: 2,
        spaceBetween: 16 
      },
      768: { 
        slidesPerView: 2,
        spaceBetween: 20 
      },
      1024: { 
        slidesPerView: 3,
        spaceBetween: 24 
      },
      1280: { 
        slidesPerView: 4,
        spaceBetween: 24 
      }
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-primary">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className={appContent({ className: 'py-8 md:py-12 lg:py-16' })}>
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4 px-4 mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary font-semibold tracking-tight">
          Courses
        </h2>
        <p className="text-sm md:text-base text-foreground/80 max-w-2xl mx-auto">
          At Harvinn Technologies, we offer expert-led, flexible courses designed to help you grow, 
          innovate, and succeed. Learn at your own pace, gain future-ready skills, and join a global 
          community of learners. Your journey to success starts here!
        </p>
      </div>

      {/* Courses Carousel */}
      <div className="w-full max-w-screen-xl mx-auto px-4 relative">
        <Swiper {...OPTIONS} className="!pb-8">
          {dummyCourses.map((course) => (
            <SwiperSlide key={course.id}>
              <Link 
                href="/courses?preview=true"
                onClick={() => dispatch(setOneCourses(course as any))}
                className="block h-full"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col gap-4">
                      {/* Image Container */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                        <Image
                          src="/Images/home/course1.png"
                          alt={course.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      
                      {/* Content Container */}
                      <div className="px-4 pb-4 flex flex-col gap-3">
                        <h3 className="font-semibold text-primary text-lg md:text-xl line-clamp-2 tracking-tight">
                          {course.title}
                        </h3>
                        <p className="text-xs text-muted-foreground py-1 px-2 bg-muted w-fit rounded-full">
                          {course.instructor}
                        </p>
                        <p className="text-sm text-foreground/80 line-clamp-2">
                          {course.description}
                        </p>
                        
                        {/* Call to Action */}
                        <div className="mt-auto pt-4 flex items-center text-primary text-sm font-medium">
                          <span>Learn More</span>
                          <GoArrowRight 
                            className="ml-2 transition-transform duration-300 group-hover:translate-x-2" 
                            size={18}
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