import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <div className='px-4 sm:px-6 max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between  mb-12 lg:mb-24'>
      <div className='space-y-3 md:space-y-5 order-2 lg:order-1 lg:max-w-[470px] text-center lg:text-left'>
        <div className='text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight'>
          Studying Online is now much easier
        </div>
        <div className='text-base sm:text-lg md:text-xl'>
          Skilline is an interesting platform that will teach you in more an interactive way
        </div>
        <div className='pt-2'>
          <Link 
            href="/" 
            className='inline-block tracking-tight text-white py-2.5 sm:py-3 px-4 text-base sm:text-lg font-medium bg-black rounded-lg shadow-lg hover:opacity-90 transition-opacity'
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
  )
}

export default HeroSection
