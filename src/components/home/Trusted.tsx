import React from 'react';
import Marquee from 'react-fast-marquee';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';

const Trusted = () => {
  return (
    <div className="mb-12 lg:mb-24 relative">
      {/* Heading */}
      <div className="text-center text-3xl text-[#2F327D] font-semibold tracking-tight">
        Trusted by 500+ Mentors
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Left Shadow */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10"></div>

        {/* Right Shadow */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10"></div>

        {/* Marquee */}
        <Marquee speed={100} autoFill >
          <div className="flex gap-4">
            {TRUSTED.map((item, index) => (
              <div key={index}>
                <div className="relative w-[250px] aspect-[5/4] mx-6">
                  <Image
                    fill
                    className="absolute object-contain"
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
  '/Images/home/netflix.png'
  
];
