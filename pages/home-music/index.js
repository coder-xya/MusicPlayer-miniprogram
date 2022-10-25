// pages/home-music/index.js
import {newSongsStore,playerStore} from "../../store/index"

import {getBanners,getMusicMenuRecommended,getAllRanking,getMusicMenuDetail} from "../../service/music-api"

Page({
    data: {
        banners:[],
        newMusicRecommended:[],
        musicMenuRecommended:[],
        musicRankings:[],

        currentSong: {},
        isPlaying: false,
        playAnimState: "paused",

        playListSongs:[],

        isPopupShow:false,
    },

    onLoad(options) {
        // playerStore.dispatch("playMusicWithSongIdAction", { id })

        this.getPageData()//获取页面数据

        newSongsStore.dispatch("getNewSongsAction")//发起共享数据的请求
        newSongsStore.onState("newSongs",(res)=>{//从store获取共享的数据
            if(!res) return
                let rest= Array.from(res)//强制转换成数组类型
                const newMusicRecommended=rest.slice(0,6)
                this.setData({newMusicRecommended})
                // console.log(this.data.newMusicRecommended);
        })
        // 播放器监听，从Store获取数据
        this.setupPlayerStoreListener()
    },
    
    getPageData:function(){//获取页面数据
        getBanners().then((res)=>{//获取轮播图
            this.setData({banners:res.banners})
            // console.log(res.banners);
        })  
        getMusicMenuRecommended().then((res)=>{//获取推荐歌单
            this.setData({musicMenuRecommended:res.result})
            // console.log(res);
        })
        getAllRanking().then((res)=>{//获取所有榜单详情

            this.setData({musicRankings:res.list.slice(0,4)})
            // console.log(this.data.musicRankings);
        })
    },
    // ========================播放器监听===========================
    setupPlayerStoreListener(){
    playerStore.onStates(["currentSong", "isPlaying" ], ({currentSong, isPlaying}) => {
        if (currentSong) this.setData({ currentSong })
        if (isPlaying !== undefined) {
          this.setData({ 
            isPlaying, 
            playAnimState: isPlaying ? "running": "paused" ,
          })
        }
      })
    },

    // =============================事件处理=========================

    handleMoreSongsClick(){//最新推荐歌曲(点击righticon)
        const id = "new"
        const name = "最新推荐"
        this.navigateToDetailSongsPage(id,name,"songList")
    },

    handleRankingItemClick(event){//排行榜点击
        const id = event.currentTarget.dataset.id
        const name = event.currentTarget.dataset.name
        this.navigateToDetailSongsPage(id,name,"songList")
    },
    navigateToDetailSongsPage(id,name,type){//跳转到详情界面
        wx.navigateTo({
            url: `/pages/song-detail/index?id=${id}&name=${name}&type=${type}`,
          })
    },
    bannersItemClick(event){//轮播图点击跳转页面
        // const id = event.currentTarget.dataset.id;
        // // console.log(event);
        // if(id){
        //     wx.navigateTo({
        //         url: `/pages/song-player/index?id=${id}`,
        //       })
        // }else{
        //     wx.showToast({
        //       title: '歌曲还没有更新',
        //       icon:'error',
        //       mask:'false'
        //     })
        // }
     },

    //  播放列表和播放歌曲索引
    handleSongItemClick: function(event) {
        const index = event.currentTarget.dataset.index
        playerStore.setState("playListSongs", this.data.newMusicRecommended)
        playerStore.setState("playListIndex", index) 
      },

    // 播放工具栏的播放和暂停
    handlePlayBtnClick: function() {
        playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
      },

    handlePlayBarClick: function() {
      wx.navigateTo({
        url: '/pages/song-player/index?id=' + this.data.currentSong.id,
      })
    },
    // 弹出层显示隐藏
    popupShow() {
      let isPopupShow = this.data.isPopupShow
      this.setData({isPopupShow:!isPopupShow})
      // console.log(this.data.playListSongs);
      playerStore.onStates(["playListSongs"], ({playListSongs}) => {
        if(playListSongs) this.setData({ playListSongs })
        // console.log(this.data.playListSongs);
      })
    },
      //去搜索页面
    handleSearchClick() {
        wx.navigateTo({
          url: '/pages/music-search/index',
        })
      },
})