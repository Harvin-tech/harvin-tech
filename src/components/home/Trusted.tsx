import React from 'react';
import Marquee from 'react-fast-marquee';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';

const Trusted = () => {
  return (
    <div className="mb-12 lg:mb-20 space-y-5 relative">
      {/* Heading */}
      <div className="text-center text-3xl font-semibold tracking-tight text-foreground/90">
        Trusted by 500+ Mentors
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Left Shadow */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-background/80 via-background/50 to-transparent pointer-events-none z-10 dark:from-background/90"></div>

        {/* Right Shadow */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-background/80 via-background/50 to-transparent pointer-events-none z-10 dark:from-background/90"></div>

        {/* Marquee */}
        <Marquee speed={100} autoFill>
          <div className="flex gap-4">
            {TRUSTED.map((item, index) => (
              <div key={index}>
                <div className="relative w-[180px] aspect-[2] mx-6">
                  <Image
                    fill
                    className="absolute object-contain dark:invert"
                    src={item}
                    alt={`Trusted logo ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Trusted;

const TRUSTED = [
  '/Images/home/google.png',
  '/Images/home/airbnb.png',
  '/Images/home/netflix.png',
];
