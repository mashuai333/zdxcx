// pages/attention/attention.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    renderData:[
      { id: 0, title: "美国第三方危机", time: 15666, data: {}, follow: true },
      { id: 1, title: "中心危机危机", time: 19880, data: {}, follow: true },
      { id: 2, title: "伊拉克危机", time: 15666, data: {}, follow: true },
      { id: 3, title: "进口药危机", time: 12000, data: {}, follow: true },
    ],
    cancleWidth:75,
    navbarData: {
      showCapsule: false, //是否显示左上角图标
      showSearch:1,
      title: ' ', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 
    
  },
  onLoad: function (options) {},
  //手指刚放到屏幕触发
  touchS: function (e) {
    console.log("touchS", e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:", e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //cancleWidth 为右侧按钮区域的宽度
      var cancleWidth = that.data.cancleWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= cancleWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + cancleWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.renderData;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        renderData: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE", e);
    var that = this;
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var cancleWidth = that.data.cancleWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > cancleWidth / 2 ? "left:-" + cancleWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.renderData;
      console.log("样式是什么", txtStyle);
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        renderData: list
      });
    }
  },
  cancle: function(e){
    console.log("取消关注的当前条目",e);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("关注页面" + this.route)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})