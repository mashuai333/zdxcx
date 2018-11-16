import * as echarts from '../../lib/ec-canvas/echarts';
// let chart = null;

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      show:false,
      trigger: 'none',
      confine:true,
    },
    backgroundColor: 'rgb(236,236,236)',
    // legend: {
    //   data: ['美国无耻', '中兴无信']
    // },
    grid: {
      top: '10%',
      left: 20,
      right: 20,
      bottom: '5%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      offset:0,
      data: ['', '', '', '', '', '', '']
    },
    yAxis: {
      show: false,
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      }
    },
    series: [
      {
        name: '美国无耻',
        type: 'line',
        itemStyle: {
          color: '#f66'
        },
        data: [11, 30, 45, 90, 12, 30, 10]
      },
      {
        name: '中兴无信',
        type: 'line',
        itemStyle: {
          color: '#67b9ff'
        },
        data: [-11, -30, -15, -60, -12, -43, -10]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 时间
    time: {
      type: String,
      value: '时间'
    },
    // 数据
    data: {
      type: Array,
      value: '数据'
    },
    // 关注
    follow: {
      type: String,
      value: '关注'
    }
  },
  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 初始化图表
    ec: {
      onInit: initChart
    },  
    //条目剩余时间
    timeStr: [],
    // 条目返回数据
    reData:[],
    // 条目所需标题
    itemTitle:'',
    // 用户是否关注
    isFollow:false
  },
  ready: function () {
    console.log(this.properties)
    // console.log(this.properties.time);
    this.setData({ 
      reData: this.properties.data ,
      itemTitle:this.properties.title,
      isFollow:this.properties.follow
    });
    this.countDown(this.properties.time)
  },
  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {
    countDown(times) {
      var timer = null;
      timer = setInterval(() => {
        var hour = 0,
          minute = 0,
          second = 0;//时间默认值
        if (times > 0) {
          hour = Math.floor(times / (60 * 60));
          minute = Math.floor(times / 60) - (hour * 60);
          second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
        }
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        //
        this.setData({ timeStr: (hour + '' + minute).split('') })
        times--;
      }, 1000);
      if (times <= 0) {
        clearInterval(timer);
      }
    }
  },
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
  cancle: function (e) {
    console.log("取消关注的当前条目", e);
  },
 
})