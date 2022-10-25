// pages/home-video/index.js
import {getTopMVs} from "../../service/video-api"
Page({

    data: {
        topMVs:[],
    },

    onLoad(options) {
    this.getTopMVsData(0)
    },

// 封装方法
   async getTopMVsData(offset){

    // 请求数据
    const res = await getTopMVs(offset);
    if(!res.data){
          wx.showToast({
            title: '没有更多数据了',
            icon:"none"
          })
      return false
    }
    // console.log(res);
    let newData= this.data.topMVs
    if(offset===0){
        newData= res.data

    }else{
        newData = newData.concat(res.data)
        // console.log(res);
    }
    this.setData({topMVs:newData})


    wx.stopPullDownRefresh()
    }

// 下拉
    ,async onPullDownRefresh(){
    // console.log("下拉");
    this.getTopMVsData(0)
    }


// 到达底部
    ,async onReachBottom(){
        // console.log("到底部了");
        this.getTopMVsData(this.data.topMVs.length)
    }


// 点击跳到详情页
,videoItemClick(e){
    wx.navigateTo({
      url: `/pages/video-detail/index?id=${e.target.dataset.id}`,
    })
}


})