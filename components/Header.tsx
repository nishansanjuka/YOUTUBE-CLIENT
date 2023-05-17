"use client";
import Link from 'next/link';
import React from 'react'
import {BsYoutube} from 'react-icons/bs';
import {AiFillHome} from 'react-icons/ai'


function Header() {
  const HandleRedirect = () => {
    window.location.href = '/';
  }
  return (
    <header className='cursor-pointer' onClick={HandleRedirect}>
      <span className='flex items-center p-1 sm:p-3 bg-neutral-800 land-header w-full text-white h-fit sm:h-[100px] shadow-2xl justify-center'>
          <BsYoutube className='text-2xl sm:text-5xl mr-5 text-orange-600'/>
          <h1 className='text-sm sm:text-3xl my-5 text-center uppercase font-semibold tracking-wide underline underline-offset-4'>Youtube downloader by Nishan.</h1>
          <div className='relative sm:absolute hover:text-neutral-500 transition duration-300 left-0 ml-5 text-neutral-700 flex items-center flex-col'>
            <AiFillHome className='text-xl sm:text-4xl'/>
            <p className='text-xs sm:text-sm'>home</p>
          </div>
      </span>
    </header>
  )
}

export default Header