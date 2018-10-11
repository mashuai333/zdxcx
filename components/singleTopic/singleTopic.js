import * as echarts from '../../ec-canvas/echarts';
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [20, 32, 1, 34, 9, 23, 21]
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
      time :{
        type : String ,
        value : '时间'
      },
      // 数据
      data :{
        type : Array ,
        value : '数据'
      }
    },
  
    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
      ec: {
        onInit: initChart
      }
    },
  
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
       
    }
  })