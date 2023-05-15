"use client";
import {AiOutlineLink} from 'react-icons/ai';
import { GetSongs } from '@/app/_actions';
import { useDispatch } from 'react-redux';
import { setYoutubeData } from '@/app/Redux/Features/youtube/youtubeSlice';
import { redirect } from 'next/navigation';
import {BeatLoader} from 'react-spinners';
import React,{useState} from 'react';

export default function Form(){
    const dispatch = useDispatch();
    const [IsSearching, setIsSearching] = useState(false);

    const HandleSubmit = async(data:FormData) => {
        try {
            setIsSearching(true);
            const videoData:Video[] = await GetSongs(data);
            dispatch(setYoutubeData(videoData));
        } catch (error:any) {
            throw new Error(`It's looks like you did something wrong! check your url`)
        }
        redirect('/download');
    }

    return (
    <>
        <form action={HandleSubmit} className='w-[95%] sm:w-[50%]  mx-auto mt-[100px]  md:mt-[140px] 2xl:mt-[200px] h-fit text-white p-6 sm:p-10 bg-neutral-800 form-anim rounded-sm'>
            <div className='text-xl capitalize mb-5 flex items-center space-x-1'>
                <h1 className='text-center text-sm sm:text-md'>Paste your youtube <span className='text-green-400'>playlist</span> or <span className='text-green-400'>video</span> url here</h1>
                <AiOutlineLink/>
            </div>
            <label className='text-sm sm:text-md' htmlFor="url">URL:</label>
            <input placeholder='https://www.youtube.com/watch?v=123456' className='w-full py-1 sm:py-2 mt-1 text-xs sm:text-sm px-3 text-black border outline-none transition duration-300 focus:border-orange-400 border-spacing-1 border-slate-300' type="text" id='url' name='url' />
            {IsSearching ? <button className='w-full p-2 sm:text-md text-sm sm:p-3 mt-3 bg-stone-900 hover:bg-green-700 active:bg-green-500 transition duration-300 flex justify-center items-center'>
                Searching
                <BeatLoader className='pl-2' color="white" size={6}/>
            </button> :
            <button className='w-full p-2 sm:text-md text-sm sm:p-3 mt-3 bg-stone-900 hover:bg-green-700 active:bg-green-500 transition duration-300 flex justify-center items-center'>
            Search
        </button>}
        </form>
    </>
    )
}