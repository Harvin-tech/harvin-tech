import React from 'react';

const CtaCard = () => {
  return (
    <div className="bg-background w-full py-8">
      <div className=" bg-gradient-to-r from-blue-800/80 via-blue-600 to-blue-200 p-[2px] max-w-screen-lg mx-auto  rounded-2xl ">
        <div className="bg-primary rounded-2xl p-8 text-white">
          <div className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Not sure where to start?
            </h2>
            <p className="text-lg text-white/90">
              Know exactly where everyone on your team stands with the skills you care about most
            </p>
            <div>
              <button className="px-6 py-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-sm font-medium">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaCard;