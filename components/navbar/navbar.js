// components/navbar.js
const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: 20,
    //默认值  貌似不管事
    navbarData: {
      showTitle: true,
      // showSearch:false,
      showTopic: false,
      title:'战队小程序',
      imgBgUrl: 'url(../../lib/imgs/home_background.png)',
      contTitle:'中心芯片危机',
      leftTime:'20:20:20',
      curNum:'5万'
    }
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  }

})
