import React from 'react'
import { BsYoutube } from 'react-icons/bs'

export default function Footer() {
  return (
    <div className='sm:w-[60%] select-text w-[85%] text-center sm:text-left mx-auto my-10 sm:my-20 text-neutral-400 terms'>
        <h1 className='text-2xl font-light text-left mb-2 sm:mb-0 text-neutral-200'>Note :</h1>
        <p className='text-sm'>Downloading YouTube videos is a common practice, but it&apos;s important to adhere to YouTube&apos;s terms of service and guidelines. While YouTube does not provide an official download option, there are third-party tools and websites that allow you to download videos for personal use. However, it&apos;s essential to respect copyright laws and obtain proper permissions when downloading content. Additionally, be cautious when using third-party tools, as they may violate YouTube&apos;s terms of service or contain malware. It&apos;s recommended to research and choose reputable tools that comply with legal and ethical standards to ensure a safe and compliant downloading experience.</p>
        <div className='flex flex-col items-center'>
            <h1 className='text-center text-neutral-200 text-xl mt-14 sm:mt-5 uppercase underline underline-offset-2'>Enjoy your download</h1>
            <BsYoutube className='mt-8 text-neutral-600 text-4xl'/>
            <p className='text-neutral-600 mt-1 text-center'>Nipuna Nishan © 2023 </p>
        </div>
    </div>
  )
}
