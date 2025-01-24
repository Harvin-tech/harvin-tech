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
import { appContent } from '@/constants/variants';
import { v4 as uuidv4 } from 'uuid';
import CourseCard from '../common/CourseCard';
import { TopChoiceData_C } from '@/constants/courses/topChoice';

const dummyId = uuidv4();

const TopCourse = () => {
  const handleEnrollClick = (courseId: string) => {
    // Handle enrollment logic here
    console.log(`Enrolling in course: ${courseId}`);
  };

  const displayCourse = TopChoiceData_C;

  return (
    <div
      className={appContent({
        className: 'sm:py-16 py-8',
      })}
    >
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-6">
        <div className=" text-4xl md:text-5xl text-foreground font-bold tracking-tight md:leading-tight max-w-md mx-auto">
          <span className="text-primary">Top</span> Choice Among The Students
        </div>
        <div className="text-base md:text-lg text-foreground/80">
          Empowering your future with the Top Courses chosen by students
        </div>
      </div>

      <div className="relative ">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-[1px]">
            {displayCourse.map((course, index) => (
              <CarouselItem
                key={course.title + index}
                className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CourseCard course={course} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" flex w-10 h-10 md:w-12 md:h-12 -left-2 lg:-left-6 border border-black/20" />
          <CarouselNext className="flex w-10 h-10 md:w-12 md:h-12 -right-2 lg:-right-6 border border-black/20" />
        </Carousel>
      </div>
    </div>
  );
};

export default TopCourse;

// Define dummy data with the same structure as API data
