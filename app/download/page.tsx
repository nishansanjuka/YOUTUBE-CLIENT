"use client";
import React, { useEffect, useState } from 'react'
import VideoContainer from '@/components/VideoContainer';
import {useSelector , useDispatch, Provider} from 'react-redux';
import { Rootstate, store } from '../Redux/store';
import { setIsSearching } from '../Redux/Features/search/searchSlice';


const Download = async() => {
  
  const VideoData:Video[] = useSelector((state:Rootstate) => state.youtube.video) as Video[];

  const [isDownloadAll, setisDownloadAll] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!VideoData) {
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
    else
    {
      dispatch(setIsSearching(false));
    }
    
  },[])
  

  const HandleRedirect = () => {
    window.location.href = '/';
  }

  const HandleAllDownload = () => {
    setisDownloadAll(!isDownloadAll);
  }

  useEffect(() => {
    if(isDownloadAll)
    {
      console.log('downloading all ...');
    }
  }, [isDownloadAll])
  


  if(VideoData && VideoData?.length > 0)
  {
    return (
      <Provider  store={store}>
          <title>{VideoData[0].snippet.title}</title>
          <div className='mt-[150px] w-full flex  flex-col space-y-10 my-20 justify-center items-center'>
          <div className='w-[80%] xl:w-[60%] flex justify-between items-center'>
            {VideoData && VideoData?.length > 1 && (<p className='text-neutral-500 font-light underline underline-offset-4 capitalize'>{VideoData?.filter(item => item.status && item.status.privacyStatus === 'public').length} public media items found</p>)}

            <button onClick={HandleAllDownload} className='w-fit flex items-center hover:bg-green-500 active:bg-violet-700 transition duration-500 px-5 py-2 font-extralight bg-green-700 text-white rounded text-xs'>Download All</button>
          </div>
          {VideoData && VideoData.map((video:Video) => {
            if(video.status && video.status.privacyStatus === 'public'){
              return(
                <div className='w-[80%] xl:w-[60%] bg-neutral-800 shadow-lg' key={`${video.etag} ${video.id}`}>
                    <VideoContainer data={video} downloadAll={isDownloadAll}/>
                </div>
              )
            }
          })}
        </div>
      </Provider>
    )
  }
  else
  {
    return(
      <Provider store={store}>
          <head>
            <title>Redirecting...</title>
          </head>
          <div className='w-full h-screen flex justify-center items-center text-white flex-col space-y-5'>
            <p className='text-neutral-600 capitalize text:xs sm:text-lg'>please return to home and search again !!!</p>
            <p className='text-neutral-600 capitalize text:xs sm:text-lg'>redirecting ...</p>
            <div className='w-full flex justify-center items-center mt-10'>
                <button onClick={HandleRedirect} className='text-white bg-green-900 hover:bg-green-600 transition duration-300 text-xs rounded-sm tracking-[4px] uppercase px-2 sm:px-5 py-3'>Back to Home</button>
            </div>
          </div>
      </Provider>
    )
  }
}

export default Download;
