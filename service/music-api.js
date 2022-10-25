import {request} from "./index"

function getBanners(){//获取轮播图
    return request("/banner","GET",{type:1})
}
function getNewMusicRecommended(){//最新推荐歌曲
    return request("/personalized/newsong","GET",{limit:99})
}
function getMusicMenuRecommended() {//歌单推荐
    return request("/personalized","GET",{limit:10})
}
function getAllRanking() {//获取所有榜单详情
    return request("/toplist/detail","GET",{})
}
function getMusicMenuDetail(id) {//获取歌单里面的歌曲详情
    return request("/playlist/track/all","GET",{id})
}
function getSongMenuInfo(id) {//歌单详情
    return request("/playlist/detail","GET",{id})
}

export {
    getBanners
    ,getNewMusicRecommended
    ,getMusicMenuRecommended
    ,getAllRanking
    ,getMusicMenuDetail
    ,getSongMenuInfo
}