import React from 'react'
import { BsFillEmojiNeutralFill } from 'react-icons/bs'

export default function Custom404() {
  return (
    <div className='w-full h-screen flex-col space-y-10 text-neutral-600 flex justify-center items-center'>
      <div className='w-fit flex flex-col space-y-2 items-center'>
        <BsFillEmojiNeutralFill className='text-5xl text-center'/>
        <h1 className='text-4xl text-center'>Oops!</h1>
      </div>
      <h2 className='text-xl uppercase'>Nothing to see here</h2>
    </div>
  )
}
