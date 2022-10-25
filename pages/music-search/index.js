// pages/music-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from "../../service/search"


Page({
    data: {
        hotKeywords: [],
        suggestWords: [],
        searchValue: "",
        resultSongs:[]
    },

    onLoad(options) {
        // 获取页面数据
        this.getPageData()
    },
        // 网络请求
        getPageData() {
            getSearchHot().then(res => {//获取热词
            this.setData({ hotKeywords: res.result.hots })
            })  
        },

        // 事件处理
        
    handleSearchChange(event) {
        const searchValue = event.detail   //获取输入的关键字
        this.setData({ searchValue })     //保存关键字
        
        //判断关键字为空字符的处理逻辑
         if (!searchValue.length) {
            this.setData({ suggestWords: [] })
            this.setData({ resultSongs: [] })

            return
      }

        getSearchSuggest(searchValue).then(res => {    //根据关键字进行搜索
            this.setData({ suggestWords: res.result.allMatch })
      })
  },
    handleSearchAction(){//确定搜索
        // 保存一下searchValue
        const searchValue = this.data.searchValue
        getSearchResult(searchValue).then(res => {
        this.setData({ resultSongs: res.result.songs })
        // console.log(res);

        })
    },
    handleKeywordItemClick(event){
    // 获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword
    // 将关键设置到searchValue中
    this.setData({ searchValue: keyword })
    // 发送网络请求
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
    this.setData({ resultSongs: res.result.songs })
    // console.log(res);
    })
    }








})