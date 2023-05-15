'use client'; // Error components must be Client Components
 
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { BsFillEmojiFrownFill } from 'react-icons/bs';
 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div>
        <div className='w-full h-fit py-10 sm:py-0 sm:h-[70vh] bg-sky-950 flex space-y-10 flex-col justify-center items-center'>
            
            <h1 className='text-2xl sm:text-5xl px-2 mt-20 sm:mt-0 sm:px-[20%] text-center text-slate-300 capitalize font-bold tracking-widest'>{error.message}</h1>
            <BsFillEmojiFrownFill className='text-slate-400 text-5xl'/>
        </div>
        <div className='w-full flex justify-center items-center mt-10'>
            <button onClick={() => reset()} className='text-white bg-green-900 hover:bg-green-600 transition duration-300 text-md sm:text-lg tracking-[10px] uppercase px-5 sm:px-10 py-5'>try again</button>
        </div>
        <Footer/>
    </div>
  );
}