type Video = {
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
    }
}