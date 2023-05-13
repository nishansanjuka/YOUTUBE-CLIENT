import React from 'react'
import {BsYoutube} from 'react-icons/bs';

function Header() {
  return (
    <header className='flex items-center p-1 sm:p-3 bg-neutral-800 land-header w-full text-white h-fit sm:h-[100px] shadow-2xl justify-center'>
        <BsYoutube className='text-2xl sm:text-5xl mr-5 text-orange-600'/>
        <h1 className='text-sm sm:text-3xl my-5 text-center uppercase font-semibold tracking-wide underline underline-offset-4'>Youtube downloader by Nishan.</h1>
    </header>
  )
}

export default Header