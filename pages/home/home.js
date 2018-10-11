// pages/home/home.js
//获取应用实例
const app = getApp()
app.globalData.count+= 2
console.log(getApp().globalData.count)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'init data',
    num: 0,
    array: [{ text: 'init data' }],
    object: {
      text: 'init data'
    },
    staffA: {firstName: 'Hulk', lastName: 'Hu'},
    staffB: {firstName: 'Shang', lastName: 'You'},
    staffC: {firstName: 'Gideon', lastName: 'Lin'},
    objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
    numberArray: [1, 2, 3, 4]
  },
  switch: function(e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{id: length, unique: 'unique_' + length}].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function(e){
    this.data.numberArray = [ this.data.numberArray.length + 1 ].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  changeText: function () {
    // this.data.text = 'changed data' // 不要直接修改 this.data
    // 应该使用 setData
    this.setData({
      text: 'changed data'
    })
  },
  changeNum: function () {
    // 或者，可以修改 this.data 之后马上用 setData 设置一下修改了的字段
    this.data.num = 1
    this.setData({
      num: this.data.num
    })
  },
  changeItemInArray: function () {
    // 对于对象或数组字段，可以直接修改一个其下的子字段，这样做通常比修改整个对象或数组更好
    this.setData({
      'array[0].text': 'changed data'
    })
  },
  changeItemInObject: function () {
    this.setData({
      'object.text': 'changed data'
    });
  },
  addNewField: function () {
    this.setData({
      'newField.text': 'new data'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getTypeData: function (page) {
    wx.request({
      url: 'http://v.juhe.cn/toutiao/index?type=' + app.requestUrl + '&key=1c84600b999ae65c986571e77b403fab',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        // success
        //   console.log( res.data.result.data );
        var data = res.data.result.data;
        for (var i = page; i < page + 5; i++) {
          app.title.push(data[i].title);
          app.imgUrls.push(data[i].thumbnail_pic_s);
          app.author.push(data[i].author_name);
          app.date.push(data[i].date);
          app.url.push(data[i].url);
        }
        //   console.log( app.imgUrls );
        this.setData({
          title: app.title,
          imgUrls: app.imgUrls,
          author: app.author,
          date: app.date,
          page: app.page
        })
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
    console.log('home页面在滚动')
  },

  onTabItemTap(item){
    console.log('item1111' + item.index)
    console.log('item2222' + item.pagePath)
    console.log('item3333' + item.text)
  },

  viewTap: function () {
    console.log('view tap')
  },
})