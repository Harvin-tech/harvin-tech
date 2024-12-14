import { appContent } from '@/constants/variants'
import { BookOpenText, CalendarDays } from 'lucide-react'
import React from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { IoCalendarOutline, IoSearchOutline } from 'react-icons/io5'
import { PiBookOpenText } from 'react-icons/pi'

const WhyChooseUs = () => {
  return (
    <div className={appContent({className:' space-y-16 mb-12 lg:mb-24'})}>
                <div className="max-w-xl mx-auto text-center space-y-2">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Search courses..."
                            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C28E9] focus:border-transparent"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8C28E9]">
                            <IoSearchOutline className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <div className='max-w-xl mx-auto text-center space-y-2 '>
                    <div className='text-5xl text-[#2F327D] font-semibold tracking-tight'>Why you <span className='text-[#8C28E9]'>Choose Us!</span></div>
                    <div className='text-lg text-gray-500'>Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.
                    </div>

                </div>
                <div className='flex flex-wrap justify-center gap-4  '>
                    {WHYCHOOSEDATA.map((item, index) => (
                        <>
                            <div key={index} className='bg-gray-400 relative text-center space-y-5 rounded-xl shadow-sm  '>
                                <div className={`absolute p-5 text-3xl text-white rounded-full left-[40%] top-[-12%] shadow-sm bg-black`} style={{ backgroundColor: item.bgcolor }}>{React.createElement(item.icon)}</div>
                                <div className='px-6 pt-2 pb-12 space-y-2'>
                                    <div className='text-xl font-medium pt-10'>{item.title}</div>
                                    <div className='max-w-[280px] text-md  leading-tight text-gray-600'>{item.desc}</div>

                                </div>
                            </div>
                        </>
                    ))}
                </div>

            </div>
  )
}

export default WhyChooseUs


const WHYCHOOSEDATA = [
    {
        icon:BookOpenText,
        title: "Live Classes",
        desc: "One - one interaction with students and you can get access to archived classes for future reference as well as live interactive sessions with their mentors. ",
        bgcolor: '#8C28E9'
        
    },
    {
        icon: IoCalendarOutline ,
        title: "Real-time live projects",
        desc: "As we know practical knowledge plays crucial role in professional career and here you will get great opportunity to develop skills acquired during the program.",
        bgcolor: '#DAA520'
        
    },
    {
        icon: HiOutlineUserGroup,
        title: "Ai enabled lms account",
        desc: "An lms is a software application that enables the delivery of online learning content to users. it also provides tools for tracking student progress.",
        bgcolor: '#4B9CD3'
        
    },

]