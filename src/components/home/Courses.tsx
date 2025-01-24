'use client';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { appContent } from '@/constants/variants';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import './swiper.css';
import apiClient from '@/services/apiClient';
import { API_ENDPOINTS } from '@/config/backend-routes';
import CourseCard from '../common/CourseCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const Courses = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.PUBLIC_COURSES.BASE;
        const { data } = await apiClient.get(url);

        if (data && data.data.courses) {
          console.log('courses', data.data.courses);
          setCourses(data.data.courses);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-primary">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="py-16 md:px-0  bg-gray-50">
      <div className={appContent({ className: '' })}>
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4 px-4 mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl text-primary font-bold md:tracking-tight">
            Courses
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto tracking-tight">
            At Harvinn Technologies, we offer expert-led, flexible courses
            designed to help you grow, innovate, and succeed. Learn at your own
            pace, gain future-ready skills, and join a global community of
            learners. Your journey to success starts here!
          </p>
        </div>

        {/* Courses Carousel with Navigation and Gradients */}
        <div className="relative ">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="ml-[1px]">
              {courses.map((course: any) => (
                <CarouselItem
                  key={course.id}
                  className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 h-full"
                >
                  <CourseCard course={course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className=" w-10 h-10 md:w-12 md:h-12 -left-2 lg:-left-6 border border-black/20" />
            <CarouselNext className="w-10 h-10 md:w-12 md:h-12 -right-2 lg:-right-6 border border-black/20" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Courses;
