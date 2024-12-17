import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type ClassProps = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
};

const ClassCard = ({
  image,
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
}: ClassProps) => {
  return (
    <div className="bg-card shadow-md rounded-2xl w-full h-full flex flex-col border border-border">
      {/* Card Image */}
      <div className="relative w-full aspect-[4/3] rounded-t-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow justify-between p-4 md:p-6 space-y-3 border-t border-border">
        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold text-primary line-clamp-2">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>

        {/* Description */}
        <p className="text-xs md:text-sm text-foreground/80 line-clamp-3">
          {description}
        </p>

        {/* Call to Action */}
        {ctaText && (
          <Button
            className="mt-auto pt-2 text-xs md:text-sm font-semibold text-white  transition-colors duration-200 cursor-pointer"
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
