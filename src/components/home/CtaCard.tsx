import Link from 'next/link';
import React from 'react';
import { ShineBorder } from '../ui/shine-border';

const CtaCard = () => {
  return (
    <div className="bg-foreground/5 w-full py-8">
      <Link href="/quiz">
        <ShineBorder
          className="bg-gradient-to-t from-[#11101d] to-[#2c125c] p-8 max-w-7xl mx-auto  text-white/90  rounded-lg"
          color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
        >
          <div className="flex flex-col gap-2 ">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-lg ">
              Know exactly where everyone on your team stands with the skills
              you care about most
            </p>
            <div>
              <button className="px-6 py-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors  font-medium">
                Learn more
              </button>
            </div>
          </div>
        </ShineBorder>
      </Link>
    </div>
  );
};

export default CtaCard;
