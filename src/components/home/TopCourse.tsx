'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ClassCard from "./components/ClassCard";

const TopCourse = () => {
  const handleEnrollClick = (courseName: string) => {
    // alert(`You have clicked enroll for: ${courseName}`);
  };

  const courses = [
    {
      image: "/harvinlogo.jpg",
      title: "Artificial Intelligence",
      subtitle: "Professor @George Brown College",
      description: "Learn the fundamentals of AI, machine learning, and more.",
      ctaText: "Enroll the classes",
    },
    {
      image: "/harvinlogo.jpg",
      title: "Web Development",
      subtitle: "Professor @MIT",
      description: "Master modern web development techniques and tools.",
      ctaText: "Start Learning Now",
    },
    {
      image: "/harvinlogo.jpg",
      title: "Artificial Intelligence",
      subtitle: "Professor @George Brown College",
      description: "Learn the fundamentals of AI, machine learning, and more.",
      ctaText: "Enroll the classes",
    },
    {
      image: "/harvinlogo.jpg",
      title: "Web Development",
      subtitle: "Professor @MIT",
      description: "Master modern web development techniques and tools.",
      ctaText: "Start Learning Now",
    },
    {
      image: "/harvinlogo.jpg",
      title: "Artificial Intelligence",
      subtitle: "Professor @George Brown College",
      description: "Learn the fundamentals of AI, machine learning, and more.",
      ctaText: "Enroll the classes",
    },
    {
      image: "/harvinlogo.jpg",
      title: "Web Development",
      subtitle: "Professor @MIT",
      description: "Master modern web development techniques and tools.",
      ctaText: "Start Learning Now",
    },
    // Add more courses here
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <div className="text-5xl text-[#2F327D] font-semibold tracking-tight">
          Top Courses
        </div>
        <div className="text-lg text-gray-500 leading-relaxed">
          Learn how to design, build, and implement Internet of Things..
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4 my-2">
          {courses.map((course, index) => (
            <CarouselItem key={index} className="pl-4 basis-full md:basis-1/3 lg:basis-1/4">
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
        <CarouselPrevious className="w-10 h-10 md:w-12 md:h-12 -left-6 lg:-left-12 border border-black/20" />
        <CarouselNext className="w-10 h-10 md:w-12 md:h-12 -right-6 lg:-right-12 border border-black/20" />
      </Carousel>
    </div>
  );
};

export default TopCourse;
