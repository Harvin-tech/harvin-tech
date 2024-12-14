'use client'
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import EmblaCarousel from '../emblaCrausel/EmblaCarousel';
import { appContent } from '@/constants/variants';

const Courses = () => {
  const OPTIONS = { slidesToScroll: 1, align: 'start' }

  const renderSlide = (item: typeof COURSES[0], index: number) => (
    <Link href="/" className="px-2 group">
      <Card className="rounded-3xl opacity-80 cursor-pointer hover:opacity-100 transition-opacity duration-300">
        <CardContent className="relative flex aspect-square items-center justify-center p-4 rounded-3xl">
          <div className="relative w-full aspect-square">
            <Image
              fill
              src={item.img}
              alt={item.title}
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div className="absolute inset-0 rounded-3xl bg-black/50 flex flex-col items-center justify-center text-white p-4">
            <div className="py-2 px-4 border border-white rounded-full mb-2 text-lg group-hover:bg-white group-hover:text-black transition-all duration-500">
              {item.title}
            </div>
            <div className="">Start a class today</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className={appContent({className:'space-y-8 mb-12 lg:mb-24 '})}>
      {/* Heading Section */}
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <div className="text-5xl text-[#2F327D] font-semibold tracking-tight">
          Courses
        </div>
        <div className="text-lg text-gray-500 leading-snug">
          Skilline is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage assignments, quizzes, and exams;
          monitor due dates; grade results, and provide students with feedback all in one place.
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full max-w-screen-2xl mx-auto">
        <EmblaCarousel
          slides={COURSES}
          options={OPTIONS}
          renderSlide={renderSlide}
        />
      </div>
    </div>
  );
};

export default Courses;

const COURSES = [
  {
    img: '/harvinlogo.jpg',
    title: 'Cyber Security',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Data Science',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Web Development',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Machine Learning',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Graphic Design',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Data Science',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Web Development',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Machine Learning',
  },
  {
    img: '/harvinlogo.jpg',
    title: 'Graphic Design',
  },
];
