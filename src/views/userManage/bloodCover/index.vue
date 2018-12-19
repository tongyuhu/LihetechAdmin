<template>
  <div class="gap-top">
    <!-- <el-card> -->
      <div class="head-box">
        <span class="title">
          用户血压分布
        </span>
        <div class="check-time">
          <el-radio-group v-model="time" size="small" @change="checkTime">
            <el-radio-button label="天"></el-radio-button>
            <el-radio-button label="周"></el-radio-button>
            <el-radio-button label="月"></el-radio-button>
            <el-radio-button label="年"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div id="bloodCover" :style="{width:'auto',height:'500px'}"></div>
    <!-- </el-card> -->
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resize from '@/utils/mixins/resize'
import {bloodCover} from '@/api/userManage'
export default {
  name:'bloodCover',
  mixins: [resize],
  data () {
    return {
      chart:null,
      chartData:[],
      time:'天'
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
      let vm = this
      let option = {
        stillShowZeroSum:false,
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
            data: vm.chartData,
            label: {
              normal: {
                position: 'outside',
                formatter: function (params) {
                  if (params.value === 1) {
                    return params.name +'  '+ params.value + '人'
                  } else {
                    return params.name +'  '+ params.value + '人'
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
        ]
        
      }
      return option
    },
    getData(params){
      // let params = {
      //   periodTime: 1
      //   } 
      bloodCover(params).then(res=>{
        if(res.code = '0000'){
          this.chartData = [
              {
                value:res.data.normalCount,
                name:'正常',
              },
              {
                // value:11,
                value:res.data.normalHighCount,
                name:'正常高压',
              },
              {
                value:res.data.moderateHighCount,
                name:'中度高血压',
              },
              {
                value:res.data.mildHighCount,
                name:'轻度高血压',
              },
              {
                value:res.data.dangerCount,
                name:'危险',
              }
            ]
        }
        console.log(this.chartData,'血压分布数据')
        this.initChart()
      })
    },
    checkTime(){
      let params = {
        periodTime: 1
        } 
      switch(this.time){
        case '天':
        params.periodTime = 1
        break
        case '周':
        params.periodTime = 2
        break
        case '月':
        params.periodTime = 3
        break
        case '年':
        params.periodTime = 4
        break
      }
    this.getData(params)
    }
  },
  mounted(){
    this.initChart()
    this.checkTime()
  },
  beforeDestroy() {
  }
}
</script>
<style lang="scss" scoped>
  .title{
    margin-top:10px;
    margin-bottom:10px;
    margin-left:40px;
    font-size: 24px;
  }
  .gap-top{
    margin-top:20px;
  }
  .head-box{
    display: flex;
    align-items: center;
    margin-bottom:30px;
  }
  .check-time{
    margin-left: 20px;
  }
</style>

