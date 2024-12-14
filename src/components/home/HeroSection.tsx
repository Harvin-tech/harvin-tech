import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { appContent } from '@/constants/variants';

const HeroSection = () => {
  return (
    <div
      className={appContent({
        className:
          'flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-16 sm:py-4',
      })}
    >
      <div className="space-y-2 md:space-y-4 order-2 lg:order-1 lg:max-w-[470px] text-center lg:text-left">
        <div className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold  text-foreground tracking-tight">
          Studying Online is now much easier
        </div>
        <div className="text-base sm:text-base xl:text-lg text-muted-foreground tracking-tight">
          Skilline is an interesting platform that will teach you in more an
          interactive way
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block tracking-tight text-white py-2.5 sm:py-2 px-4 text-sm  xl:text-lg  bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-opacity"
          >
            Join for free
          </Link>
        </div>
      </div>

      <div className="flex-1 relative w-full max-w-[630px] aspect-square mt-4 lg:mt-[-16px] order-1 lg:order-2 mx-auto lg:mx-0">
        <Image
          className="absolute object-contain"
          fill
          src="/Images/home/herosection.png"
          alt="hero.img"
          priority
        />
      </div>
    </div>
  );
};

export default HeroSection;
