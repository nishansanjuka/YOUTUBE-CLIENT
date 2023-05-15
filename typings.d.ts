type Video = {
    kind:string,
    id:string,
    snippet:{
        title:string,
        thumbnails:{
            standard:{
                url:string,
                width:number,
                height:number
            }
        },
        resourceId:{
            videoId:string
        }
    },
    contentDetails:{
        duration?:string
    }
}

type AxData = {
    responseType?:string,
    onDownloadProgress?:any,
    headers?:{
        Authorization?:string,
        "Content-Type"?:string
    }
}

type SpanRef = React.RefObject<HTMLSpanElement>;
type ParagraphRef = React.RefObject<HTMLParagraphElement>;
type NotifyRef = React.RefObject<HTMLDivElement>;


type DurationData = {
    days:number,
    hours:number,
    minutes:number,
    months:number,
    seconds:number,
    weeks:number,
    years:number
}