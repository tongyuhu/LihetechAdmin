<template>
  <div class="gap-top">
    <el-card>
      <div class="title">
        用户增长率
      </div>
      <div id="userAdd" :style="{width:'auto',height:'400px'}"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resize from '@/utils/mixins/resize'
export default {
  name:'userAdd',
  mixins: [resize],
  data () {
    return {
      chart:null,
    }
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    initChart(){
      this.chart = echarts.init(document.getElementById('userAdd'))
      this.chart.setOption(this.chartOption())
    },
    chartOption(){
      let option = {
        tooltip: { // 提示框组件
          backgroundColor: 'rgba(50,50,50,0.2)',
          triggerOn: 'mousemove|click',
          snap: true,
          formatter: '{b} : {c}%'
        },
        grid: { // 直角坐标系内绘图网格
          show: false,
          // left: '100',
          // right: '80',
          width: 'auto',
          height: 'auto'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          interval: 0,
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
          },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          nameLocation: 'end',
          type: 'value',
          axisLine: {onZero: false},
          // axisLabel: {
          //   formatter: '{value}%'
          // },
          splitLine: {  // y轴网格显示
            show: false
          },
          nameTextStyle: { // 坐标轴名城样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: false,
          type: 'value'
        },
        series: [{
          name: '控压走势',
          type: 'line',
          // smooth: true,
          // smoothMonotone: 'x',
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            normal: {
              width: 2,
              color: '#8ecefc'
            }
          },
          itemStyle: {
            normal: {
              color: '#8ecefc'
            }
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        }]
      }
      return option
    }
  },
  mounted(){
    this.initChart()
  },
  beforeDestroy() {
  }
}
</script>
<style lang="scss" scoped>
  .title{
    margin-top:10px;
    font-size: 24px;
  }
  .gap-top{
    margin-top:20px;
  }
</style>

