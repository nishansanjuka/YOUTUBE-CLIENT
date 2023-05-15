"use cleint";
import {useEffect , useState , useRef, CSSProperties} from 'react';
import Image from 'next/image';
import React from 'react'
import axios from 'axios';
import { BeatLoader  } from 'react-spinners';

import { GetDuration } from '@/app/_actions';


let durationforId:string;
type Props = {
    data:Video
}

export default function VideoContainer({data}:Props) {


  const [videoId, setvideoId] = useState<string>("");
  const [IsData, setIsData] = useState<boolean>(false);
  const [IsDownloading, setIsDownloading] = useState<boolean>(false);
  const Progressbar:SpanRef = useRef<HTMLSpanElement>(null);
  const ProgressbarText:ParagraphRef = useRef<HTMLParagraphElement>(null);
  const [Duration, setDuration] = useState<string>("");
  const [DurationObject, setDurationObject] = useState<DurationData | null>(null);
  const options:AxData = {
    responseType:'blob',
    onDownloadProgress :DownloadProgress,
    headers:{
      Authorization:"Bearer Ew-iPP6QvLR_jl26Scq5Ox8zmQ0De-B_iduYQaJMvULbU2Nh9X1hn_e79zR1EV53KRs",
      "Content-Type":"application/x-www-form-urlencoded"
    }
  }

  useEffect(() => {
    if(data.status && data.status.privacyStatus === "public")
    {
      if(data.kind === 'youtube#playlistItem')
      {
        setvideoId(data.snippet.resourceId.videoId);
        durationforId = data.snippet.resourceId.videoId;
      }
      else if(data.kind === 'youtube#video'){
        setvideoId(data.id);
        durationforId = data.id;
      }
      else
      {
        throw new Error(`un recognized response kind contact developer (INTERNAL SERVER ERROR)`);
      }
    }
    
  }, [data])  


  useEffect(() => {
    const dos = async() => {
      const duration:DurationData = await GetDuration(durationforId);
      setDurationObject(duration);
      let dustring = `${duration.years > 0 ? duration.years + ":" : "" }${duration.months > 0 ? duration.months + ":" : "" }${duration.days > 0 ? duration.days + ":" : ""}${duration.hours > 0 ? duration.hours + ":" : ""}${duration.minutes > 0 ? duration.minutes + ":" : "" }${duration.seconds> 0 ? duration.seconds: ""}`
      const modifiedString = dustring.replace(/(\d+)/g, (match) => {
        return match.padStart(2, '0');
      });
      setDuration(modifiedString);
    }   
    dos();

    
  }, [])

  



  async function DownloadProgress(progressEvent:any) {
    const percentage = Math.floor((progressEvent.loaded / progressEvent.total)*100);
    const percentageText = `${percentage}` + "%" as string;
    if(Progressbar.current && ProgressbarText.current)
    {
      ProgressbarText.current.textContent = `${percentageText}`;
      Progressbar.current.style.width = percentageText;
    }

  }

  const HandleDownload = async() => {
    setIsDownloading(true);
    setIsData(true);
    try
    {
      const res = await axios.get(`https://youtube-mp3-api.onrender.com/get-mp3?youtube=https://www.youtube.com/watch?v=${videoId}` , options as any);
      setIsDownloading(false);
      try
      {
        await downloadBlob(res.data , `${data.snippet.title}.mp3`);
      }
      catch(e:any)
      {
        setIsDownloading(false);
        setIsData(false);
        throw new Error(e.message);
      }
    }
    catch(e:any)
    {
      setIsDownloading(false);
      setIsData(false);
      console.log(e.message)
    }
  }


  async function downloadBlob(blob:Blob, filename:string) {
    return await new Promise(async(resolve:any,reject:any) => {
      try
      {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
        resolve('finished')
      }
      catch(e:any)
      {
        reject(e.message);
      }
    })
  }
  



  


  return (
    <div className='w-full flex flex-col justify-center items-start sm:justify-start sm:flex-row sm:items-center'>
      <div className='sm:h-[150px] h-fit px-5 sm:px-0'>
        <Image className='sm:h-[150px] py-2 sm:p-2 w-full' src={data.snippet.thumbnails.standard.url} alt={data.snippet.thumbnails.standard.url} width={data.snippet.thumbnails.standard.width} height={data.snippet.thumbnails.standard.height} />
      </div>
      <div className='flex-1 flex flex-col justify-center px-5 sm:px-10 pt-2 pb-5 sm:py-5 '>
        <h1 className=' text-white uppercase md:text-sm xl:text-lg mb-2'>{data.snippet.title}</h1>
        <p className='text-neutral-400 text-xs mb-2 font-light'>youtube video address: <a target='_blank' className='underline underline-offset-2' href={`https://www.youtube.com/watch?v=${videoId}`}>{`https://www.youtube.com/watch?v=${videoId}`}</a></p>
        {Duration && (<p className='text-neutral-500 text-xs font-light mb-2'>Duration - {Duration}</p>)}
        {DurationObject && DurationObject?.minutes < 5 ? <button onClick={HandleDownload} className='w-fit flex items-center hover:bg-green-500 active:bg-violet-700 transition duration-500 px-5 py-2 font-extralight bg-green-700 text-white rounded text-xs'>
          {IsDownloading ? "Downloading" :"Download"}
          {IsDownloading && (<BeatLoader 
            className='ml-2'
            color="#CBCBCB"
            size={5}
          />)}
        </button> : <button disabled className='w-fit hover:bg-green-500 active:bg-violet-700 transition duration-500 px-5 py-2 font-extralight bg-green-700 text-white rounded text-xs disabled:bg-red-800'>Can&apos;t Download</button>}
        {IsData && (
          <div className='flex items-center mt-3 space-x-2'>
            <span className='relative w-full bg-zinc-900 h-[1px] '>
              <span ref={Progressbar} id={data.id} className='absolute transition duration-700 top-0 left-0 gradient bottom-0'></span>
            </span>
            <p ref={ProgressbarText} className='text-xs font-light text-neutral-500'>{ProgressbarText.current?.textContent || `0%`}</p>
          </div>
        )}
      </div>
    </div>
  )
}
