'use client';
import React from 'react';

import ClassCard from './components/ClassCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

const TopCourse = () => {
  const handleEnrollClick = (courseName: string) => {
    // alert(`You have clicked enroll for: ${courseName}`);
  };

  const courses = [
    {
      image: '/harvinlogo.jpg',
      title: 'Artificial Intelligence',
      subtitle: 'Professor @George Brown College',
      description: 'Learn the fundamentals of AI, machine learning, and more.',
      ctaText: 'Enroll the classes',
    },
    {
      image: '/harvinlogo.jpg',
      title: 'Web Development',
      subtitle: 'Professor @MIT',
      description: 'Master modern web development techniques and tools.',
      ctaText: 'Start Learning Now',
    },
    {
      image: '/harvinlogo.jpg',
      title: 'Artificial Intelligence',
      subtitle: 'Professor @George Brown College',
      description: 'Learn the fundamentals of AI, machine learning, and more.',
      ctaText: 'Enroll the classes',
    },
    {
      image: '/harvinlogo.jpg',
      title: 'Web Development',
      subtitle: 'Professor @MIT',
      description: 'Master modern web development techniques and tools.',
      ctaText: 'Start Learning Now',
    },
    {
      image: '/harvinlogo.jpg',
      title: 'Artificial Intelligence',
      subtitle: 'Professor @George Brown College',
      description: 'Learn the fundamentals of AI, machine learning, and more.',
      ctaText: 'Enroll the classes',
    },
    {
      image: '/harvinlogo.jpg',
      title: 'Web Development',
      subtitle: 'Professor @MIT',
      description: 'Master modern web development techniques and tools.',
      ctaText: 'Start Learning Now',
    },
    // Add more courses here
  ];

  return (
    <div className=" mx-auto px-4 md:px-8 lg:px-12 mb-12 md:mb-20">
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
            {courses.map((course, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="shadow-none border-0 bg-transparent h-full">
                  <CardContent className="p-0 h-full">
                    <ClassCard
                      image={course.image}
                      title={course.title}
                      subtitle={course.subtitle}
                      description={course.description}
                      ctaText={course.ctaText}
                      onCtaClick={() => handleEnrollClick(course.title)}
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
