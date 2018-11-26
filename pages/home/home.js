// pages/home/home.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showTitle: true, //是否显示页面标题
      // showSearch: false,
      showTopic: false,
      title: '首页', //导航栏 中间的标题内容
      imgBgUrl: app.globalData.imgbgurl
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("homeoptions", options)
    app.editTabBar();
    console.log(this.data.height)
  },
  getTypeData: function (page) {
    let token1 = "Basic ZXlKaGJHY2lPaUpJVXpJMU5pSXNJbWxoZENJNk1UVTBNekkwTURVNE55d2laWGh3SWpveE5UUTFPRE15TlRnM2ZRLmV5SjFhV1FpT2pFc0luUjVjR1VpT2pFd01Dd2ljMk52Y0dVaU9pSlZjMlZ5VTJOdmNHVWlmUS5zX3B5ZFVXMl9PNjNjMXVwb1d5OTFoZWgwSVBmRldWeG81U1QzcGFhbGl3Og =="
    wx.request({
      url: 'https://dailyvote.cn/v1/event/1',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Authorization": token1
      }, // 设置请求的 header
      success: (res) => {
        console.log('get请求成功',res)
        // success
        //   console.log( res.data.result.data );
        //   console.log( app.imgUrls );
        // this.setData({
        //   title: app.title,
        //   imgUrls: app.imgUrls,
        //   author: app.author,
        //   date: app.date,
        //   page: app.page
        // })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTypeData();
  },
    
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("home页面"+this.route)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log('是否转发')
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '战队小程序',
      path: '/page/home/home'
    }
  },

  onPageScroll: function () {
    // Do something when page scroll
    // console.log('home页面在滚动')
  },

  InputSearch: function(e){
    console.log(e.detail.value);
  },
  viewTap: function () {
    console.log('view tap')
  },
})