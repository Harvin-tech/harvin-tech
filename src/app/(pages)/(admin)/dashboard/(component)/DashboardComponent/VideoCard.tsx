import React from "react";
import { Star } from "lucide-react"; // Using Lucide Icons for stars (or replace with custom icons)
import Image from "next/image";

interface VideoCardProps {
  imageSrc: string;
  title: string;
  instructor: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  imageSrc,
  title,
  instructor,
  rating,
  reviewsCount,
  price,
  originalPrice,
}) => {
  return (
    <div className="rounded-lg overflow-hidden border shadow-sm bg-white w-64 mx-2">
        <div className="relative w-full h-52 ">    


      <Image
        src={imageSrc}
        alt={title}
        className="absolute  object-cover px-2"
        fill
      />
        </div>
      {/* Image Section */}

      {/* Content Section */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
        <p className="text-xs text-gray-500">{instructor}</p>

        {/* Rating Section */}
        <div className="flex items-center space-x-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              fill={index < Math.floor(rating) ? "currentColor" : "none"}
              strokeWidth={1}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">
            ({reviewsCount.toLocaleString()})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-green-600">
            ₹{price}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};
