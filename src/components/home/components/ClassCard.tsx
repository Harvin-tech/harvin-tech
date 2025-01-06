import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ClassProps = {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  courseId: string;
  userId: string;
  onClick: (v: void) => void;
};

const ClassCard = ({
  image,
  title,
  subtitle,
  description,
  ctaText,
  courseId,
  userId,
  onClick,
}: ClassProps) => {
  return (
    <div className="bg-card shadow-md rounded-2xl w-full h-full flex flex-col justify-between border border-border mb-2">
      {/* Card Image */}
      <div className="relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow justify-between p-4 md:p-6 space-y-3 border-t border-border">
        {/* Title */}
        <h3 className=" font-semibold text-primary line-clamp-2">{title}</h3>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-muted-foreground truncate">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-xs md:text-sm text-foreground/80 line-clamp-3">
          {description}
        </p>

        {/* Call to Action */}

        <Link
          href={
            userId
              ? `/courses?user_id=${userId}&course_id=${courseId}`
              : '/courses?preview=true'
          }
          onClick={() => onClick()}
          className="bg-primary mt-auto py-2 text-xs md:text-sm font-semibold text-white  transition-colors duration-200 cursor-pointer text-center rounded-lg"
        >
          Enroll Course
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;
