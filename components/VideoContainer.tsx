"use cleint";
import {useEffect , useState , useRef} from 'react';
import Image from 'next/image';
import React from 'react'
import axios, { AxiosProgressEvent } from 'axios';
import { BeatLoader  } from 'react-spinners';
import { GetDuration } from '@/app/_actions';


let durationforId:string;
type Props = {
    data:Video,
    downloadAll:boolean
}

export default function VideoContainer({data , downloadAll}:Props) {


  const [videoId, setvideoId] = useState<string>("");
  const [IsData, setIsData] = useState<boolean>(false);
  const [IsDownloading, setIsDownloading] = useState<boolean>(false);
  const Progressbar:SpanRef = useRef<HTMLSpanElement>(null);
  const ProgressbarText:ParagraphRef = useRef<HTMLParagraphElement>(null);
  const [Duration, setDuration] = useState<string>("");
  const [checkDownloaded, setCheckDownloaded] = useState(false);

  const options:AxData = {
    responseType:'arraybuffer',
    onDownloadProgress :DownloadProgress,
    headers:{
      Authorization:"Bearer Ew-iPP6QvLR_jl26Scq5Ox8zmQ0De-B_iduYQaJMvULbU2Nh9X1hn_e79zR1EV53KRs",
      "Content-Type":"application/x-www-form-urlencoded"
    },
    timeout:3600000
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
      let dustring = `${duration.years > 0 ? duration.years + ":" : "" }${duration.months > 0 ? duration.months + ":" : "" }${duration.days > 0 ? duration.days + ":" : ""}${duration.hours > 0 ? duration.hours + ":" : ""}${duration.minutes > 0 ? duration.minutes + ":" : "" }${duration.seconds> 0 ? duration.seconds: ""}`
      const modifiedString = dustring.replace(/(\d+)/g, (match) => {
        return match.padStart(2, '0');
      });

      if(duration.minutes == 0)
      {
        setDuration("00:"+modifiedString);
      }
      else
      {
        setDuration(modifiedString);
      }
    }   
    dos();

    
  }, [])

  
  useEffect(() => {
    async function Dos(){
      await HandleDownload();
    }

    if(downloadAll)
    {
      Dos();
    }
  }, [downloadAll])
  

  



  async function DownloadProgress(progressEvent:AxiosProgressEvent) {
    try {
      if(progressEvent.total)
      {
        const percentage = Math.floor((progressEvent.loaded / progressEvent.total)*100);
        const percentageText = `${percentage}` + "%" as string;
        if(Progressbar.current && ProgressbarText.current)
        {
          ProgressbarText.current.textContent = `${percentageText}`;
          Progressbar.current.style.width = percentageText;
        }
      }
      
      
    } catch (error) {
      console.log(error);
    }

  }
  

  const HandleDownload = async() => {
    setIsDownloading(true);
    setIsData(true);
    try
    {
      const BASE_URL = 'https://youtube-mp3-api.onrender.com';
      // const BASE_URL_LOCAL = 'http://localhost:5252';
      const res = await axios.get(`${BASE_URL}/get-mp3?youtube=https://www.youtube.com/watch?v=${videoId}` , options as any);
      const audioBuffer = Buffer.from(res.data);
      try
      {
        await downloadBlob(new Blob([audioBuffer]), `${data.snippet.title}.mp3`);
        if(Progressbar.current && ProgressbarText.current)
        {
            ProgressbarText.current.textContent = '0%';
            Progressbar.current.style.width = "0%";
        }
        setIsDownloading(false);
        setIsData(false);
        setCheckDownloaded(true);
        downloadAll = false;
      }
      catch(e:any)
      {
        setIsDownloading(false);
        setIsData(false);
        console.log(e);
        throw new Error(e.message);
        
      }
    }
    catch(e:any)
    {
      setIsDownloading(false);
      setIsData(false);
      console.log(e);
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
        <button disabled={checkDownloaded} onClick={HandleDownload} className='w-fit flex items-center hover:bg-green-500 disabled:bg-stone-950 active:bg-violet-700 transition duration-500 px-5 py-2 font-extralight tracking-wider bg-green-700 text-white rounded text-xs'>
          {IsDownloading ? "Downloading" :"Download"}
          {checkDownloaded && "ed !"}
          {IsDownloading && (<BeatLoader 
            className='ml-2'
            color="#CBCBCB"
            size={5}
          />)}
        </button>
        {IsData && (
          <div className='flex items-center mt-3 space-x-2'>
            <span className='relative w-full bg-zinc-900 h-[1px] '>
              <span ref={Progressbar} id={data.id} className='absolute transition-transform duration-700 top-0 left-0 gradient bottom-0'></span>
            </span>
            <p ref={ProgressbarText} className='text-xs font-light text-neutral-500'>{ProgressbarText.current?.textContent || `0%`}</p>
          </div>
        )}
      </div>
    </div>
  )
}
