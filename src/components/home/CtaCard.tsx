import Link from 'next/link';
import React from 'react';

const CtaCard = () => {
  return (
    <div className="bg-background w-full py-8">
      <Link href="/quiz">
        <div className="bg-gradient-to-r from-primary via-indigo-500 to-primary p-8 max-w-7xl mx-auto  text-white/90  rounded-2xl">
          <div className="flex flex-col gap-2 ">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-lg ">
              Know exactly where everyone on your team stands with the skills
              you care about most
            </p>
            <div>
              <button className="px-6 py-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-sm  font-medium">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CtaCard;
