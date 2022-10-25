import {request} from "./index"


// export function getSongUrl(id){//获取音乐的url
//    return request("/song/url","GET",{id:id})
// }
export function getSongDetail(id){//获取音乐详情
    return request("/song/detail","GET",{ids:id})
}
export function getSongLyric(id){//获取音乐的歌词
    return request("/lyric","GET",{id:id})
}