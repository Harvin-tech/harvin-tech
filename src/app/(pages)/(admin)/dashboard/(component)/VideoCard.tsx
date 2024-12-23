import React from "react";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card"; // Import Shadcn UI components

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
    <Link href="/" className=" group">
      <Card className="relative rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl border-0">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative w-full aspect-[13/10]">
            <Image
              src={imageSrc}
              alt={title}
              className="object-cover "
              fill
            />
          </div>

          {/* Content Container */}
          <div className="abolute p-4">
            <div className="flex flex-col justify-start max-w-sm">
              <h3 className="text-sm md:text-base font-bold text-foreground mb-2 tracking-tight">{title}</h3>
              <p className="text-foreground/70 text-sm mb-2">{instructor}</p>

              {/* Rating Section */}
              <div className="flex items-center space-x-1 text-yellow-500 mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={14}
                    fill={index < Math.floor(rating) ? "currentColor" : "none"}
                    strokeWidth={1}
                  />
                ))}
                <span className="text-xs text-foreground/70 ml-1">
                  ({reviewsCount.toLocaleString()})
                </span>
              </div>

              {/* Price Section */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-bold text-primary">
                  ₹{price}
                </span>
                <span className="text-xs text-foreground/70 line-through">
                  ₹{originalPrice}
                </span>
              </div>
            </div>

            <div className="flex justify-start space-x-2 text-primary group-hover:text-primary-foreground transition-colors duration-300">
              <span className="text-sm font-medium">Start Learning</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
