'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmblaCarousel from '../emblaCrausel/EmblaCarousel';
import { appContent } from '@/constants/variants';
import { Card, CardContent } from '../ui/card';
import { ArrowRight } from 'lucide-react';

const Courses = () => {
  const OPTIONS = { slidesToScroll: 1, align: 'start' };

  const renderSlide = (item: (typeof COURSES)[0], index: number) => (
    <Link href="/" className="px-2 group">
      <Card className="rounded-3xl overflow-hidden transform transition-all duration-300  hover:shadow-xl bg-gradient-to-b from-primary/90 via-background/40 to-transparent ">
        <CardContent className="relative flex aspect-[4/5] items-center justify-center p-0 ">
          <div className="relative w-full h-full">
            <Image
              fill
              src={item.img}
              alt={item.title}
              className="object-cover w-full h-full"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
            <div className="mb-4 flex flex-col items-center justify-between max-w-sm">
              <span className="inline-block px-4 py-1.5 bg-white/80 text-primary rounded-full text-sm font-medium mb-2 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-foreground/70 text-sm mb-4">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-primary group-hover:text-primary-foreground transition-colors duration-300">
              <span className="text-sm font-medium">Start Learning</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

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
      <div className="w-full max-w-screen-xl mx-auto px-4 lg:px-8">
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
