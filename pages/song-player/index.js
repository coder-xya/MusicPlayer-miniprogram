import { innerAudioContext, playerStore } from '../../store/index'

const playModeNames = ["order", "repeat", "random"]

Page({

    data: {
        id:0,

        currentSong:{},
        durationTime:0,
        lyricInfos:[],

        currentTime:0,
        currentLyricIndex:0,
        currentLyricText:"",

        // 页面相关
        contentHeight:0,
        currentPage: 0,
        sliderValue:0,
        lyricScrollTop: 0,

        playModeIndex: 0,
        playModeName: "order",

        isPlaying: false,
        playingName: "pause",

        playListSongs:[],

        isPopupShow:false,


    },

    onLoad(options) {

        // 获取传入的id
        const id = options.id
        this.setData({ id })
        // 
        this.setupPlayerStoreListener()

        //动态计算内容高度
        const globalData = getApp().globalData
        const screenHeight = globalData.screenHeight
        const statusBarHeight = globalData.statusBarHeight
        const navBarHeight = globalData.navBarHeight
        const contentHeight = screenHeight - statusBarHeight - navBarHeight
        this.setData({ contentHeight })
    },

    // ===================事件处理=======================
        //歌词与歌曲界面滑动
        handleSwiperChange(){
            if(this.data.currentPage===0){
                this.setData({currentPage:1})
            }else if(this.data.currentPage===1){
                this.setData({currentPage:0})
            }
        },
        // 点击slider
        handleSliderChange(event) {
            const value = event.detail.value;
            const currentTime = this.data.durationTime * value / 100
            // 从指定进度开始播放
            this.setData({currentTime})
            innerAudioContext.pause()
            innerAudioContext.seek(currentTime/1000)
        },
        // 切换播放模式
        handleModeBtnClick(){
            // 计算最新的playModeIndex
            let playModeIndex = this.data.playModeIndex + 1
            if (playModeIndex === 3) playModeIndex = 0

            // 设置playerStore中的playModeIndex
            playerStore.setState("playModeIndex", playModeIndex)
        },
        // 播放暂停
        handlePlayBtnClick: function() {
            playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
          },

        handlePrevBtnClick: function() {
            playerStore.dispatch("changeNewMusicAction", false)
        },
        handleNextBtnClick: function() {
            playerStore.dispatch("changeNewMusicAction")
        },
        // 弹出层显示隐藏
        popupShow() {
          let isPopupShow = this.data.isPopupShow
          this.setData({isPopupShow:!isPopupShow})
        },


    //========================数据监听=====================
        setupPlayerStoreListener(){
            // 监听currentSong/durationTime/lyricInfos/playListSongs
            playerStore.onStates(["currentSong", "durationTime", "lyricInfos","playListSongs"], ({
                currentSong,
                durationTime,
                lyricInfos,
                playListSongs
            }) => {
                if (currentSong) this.setData({ currentSong })
                if (durationTime) this.setData({ durationTime })
                if (lyricInfos) this.setData({ lyricInfos })
                if (playListSongs) this.setData({playListSongs})
            })
            playerStore.setState("playListSongs",this.data.playListSongs)
            // 监听currentTime/currentLyricIndex/currentLyricText
            playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
                currentTime,
                currentLyricIndex,
                currentLyricText
            }) => {
                // 时间变化
                if (currentTime) {
                    const sliderValue = currentTime / this.data.durationTime * 100
                    this.setData({ currentTime, sliderValue })
                }
                // 歌词变化
                if (currentLyricIndex) {
                    this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
                }
                if (currentLyricText) {
                    this.setData({ currentLyricText })
                }
            })
            // 监听播放模式相关的数据
            playerStore.onStates(["playModeIndex", "isPlaying"], ({playModeIndex, isPlaying}) => {
                if (playModeIndex !== undefined) {
                    this.setData({ 
                        playModeIndex, 
                        playModeName: playModeNames[playModeIndex] 
                })
                }
                if (isPlaying !== undefined) {
                    this.setData({ 
                        isPlaying,
                        playingName: isPlaying ? "pause": "resume" 
                })
                }
            })

        }

})