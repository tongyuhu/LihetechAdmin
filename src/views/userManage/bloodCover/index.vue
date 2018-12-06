<template>
  <div class="gap-top">
    <!-- <el-card> -->
      <div class="title">
        用户血压分布
      </div>
      <div id="bloodCover" :style="{width:'auto',height:'500px'}"></div>
    <!-- </el-card> -->
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resize from '@/utils/mixins/resize'
export default {
  name:'bloodCover',
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
      this.chart = echarts.init(document.getElementById('bloodCover'))
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
          bottom:'20%',
          width: 'auto',
          height: 'auto'
        },
        color:['#81cefc', '#9ac3e4', '#7cedc4', '#f4e07a', '#ff8f8f'],
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: '1%',
          data: ['正常', '正常高压', '轻度高血压', '中度高血压', '危险'],
          selectedMode: true,
          // formatter: (name) => {
          //   let i = 0
          //   this.sickDistributionData.forEach(
          //     (item, index) => {
          //       if (item.name === name) {
          //         i = index
          //         return i
          //       }
          //     }
          //   )
          //   return name + '  共(' + this.sickDistributionData[i].value + '人)'
          // },
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 20,
          textStyle: {
            color: '#666',
            fontSize: 14
          }
        },
        series: [
          {
            name: '高血压',
            type: 'pie',
            radius: '70%',
            center: ['50%', '40%'],
            data: [
              {
                value:0.1,
                name:'正常',
              },
              {
                value:0.2,
                name:'正常高压',
              },
              {
                value:0.3,
                name:'中度高血压',
              },
              {
                value:0.1,
                name:'轻度高血压',
              },
              {
                value:0.3,
                name:'危险',
              }
            ],
            label: {
              normal: {
                position: 'inner',
                formatter: function (params) {
                  if (params.value === 0) {
                    return ''
                  } else {
                    return params.percent + '%'
                  }
                },
                fontSize: 10
              }
            },
            labelLine: {
              normal: {
                // show: false
              }
            }
          }
        ],
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
    margin-left:30px;
    font-size: 24px;
  }
  .gap-top{
    margin-top:20px;
  }
</style>

