// pages/home/home.js
//获取应用实例
const app = getApp()
// app.globalData.count+= 2
// console.log(getApp().globalData.count)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: false, //是否显示左上角图标
      showSearch:1,
      title: ' ', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.height)
  },
  // getTypeData: function (page) {
  //   wx.request({
  //     url: 'http://v.juhe.cn/toutiao/index?type=' + app.requestUrl + '&key=1c84600b999ae65c986571e77b403fab',
  //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     // header: {}, // 设置请求的 header
  //     success: (res) => {
  //       // success
  //       //   console.log( res.data.result.data );
  //       var data = res.data.result.data;
  //       for (var i = page; i < page + 5; i++) {
  //         app.title.push(data[i].title);
  //         app.imgUrls.push(data[i].thumbnail_pic_s);
  //         app.author.push(data[i].author_name);
  //         app.date.push(data[i].date);
  //         app.url.push(data[i].url);
  //       }
  //       //   console.log( app.imgUrls );
  //       this.setData({
  //         title: app.title,
  //         imgUrls: app.imgUrls,
  //         author: app.author,
  //         date: app.date,
  //         page: app.page
  //       })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
    
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("home页面"+this.route)
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