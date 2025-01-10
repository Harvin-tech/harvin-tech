import React from 'react';
import Image from 'next/image';
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
  ctaText = 'Enroll Course',
  courseId,
  userId,
  onClick,
}: ClassProps) => {
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Optional overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-primary line-clamp-2 min-h-[2.5rem] transition-colors duration-200 tracking-tight">
          {title}
        </h3>

        {/* Subtitle - if provided */}
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-foreground/80 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* CTA Button */}
        <Link
          href={
            userId
              ? `/courses?getUser_Id=${userId}&course_id=${courseId}`
              : '/courses?preview=true'
          }
          onClick={() => onClick()}
          className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-98"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;