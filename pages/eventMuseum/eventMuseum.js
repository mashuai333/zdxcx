// pages/eventMuseum/eventMuseum.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['时事热点', '明星娱乐', '体育赛事','专题'],
    currentTab: 0,
    navbarData: {
      showTitle: true, //是否显示页面标题
      // showSearch: false,
      showTopic: false,
      title: '事件博物馆', //导航栏 中间的标题内容
      imgBgUrl: app.globalData.imgbgurl
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("事件options",options)
    app.editTabBar();
    // app.editTabBar2();
      // this.resetData();
      // this.loading();
      // this.getTypeData(app.page);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log("故事博物馆页面" + this.route)
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  // getTypeData: function (page) {
  //   wx.request({
  //     url: 'http://v.juhe.cn/toutiao/index?type=' + app.requestUrl + '&key=1c84600b999ae65c986571e77b403fab',
  //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     // header: {}, // 设置请求的 header
  //     success: (res) => {
  //       // success
  //         console.log( res.data.result.data );
  //       var data = res.data.result.data;
  //       if(data){
  //         for (var i = page; i < page + 5; i++) {
  //           app.title.push(data[i].title);
  //           app.imgUrls.push(data[i].thumbnail_pic_s);
  //           app.author.push(data[i].author_name);
  //           app.date.push(data[i].date);
  //           app.url.push(data[i].url);
  //         }
  //         //   console.log( app.imgUrls );
  //         this.setData({
  //           title: app.title,
  //           imgUrls: app.imgUrls,
  //           author: app.author,
  //           date: app.date,
  //           page: app.page
  //         })
  //       }
  //     },
  //     fail: function () {
  //       // fail
  //     },
  //     complete: function () {
  //       // complete
  //       wx.hideToast();
  //     }
  //   })
  // },
  // resetData: function () {
  //   app.title = [];
  //   app.imgUrls = [];
  //   app.author = [];
  //   app.title = [];
  //   app.date = [];
  //   app.page = 0;
  // },
  loading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
  },
  pullDownRefresh: function (e) {
    console.log("下拉刷新");
    this.onLoad();
  },
  pullUpLoad: function (e) {
    app.page += 5;
    this.setData({
      page: app.page
    })
    console.log("上拉加载" + app.page);
    this.loading();
    // this.getTypeData(app.page);
  },
  check: function (e) {
    // console.log(e.target.dataset.id);
    // console.log(e.target.id);
    app.cssActive = e.target.dataset.id
    app.requestUrl = e.target.id;
    // this.resetData();
    this.setData({
      dataId: app.cssActive,
      title: app.title,
      imgUrls: app.imgUrls,
      author: app.author,
      date: app.date,
      requestUrl: app.requestUrl,
      page: app.page
    }),
      this.loading();
    // this.getTypeData(app.page);
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
  onShareAppMessage: function () {

  }
})