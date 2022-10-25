import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getSongLyric } from '../service/musicplayer'
import { parseLyric } from '../utils/parse-lyric'
    
    
    // 创建音乐播放器
    const innerAudioContext = wx.createInnerAudioContext()

    const playerStore = new HYEventStore({
        state: {
            id:0,

            isFirstPlay: true,

            currentSong:{},
            durationTime:0,
            lyricInfos:[],
            currentTime:0,
            currentLyricIndex: 0,
            currentLyricText: "",

            isPlaying: true,

            playModeIndex: 0, // 0: 循环播放 1: 单曲循环 2: 随机播放
            playListSongs: [],
            playListIndex: 0
        },
        actions: {
            playMusicWithSongIdAction(ctx,{id}) {
                ctx.id = id;
                // 根据id请求数据
                    //获取歌曲的详情
                getSongDetail(id).then((res)=>{
                    ctx.currentSong = res.songs[0]
                    ctx.durationTime = res.songs[0].dt
                })
                    //获取歌词
                getSongLyric(id).then((res)=>{
                    const lyricString = res.lrc.lyric
                    const lyrics = parseLyric(lyricString)
                    ctx.lyricInfos = lyrics
                })
                    //播放对应id的歌曲
                innerAudioContext.stop() 
                innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
                innerAudioContext.autoplay = true 

                    // 3.监听audioContext一些事件
                this.dispatch("setupAudioContextListenerAction")
            },

            setupAudioContextListenerAction(ctx) {

                // 监听歌曲是否可以播放
                    innerAudioContext.onCanplay(()=>{
                    innerAudioContext.play()
                }) 

                // 监听时间改变
                    //获取当前时间
                innerAudioContext.onTimeUpdate(()=>{
                    const currentTime = innerAudioContext.currentTime * 1000;
                    ctx.currentTime = currentTime
        
                    // 根据当前时间去查找播放的歌词
                    if (!ctx.lyricInfos.length) return
                    let i = 0
                    for (; i < ctx.lyricInfos.length; i++) {
                        const lyricInfos = ctx.lyricInfos[i]
                        if (currentTime < lyricInfos.time) {
                        break
                        }
                    }
                    // 设置当前歌词的索引和内容
                    const currentIndex = i - 1
                    if (ctx.currentLyricIndex !== currentIndex) {
                        const currentLyricInfo = ctx.lyricInfos[currentIndex]
                        ctx.currentLyricIndex = currentIndex
                        ctx.currentLyricText = currentLyricInfo.text
                    }
                })
                // 监听歌曲播放完成
                innerAudioContext.onEnded(() => {
                    this.dispatch("changeNewMusicAction")
                })
            },

            changeMusicPlayStatusAction(ctx, isPlaying = true) {
                ctx.isPlaying = isPlaying
                ctx.isPlaying ? innerAudioContext.play(): innerAudioContext.pause()
              },
          
            changeNewMusicAction(ctx, isNext = true) {
                // 1.获取当前索引
                let index = ctx.playListIndex
                // 2.根据不同的播放模式, 获取下一首歌的索引
                switch(ctx.playModeIndex) {
                  case 0: // 顺序播放
                    index = isNext ? index + 1: index -1
                    if (index === -1) index = ctx.playListSongs.length - 1
                    if (index === ctx.playListSongs.length) index = 0
                    break
                  case 1: // 单曲循环
                    break
                  case 2: // 随机播放
                    index = Math.floor(Math.random() * ctx.playListSongs.length)
                    break
                }
                // 3.获取歌曲
                let currentSong = ctx.playListSongs[index]
                if (!currentSong) {
                  currentSong = ctx.currentSong
                } else {
                  // 记录最新的索引
                  ctx.playListIndex = index
                }
                // 4.播放新的歌曲
                this.dispatch("playMusicWithSongIdAction", { id: currentSong.id, isRefresh: true })
              }
            
        }
    })






    export {
        innerAudioContext,
        playerStore
    }