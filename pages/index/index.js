//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '战队小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('res', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     console.log("获取用户信息", res)
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //     wx.switchTab({
          //       url: 'pages/home/home'
          //     })
          //   }
          // })
          wx.login({
            success: res => {
              //发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log('res.code',res)
              let acode = res.code;
              wx.request({
                url: 'https://dailyvote.cn/v1/token',
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                data: {
                  "account": acode,
                  "type": 200
                },
                header: {
                  'content-type': 'application/json' //默认  设置请求的 header
                },
                success: (res) => {
                  console.log("请求成功", res)
                  // wx.switchTab({
                  //   url: '/pages/home/home'
                  // })
                  app.globalData.token = res.data.token;
                  wx.redirectTo({
                    url: '/pages/home/home'
                  })
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
        } else {
          // wx.redirectTo({
          //   url: 'pages/index/index'
          // })
        }
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  }
})
