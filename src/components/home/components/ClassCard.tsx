import React from 'react';
import Image from 'next/image';

type ClassProps ={
    image: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

const ClassCard = ({ image, title, subtitle, description, ctaText, onCtaClick }:ClassProps) => {
  return (
    <div className=" bg-white shadow-md rounded-2xl max-w-[400px] h-full ">
      {/* Card Image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* Card Content */}
      <div className="mt-4 space-y-2 p-6 border border-x-0 border-b-0 border-t-gray-200 ">
        {/* Title */}
        <div className="text-lg font-semibold text-[#2F327D]">
          {title}
        </div>

        {/* Subtitle */}
        <div className="text-sm text-gray-500">
          {subtitle}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-600 max-w-[350px]">
          {description}
        </div>

        {/* Call to Action */}
        {ctaText && (
          <div
            className="mt-2 text-sm font-semibold text-blue-500 hover:underline cursor-pointer"
            onClick={onCtaClick}
          >
            {ctaText}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
