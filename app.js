//app.js
App({
  onLaunch: function(options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 判断是否由分享进入小程序
    console.log(options)
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };

    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
        console.log("获取系统信息", res)
        this.globalData.height = res.statusBarHeight
      }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log("获取用户信息", res)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    share: false, // 分享默认为false
    height: 0,
    tabBar: {
      "borderStyle": "black",
      "backgroundColor": "#fff",
      "selectedColor": "#000",
      "position": "bottom",
      "list": [
        {
          "pagePath": "/pages/home/home",
          "text": "首页",
          "iconPath": "../../lib/imgs/home.png",
          "selectedIconPath": "../../lib/imgs/home1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": true
        },
        {
          "pagePath": "/pages/attention/attention",
          "text": "我的关注",
          "iconPath": "../../lib/imgs/attention.png",
          "selectedIconPath": "../../lib/imgs/attention1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        },
        {
          "pagePath": "/pages/personalFiles/personalFiles",
          "text": "个人档案",
          "iconPath": "../../lib/imgs/personal.png",
          "selectedIconPath": "../../lib/imgs/personal1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        },
        {
          "pagePath": "/pages/eventMuseum/eventMuseum",
          "text": "事件博物馆",
          "iconPath": "../../lib/imgs/story.png",
          "selectedIconPath": "../../lib/imgs/story1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        }
      ],
    },
    tabBar2: {
      "borderStyle": "black",
      "backgroundColor": "#fff",
      "selectedColor": "#000",
      "position": "bottom",
      "list": [
        {
          "pagePath": "/pages/home/home",
          "text": "首页",
          "iconPath": "../../lib/imgs/home.png",
          "selectedIconPath": "../../lib/imgs/home1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        },
        {
          "pagePath": "/pages/attention/attention",
          "text": "我的关注",
          "iconPath": "../../lib/imgs/attention.png",
          "selectedIconPath": "../../lib/imgs/attention1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        },
        {
          "pagePath": "/pages/topic/topic",
          "text": "话题",
          "iconPath": "../../lib/imgs/topic.png",
          "selectedIconPath": "../../lib/imgs/topic1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": true
        },
        {
          "pagePath": "/pages/personalFiles/personalFiles",
          "text": "个人档案",
          "iconPath": "../../lib/imgs/personal.png",
          "selectedIconPath": "../../lib/imgs/personal1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        },
        {
          "pagePath": "/pages/eventMuseum/eventMuseum",
          "text": "事件博物馆",
          "iconPath": "../../lib/imgs/story.png",
          "selectedIconPath": "../../lib/imgs/story1.png",
          "selectedColor": "#666",
          "clas": "menu-item",
          "active": false
        }
      ]
    }
  },
  //第一种状态的底部
  editTabBar: function() {
    var _curPageArr = getCurrentPages();
    console.log(_curPageArr)
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar;
    console.log("tabBar", tabBar)
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true; //根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种状态的底部
  editTabBar2: function() {
    var _curPageArr = getCurrentPages();
    console.log("_curPageArr", _curPageArr)
    var _curPage = _curPageArr[_curPageArr.length - 1];
    var _pagePath = _curPage.__route__;
    if (_pagePath.indexOf('/') != 0) {
      _pagePath = '/' + _pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == _pagePath) {
        tabBar.list[i].active = true; //根据页面地址设置当前页面状态  
      }
    }
    _curPage.setData({
      tabBar: tabBar
    });
  },
  title: [],
  imgUrls: [],
  author: [],
  date: [],
  url: [],
  requestUrl: "top",
  cssActive: 0,
  page: 0,

})