import * as echarts from '../../lib/ec-canvas/echarts';
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'axis',
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
    ec: {
      onInit: initChart
    },  
    timeStr: []
  },
  ready: function () {
    console.log(this.properties.time);
    this.countDown(18204)
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
 
})