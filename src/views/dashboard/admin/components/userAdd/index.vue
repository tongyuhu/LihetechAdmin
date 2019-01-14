<template>
  <div class="gap-top">
    <el-card>
      <div class="title">
        用户增长率
      </div>
      <div class="flex widthone">
          <!-- 左翻页按钮 -->
          <div class="flex-btn-left">
            <el-button v-show="showBtn" :disabled="btnNext" @click="next" icon="el-icon-arrow-left" type="text" :style="{'font-size':'28px','color':'#999' ,'background':'#eaeaea'}"></el-button>
          </div>
          <!-- 趋势图 -->
          <div class="chart-min-width">
            <!-- <div id='bloodTrend' :style="{width:'auto',height:'300px'}"></div> -->
            <div id="userAdd" :style="{width:'auto',height:'400px'}"></div>
          </div>
          <!-- 右翻页按钮 -->
          <div class="flex-btn">
            <el-button v-show="showBtn" :disabled="btnPre" @click="ago" icon="el-icon-arrow-right" type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
          </div>
        </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resize from '@/utils/mixins/resize'
import {userRiseRate} from '@/api/home'
import {dateFormat} from '@/utils/date'
export default {
  name:'UserAdd',
  mixins: [resize],
  data () {
    return {
      chart:null,
      xdata:[],
      ydata:[],
      showBtn:true,
      btnNext:false,
      btnPre:false,
      pageNum:1,
      pageSize:20,
      pages:1,
      year:''
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
      let vm = this
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
            formatter: function (val, index) {
              let date = dateFormat(val, 0, false)
              let result
              if (index === 0) {
                result = [date.slice(5, 10), date.slice(0, 4)].join('\n')
                vm.year = date.slice(0, 4)
                console.log(vm.year,'year')
              }else{
                if(date.slice(0, 4) !== vm.year){
                  console.log(date.slice(0, 4),'===',vm.year)
                  result =  [date.slice(5, 10), date.slice(0, 4)].join('\n')
                  vm.year = date.slice(0, 4)
                }else{
                  result =  date.slice(5, 10)
                }
              }
              return result
            }
          },
          data: vm.xdata
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
          data: vm.ydata,
        }]
      }
      return option
    },
    getData(params){
      let vm = this
      userRiseRate(params).then(res=>{
        if(res.code === '0000') {
          vm.xdata = []
          vm.ydata = []
          res.data.forEach(item => {
            if(item.createTime && item.riseRate){
              vm.xdata.push(item.createTime)
              vm.ydata.push(item.riseRate)
            }
          })
          vm.pages = res.pages
          vm.initChart()
        }
      })
    },
    ago(){
      if(this.pageNum < this.pages){
        this.pageNum ++
        this.btnNext = false
      }
      if(this.pageNum === this.pages){
        this.btnPre = true
      }
      this.getData({
        pageNum:this.pageNum,
        pageSize:20
      })
    },
    next(){
      if(this.pageNum > 1){
        this.pageNum --
        this.btnPre = false
      }
      if(this.pageNum === 1){
        this.btnNext = true
      }
      
      this.getData({
        pageNum:this.pageNum,
        pageSize:20
      })
    }

  },
  mounted(){
    this.initChart()
    this.getData({
      pageNum:1,
      pageSize:20
    })
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
  .flex{
    display: flex;
    position: relative;
    flex-wrap: nowrap;
  }
  .chart-min-width{
    min-width: 100%;
  }
  .flex-btn{
    max-width: 55px;
    min-width: 55px;
    /* height: 100%; */
    position: absolute;
    bottom:50%;
    right: 0;
    z-index:99;
  }
  .flex-btn-left{
    max-width: 55px;
    min-width: 55px;
    /* height: 100%; */
    position: absolute;
    bottom:50%;
    left: 25px;
    z-index:99;
  }
  .widthone{
    width: 100%;
  }
</style>

