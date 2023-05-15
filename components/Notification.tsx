"use client";
import React, { useRef } from 'react'

export default function Notification() {
    const NotifyRef:NotifyRef = useRef<HTMLDivElement>(null);
    const HandleClose = () => {
        if(NotifyRef.current)
        {
            NotifyRef.current.style.display = 'none';
        }
    }
    return (
    <div ref={NotifyRef} className='absolute top-0 left-0 flex z-10 justify-center right-0 bottom-0'>
        <div className='bg-orange-700 mt-10 h-fit w-[90%] anim-notification sm:w-[400px] p-5 flex flex-col items-center'>
        <h1 className='text-xl underline underline-offset-4 text-white text-center capitalize'>Enjoy MP3s up to 5 Minutes! Expanding Soon.</h1>
        <p className=' mt-10 px-1 text-center text-sm text-neutral-100'>
        Limited Duration: Currently, our website downloads audio files up to 5 minutes in duration. We apologize for any inconvenience and appreciate your understanding. We're working on expanding this limit. Thank you for your support!
        </p>
        <button onClick={HandleClose} className='bg-green-800 hover:bg-green-600 transition duration-300 text-white px-5 py-2 text-sm mt-2'>Next</button>
        </div>
    </div>
    )
}
