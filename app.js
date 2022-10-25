// app.js

import {request} from "./service/index"



App({

  onLaunch(){
      
    request("/register/anonimous","GET",{})// 临时登录获取cookie

    const info = wx.getSystemInfoSync()//获取屏幕信息
    
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    this.globalData.statusBarHeight = info.statusBarHeight
  },
  globalData: {//屏幕信息
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44
  }



})
