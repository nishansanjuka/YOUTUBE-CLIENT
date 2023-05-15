"use client";
import React, { useEffect } from 'react'
import VideoContainer from '@/components/VideoContainer';
import {useSelector , useDispatch} from 'react-redux';
import { Rootstate } from '../Redux/store';
import { setIsSearching } from '../Redux/Features/search/searchSlice';

const Download = async() => {
  
  const VideoData = useSelector((state:Rootstate) => state.youtube.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsSearching(false));
  },[])
  

  return (
    <div className='mt-[150px] w-full flex  flex-col space-y-10 my-20 justify-center items-center'>
      <div className='w-[80%] xl:w-[60%]'>
        {VideoData && VideoData?.length > 1 && (<p className='text-neutral-500 font-light underline underline-offset-4 capitalize'>{VideoData?.filter(item => item.status && item.status.privacyStatus === 'public').length} public media items found</p>)}
      </div>
      {VideoData && VideoData.map((video:Video) => {
        if(video.status && video.status.privacyStatus === 'public'){
          return(
            <div className='w-[80%] xl:w-[60%] bg-neutral-800 shadow-lg' key={`${video.etag} ${video.id}`}>
                <VideoContainer data={video}/>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Download;
