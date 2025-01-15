import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Users, LucideVideo } from 'lucide-react';
import { appContent } from '@/constants/variants';

const HeroSection = () => {
  const stats = [
    { icon: <Users className="w-4 h-4" />, label: 'Active Users', value: '10K+' },
    { icon: <LucideVideo className="w-4 h-4" />, label: 'Video', value: '300+' },
  ];

  return (
    <section className="relative w-full min-h-[40vh] flex items-center bg-primary/30">
      {/* Background with enhanced overlay */}
      <div className="absolute  w-full h-full ">
        <Image
          src="/Images/home/herobg.png"
          className="object-cover"
          alt="Background"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-white/20 backdrop-blur-[2px]" />
      </div>

      {/* Main Content */}
      <div className={appContent({
        className: 'relative z-10 container mx-auto py-12 md:py-16 lg:py-20'
      })}>
        <div className="flex flex-col lg:flex-row  gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10  text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              <span>The Future of Learning</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Step into a world
              </span>
              <br />
              where learning knows no limits
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/60 max-w-xl mx-auto lg:mx-0">
              Learn, grow, and succeed with Harvinn Technologies. Join our community of learners and unlock your potential today.
            </p>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="group flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl 
                         hover:bg-primary/90 transition-all duration-300 
                         shadow-lg hover:shadow-primary/25  active:shadow-primary/25"
              >
                Join Free Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Stats */}
              <div className="flex items-center gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary-dark2/10">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-foreground/60">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[40%]">
            <div className="relative aspect-[4/3] lg:aspect-square w-full max-w-[640px] mx-auto 
                          transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-3xl -z-10" />
              <Image
                className="object-contain drop-shadow-xl"
                src="/Images/home/herosection.png"
                alt="Hero illustration"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 640px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;