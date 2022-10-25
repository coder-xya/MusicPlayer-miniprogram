// components/song-menu-v1/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: "推荐歌单"
          },
          songMenu: {
            type: Array,
            value: []
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
        handleMenuItemClick(event){//歌单点击
            const id = event.currentTarget.dataset.item.id
            const type = "songMenu"
            wx.navigateTo({
              url: `/pages/song-detail/index?id=${id}&type=${type}`,
            })
        }
    }
})
