import {AiOutlineLink} from 'react-icons/ai';
import axios from 'axios';
import urlquery from 'url';
import { redirect } from 'next/navigation';

async function GetSongs(data:FormData){
    "use server";
    const url = data.get('url'); 
    const is_playlist:boolean = urlquery.parse(`${url}` , true).query.list !== undefined;
    try {
        const video_data = await YoutubeData(url , is_playlist);
    } catch (error:any) {
        console.log(error.message);
    }
}

const YoutubeData = async(url:any , is_playlist:boolean):Promise<Video[]> => {
    return await new Promise(async(resolve:any,reject:any) => {
        const youtube_api_key = process.env.API_KEY;
        try {
                if(is_playlist)
                {
                    const playList_Id = urlquery.parse(`${url}` , true).query.list;
                    const res = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playList_Id}&key=${youtube_api_key}`);
                    const videos:Video[] = res.data.items;
                    resolve(videos);
                }
                else
                {
                    const videoId = urlquery.parse(`${url}` , true).query.v;
                    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'snippet',
                        id: videoId,
                        key: youtube_api_key,
                    },
                    });
                    const video:Video[] = response.data.items;
                    resolve(video);
                }
        } catch (error:any) {
            reject(error)
        }
    })
}


export default function Form(){
    return (
    <>
        <form action={GetSongs} className='w-[95%] sm:w-[50%]  mx-auto mt-[100px]  md:mt-[140px] 2xl:mt-[200px] h-fit text-white p-6 sm:p-10 bg-neutral-800 form-anim rounded-sm'>
            <div className='text-xl capitalize mb-5 flex items-center space-x-1'>
                <h1 className='text-center text-sm sm:text-md'>Paste your youtube <span className='text-green-400'>playlist</span> or <span className='text-green-400'>video</span> url here</h1>
                <AiOutlineLink/>
            </div>
            <label className='text-sm sm:text-md' htmlFor="url">URL:</label>
            <input placeholder='https://www.youtube.com/watch?v=123456' className='w-full py-1 sm:py-2 mt-1 text-xs sm:text-sm px-3 text-black border outline-none transition duration-300 focus:border-orange-400 border-spacing-1 border-slate-300' type="text" id='url' name='url' />
            <button className='w-full p-2 sm:text-md text-sm sm:p-3 mt-3 bg-stone-900 hover:bg-green-700 active:bg-green-500 transition duration-300'>Search</button>
        </form>
    </>
    )
}