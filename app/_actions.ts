"use server";
import axios from 'axios';
import urlquery from 'url';
import {parse} from 'iso8601-duration';

const youtube_api_key = process.env.API_KEY;

export async function GetSongs(data:FormData):Promise<Video[]>{
    return await new Promise(async(resolve:any , reject:any) => {
        const url = data.get('url');
        const is_playlist:boolean = urlquery.parse(`${url}` , true).query.list !== undefined;
        try {
            const video_data:Video[] = await YoutubeData(url , is_playlist);
            resolve(video_data);
        } catch (error:any) {
            console.log(error.message);
            reject(error);
        }
    });
    
}


const YoutubeData = async(url:any , is_playlist:boolean):Promise<Video[]> => {
    return await new Promise(async(resolve:any,reject:any) => {
        try {
                if(is_playlist)
                {
                    const playList_Id = urlquery.parse(`${url}` , true).query.list;
                    let res = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&part=status&playlistId=${playList_Id}&key=${youtube_api_key}`);
                    let videos:Video[] = res.data.items;
                    const additionalPagesData:Video[] = await AdditionalPages(res , playList_Id);
                    videos = videos.concat(additionalPagesData);
                    resolve(videos);
                }
                else
                {
                    const videoId = urlquery.parse(`${url}` , true).query.v;
                    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=status', {
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


const AdditionalPages = async(res:any , playList_Id:any):Promise<Video[]> => {
    let additionals:Video[] = new Array();
    return await new Promise(async(resolve:any , reject:any) => {
        while(res.data.nextPageToken)
        {
            res = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&&maxResults=50&part=status&playlistId=${playList_Id}&key=${youtube_api_key}&pageToken=${res.data.nextPageToken}`);
            additionals = additionals.concat(res.data.items);
        }
        resolve(additionals);
    })
}

export async function GetDuration(videoId:string):Promise<DurationData>
{
    return await new Promise(async(resolve:any,reject:any) => {
        try {
            const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtube_api_key}&part=contentDetails`)

            const {contentDetails:{duration}}:Video = res.data.items[0];
            resolve(parse(`${duration}`) as DurationData);
            
        } catch (error:any) {
            console.log(error.message);
            reject(error.message)
        }
    })
}