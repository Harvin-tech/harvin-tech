'use client'
import { appContent } from '@/constants/variants'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { RiAccountCircleLine } from 'react-icons/ri'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={appContent({ className: 'flex justify-between items-center pt-4 sticky z-50 px-4 h-[60px] md:h-[110px]' })}>
            <div className='relative size-16 md:size-24'>
                <Image className='absolute' fill src="/harvinlogo.jpg" alt="Harvin" />
            </div>

            <button 
                className='lg:hidden text-2xl'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
            </button>

            <div className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className='p-4 space-y-6'>
                    <div className='flex justify-end'>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className='text-2xl'
                        >
                            <RiCloseLine />
                        </button>
                    </div>
                    <div className='relative'>
                        <IoSearchOutline className='absolute right-4 top-3 text-gray-500 text-2xl' />
                        <input className='p-[10px] rounded-xl w-full outline-none border text-xl ring-1 hover:ring-blue-600 transition-all duration-300' 
                            placeholder='Search...'
                        />
                    </div>
                    <ul className='space-y-4 text-xl'>
                        <li>Home</li>
                        <li>Course</li>
                        <li>Admin</li>
                    </ul>
                    <div className='flex justify-center'>
                        <div className='p-2 bg-blue-400 rounded-full'>
                            <RiAccountCircleLine className='text-3xl text-white' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='gap-6 items-center hidden lg:flex'>
                <div className='mr-4 relative group'>
                    <IoSearchOutline className='absolute right-4 top-3 text-gray-500 text-2xl group-hover:text-black transition-all duration-300' />
                    <input 
                        className='p-[10px] rounded-xl w-[400px] outline-none border text-xl ring-1 hover:ring-blue-600 transition-all duration-300' 
                        placeholder='Search...'
                    />
                </div>
                <ul className='flex gap-6 text-xl'>
                    <li>Home</li>
                    <li>Course</li>
                    <li>Admin</li>
                </ul>
                <div className='p-2 bg-blue-400 rounded-full'>
                    <RiAccountCircleLine className='text-3xl text-white' />
                </div>
            </div>
        </div>
    )
}

export default Header
