"use client";
import React , {useEffect , useState} from 'react'
import VideoContainer from '@/components/VideoContainer';
import {useSelector} from 'react-redux';
import { Rootstate } from '../Redux/store';

export default async function page() {
  const VideoData = useSelector((state:Rootstate) => state.youtube.video);

  return (
    <div className='mt-[150px] w-full flex  flex-col space-y-10 my-20 justify-center items-center'>
      {VideoData && VideoData.map((video:Video) => {
        return(
          <div className='w-[80%] xl:w-[60%] bg-neutral-800 shadow-lg' key={video.id}>
              <VideoContainer data={video}/>
          </div>
        )
      })}
    </div>
  )
}
