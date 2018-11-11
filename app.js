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
        wx.request({
          url: 'https://dailyvote.cn/v1/client/register?type=201&account=' + res.code,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: (res) => {
            console.log("请求成功", res)
            // success
          },
          fail: function () {
            // fail
            console.log("请求失败")
          },
          complete: function () {
            // complete
            console.log("请求完成")
          }
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        })
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
    },
    imgbgurl: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAACECAIAAABAjzmIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0Y0MDAwQTRDNDVDMTFFODhBOTZCNzg5QjhENjE4MzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0Y0MDAwQTVDNDVDMTFFODhBOTZCNzg5QjhENjE4MzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RjQwMDBBMkM0NUMxMUU4OEE5NkI3ODlCOEQ2MTgzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RjQwMDBBM0M0NUMxMUU4OEE5NkI3ODlCOEQ2MTgzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnZwoi8AAAxZSURBVHja7N2BbuPG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)'
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