// pages/song-detail/index.js
import {getMusicMenuDetail,getNewMusicRecommended,getSongMenuInfo} from "../../service/music-api"
import { playerStore } from "../../store/index";

Page({
    data: {
        name:"",
        type:"",
        musicList:[],
        newSongsrecommended:[],
        songMenuInfo:null
    },

    onLoad(options) {
        const id = options.id
        this.setData({name:options.name})
        this.setData({type:options.type})

        if(id==="new"){
            this.getRecommendedSongs()
        }else{
            this.getRankingSongs(id)
        }

    },

    getRecommendedSongs(){//点击歌单更多
        getNewMusicRecommended().then((res)=>{//最新推荐歌曲
            this.setData({musicList:res.result})
            // console.log(res);
        })
    },
    getRankingSongs(id){//获取排行榜榜单里的歌曲
        getMusicMenuDetail(id).then((res)=>{//排行榜歌曲
            this.setData({musicList:res.songs})
            // console.log(res.songs);
        })
        getSongMenuInfo(id).then((res)=>{//歌单详情
            this.setData({songMenuInfo:res.playlist})
            // console.log(this.data.songMenuInfo);
        })
    },
    // 获取当前播放列表与歌曲索引
    handleSongItemClick: function(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState("playListSongs", this.data.musicList)
    playerStore.setState("playListIndex", index)
    },

    onUnload() {

    },
})