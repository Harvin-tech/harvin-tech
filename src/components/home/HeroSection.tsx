import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { appContent } from '@/constants/variants';

const HeroSection = () => {
  return (
    <div className="relative w-full max-w-screen-2xl mx-auto mb-8 lg:mb-16">
      <div className="relative w-full max-w-screen-2xl aspect-[16/9]  min-h-[620px] sm:min-h-[880px] lg:min-h-[700px]">
        <Image
          src="/Images/home/herobg.png"
          className="absolute"
          alt="hero.png"
          fill
        />
      </div>
      <div className="absolute inset-0">
        <div
          className={appContent({
            className:
              ' flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-8 ',
          })}
        >
          <div className="space-y-2 md:space-y-4 order-2 lg:order-1 lg:max-w-[470px] text-center lg:text-left">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  text-foreground tracking-tighter">
            Step into a world where learning knows no limits
            </div>
            <div className="text-base sm:text-base xl:text-lg text-muted-foreground tracking-tight">
            Learn grow succeed with harvinn technologies
            </div>
            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-block tracking-tight text-white py-2.5 sm:py-2 px-4 text-sm  xl:text-lg  bg-primary-dark2 rounded-lg shadow-lg hover:bg-primary-dark2/90 transition-opacity"
              >
                Join for free
              </Link>
            </div>
          </div>

          <div className=" relative w-full max-w-[490px] md:max-w-[590px] aspect-[13/10] lg:aspect-[9.7/9]  order-1 lg:order-2 mx-auto lg:mx-0">
            <Image
              className="absolute object-contain"
              fill
              src="/Images/home/herosection.png"
              alt="hero.img"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
