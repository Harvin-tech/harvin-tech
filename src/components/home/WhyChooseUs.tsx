import { appContent } from '@/constants/variants';
import { BookOpenText, CalendarDays } from 'lucide-react';
import React from 'react';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoCalendarOutline, IoSearchOutline } from 'react-icons/io5';
import { PiBookOpenText } from 'react-icons/pi';

const WhyChooseUs = () => {
  return (
    <div className={appContent({ className: 'space-y-16 py-16 md:px-0 ' })}>

      <div className="max-w-xl mx-auto text-center space-y-4 sm:space-y-6 mb-4">
        <div className=" text-4xl md:text-5xl text-foreground font-bold tracking-tight md:leading-tight">
        Why choose <span className="text-primary">Harvinn </span> technologies
        </div>
        <div className="text-base md:text-lg text-foreground/80">
        Harvinn Technologies offers expert-led, flexible, and affordable e-learning with personalized paths, future-ready skills, and a global community.
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-2 ">
        {WHYCHOOSEDATA.map((item, index) => (
          <div
            key={index}
            className="bg-card/80 relative text-center space-y-4 rounded-2xl shadow-sm border border-border"
          >
            <div
              className={`absolute p-3 text-3xl text-white rounded-full left-[40%] top-[-12%] shadow-sm`}
              style={{ backgroundColor: item.bgcolor }}
            >
              {React.createElement(item.icon)}
            </div>
            <div className="px-6 pt-2 pb-12 space-y-1">
              <div className="text-xl font-medium pt-10 text-foreground/90">
                {item.title}
              </div>
              <div className="max-w-[255px] text-sm md:text-base leading-tight text-muted-foreground">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;

const WHYCHOOSEDATA = [
  {
    icon: BookOpenText,
    title: 'Live Classes',
    desc: 'One - one interaction with students and you can get access to archived classes for future reference as well as live interactive sessions with their mentors. ',
    bgcolor: 'hsl(var(--primary))',
  },
  {
    icon: IoCalendarOutline,
    title: 'Real-time live projects',
    desc: 'As we know practical knowledge plays crucial role in professional career and here you will get great opportunity to develop skills acquired during the program.',
    bgcolor: '#FFB800',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Ai enabled lms account',
    desc: 'An lms is a software application that enables the delivery of online learning content to users. it also provides tools for tracking student progress.',
    bgcolor: '#0EA5E9',
  },
];
