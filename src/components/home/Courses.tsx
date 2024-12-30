'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { appContent } from '@/constants/variants';
import { Card, CardContent } from '../ui/card';
import { GoArrowRight } from "react-icons/go";

const Courses = () => {
  const OPTIONS = {
    spaceBetween: 10, // Space between slides
    freeMode: true,  // Enable free scroll
    grabCursor: true,
    loop: true,      // Enable looping of slides
    navigation: true, // Use Swiper's navigation
    breakpoints: {
      // For screens 320px and above (mobile)
      320: {
        slidesPerView: 1, // Show 1 slide
      },
      // For screens 640px and above (tablets)
      640: {
        slidesPerView: 2, // Show 2 slides
      },
      // For screens 768px and above (larger tablets)
      768: {
        slidesPerView: 3, // Show 3 slides
      },
      // For screens 1024px and above (desktops)
      1024: {
        slidesPerView: 4, // Show 4 slides
      },
    },
  };

  return (
    <div className={appContent({ className: 'space-y-5 mb-12 lg:mb-20' })}>
      {/* Heading Section */}
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

      {/* Carousel Section */}
      <div className="w-full max-w-screen-xl mx-auto relative">
        <Swiper {...OPTIONS}>
          {COURSES.map((item, index) => (
            <SwiperSlide key={index} className="flex">
              <Link  href="/courses">
              <Card className="flex flex-col h-full group"> {/* Card with full height */}
                <CardContent className="flex flex-col gap-2 min-h-[380px]  py-2 px-2 "> {/* Flex container with content distributed */}
                  <div className="w-full h-48 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex flex-col justify-between"> {/* Flex-grow for content */}
                    <div className=" font-semibold text-primary tex-base">{item.title}</div>
                    <div className="text-sm text-muted-foreground ">{item.category}</div>
                    <p className="text-sm mt-2 text-foreground/80">{item.description}</p>
                    <Link href="#" className="flex items-center text-primary mt-4">
                      <span>Learn More</span>
                      <GoArrowRight className="ml-2 group-hover:translate-x-2 translate-all duration-300" strokeWidth={1} />
                    </Link>
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

const COURSES = [
  {
    img: '/Images/home/course1.png',
    title: 'Cyber Security Fundamentals',
    category: 'Security',
    description:
      'Learn the essential principles of cybersecurity and protect digital assets.',
  },
  {
    img: '/Images/home/course2.png',
    title: 'Data Science & Analytics',
    category: 'Data',
    description:
      'Master data analysis techniques and make data-driven decisions.',
  },
  {
    img: '/Images/home/course3.png',
    title: 'Full-Stack Web Development',
    category: 'Development',
    description: 'Build modern web applications from front-end to back-end.',
  },
  {
    img: '/Images/home/course1.png',
    title: 'Machine Learning Engineering',
    category: 'AI & ML',
    description:
      'Implement machine learning models and artificial intelligence solutions.',
  },
  {
    img: '/Images/home/course2.png',
    title: 'UI/UX Design Mastery',
    category: 'Design',
    description:
      'Create beautiful and functional user interfaces and experiences.',
  },
  {
    img: '/Images/home/course3.png',
    title: 'Cloud Computing',
    category: 'Infrastructure',
    description: 'Learn cloud platforms and modern infrastructure management.',
  },
  {
    img: '/Images/home/course1.png',
    title: 'Mobile App Development',
    category: 'Development',
    description: 'Build native and cross-platform mobile applications.',
  },
  {
    img: '/Images/home/course2.png',
    title: 'Digital Marketing',
    category: 'Marketing',
    description: 'Master digital marketing strategies and analytics.',
  },
  {
    img: '/Images/home/course3.png',
    title: 'Blockchain Development',
    category: 'Blockchain',
    description: 'Develop decentralized applications and smart contracts.',
  },
];
