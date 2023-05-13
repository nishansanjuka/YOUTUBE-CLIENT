import {BsYoutube} from 'react-icons/bs'

import {AiOutlineLink} from 'react-icons/ai';


export default function Form(){
    return (
    <form action="" className='w-[95%] sm:w-[50%]  mx-auto mt-[100px]  md:mt-[140px] 2xl:mt-[200px] h-fit text-white p-6 sm:p-10 bg-neutral-800 form-anim rounded-sm'>
        <div className='text-xl capitalize mb-5 flex items-center space-x-1'>
            <h1 className='text-center text-sm sm:text-md'>Paste your youtube playlist url here</h1>
            <AiOutlineLink/>
        </div>
        <label className='text-sm sm:text-md' htmlFor="url">URL:</label>
        <input placeholder='https://www.youtube.com/watch?v=123456' className='w-full py-1 sm:py-2 mt-1 text-xs sm:text-sm px-3 text-black border outline-none transition duration-300 focus:border-orange-400 border-spacing-1 border-slate-300' type="text" id='url' name='url' />
        <button className='w-full p-2 sm:text-md text-sm sm:p-3 mt-3 bg-stone-900 hover:bg-green-700 active:bg-green-500'>Search</button>
    </form>
    )
}