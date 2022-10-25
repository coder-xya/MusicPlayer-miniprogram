import { playerStore } from "../../store/index";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: Number,
            value: 0
          },
        item: {
            type: Object,
            value: {}
          }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        songsItemClick(event){
           const id = event.currentTarget.dataset.id;
            if(id) {
                wx.navigateTo({
                    url: `/pages/song-player/index?id=${id}`,
                  })
                // 对歌曲的数据请求和其他操作
                playerStore.dispatch("playMusicWithSongIdAction", { id })
            }else{
                wx.showToast({
                    title: '歌曲还没有更新',
                    icon:'error',
                    mask:'false'
                  })
            }
            // 获取当前播放列表和播放歌曲的索引
        }
    }
})
