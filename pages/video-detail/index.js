// pages/home-video-detail/index.js
import {getMVsData,getMVsAddress,getMVsRelated} from "../../service/video-api"
// import {itemsInArray} from "../../utils/filter"

Page({
    data: {
        mvsdata:{}
        ,mvsaddress:{}
        ,mvsrelated:{}
    },

    onLoad(options) {
        // 获取数据
        const id = options.id
        this.getVideoInfo(id)
    },
    getVideoInfo: function(id) {
        // 1.mv detail
        getMVsData(id).then(res => {
          this.setData({ mvsdata: res.data })
        })
    
        // 2.mv url
        getMVsAddress(id).then(res => {
          this.setData({ mvsaddress: res.data })
          console.log(res);
        })
    
        // 3.related mv
        getMVsRelated(id).then(res => {
          this.setData({ mvsrelated: res.data })
        })
      },
    
    
})