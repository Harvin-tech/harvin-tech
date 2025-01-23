'use client';
import React, { useEffect, useState } from 'react';
import { appContent } from '@/constants/variants';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import apiClient from '@/services/apiClient';
import { API_ENDPOINTS } from '@/config/backend-routes';
import CourseCard from '../common/CourseCard';

const AllCourseList = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('getUser_Id');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const url = API_ENDPOINTS.PUBLIC_COURSES.BASE;
        const { data } = await apiClient.get(url);
        console.log('response', data);
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
            All Courses
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-3xl mx-auto tracking-tight">
            At Harvinn Technologies, we offer expert-led, flexible courses
            designed to help you grow, innovate, and succeed. Learn at your own
            pace, gain future-ready skills, and join a global community of
            learners. Your journey to success starts here!
          </p>
        </div>

        {/* Courses Carousel with Navigation and Gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course: any) => (
            <CourseCard course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourseList;
