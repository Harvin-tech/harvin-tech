'use client';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Course {
  title: string;
  image: string;
  description: string;
  slug: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div
      className="border border-primary/20 rounded-2xl sm:rounded-3xl shadow-sm
      hover:shadow-md transition-all duration-300 ease-in-out
       flex flex-col gap-3 sm:gap-3 pb-4 md:pb-1 hover:scale-[1.01] transform"
    >
      <div className="relative w-full aspect-[5/4]">
        <Image
          src={course.image}
          alt={course.title}
          className="absolute object-cover inset-0 rounded-t-2xl sm:rounded-t-3xl"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />
      </div>

      <div className="px-3 sm:px-4 pb-3 sm:pb-4 tracking-tight flex flex-col justify-between h-full gap-2">
        <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
        <p className="text-gray-600 line-clamp-2">
          {course.description.replace(/<[^>]*>?/gm, '').slice(0, 100) + '...'}
        </p>

        <Link href={`/${course.slug}`} className="">
          <Button
            className=" text-white w-full text-md"
            // variant="primary"
            size="lg"
          >
            View Course
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
