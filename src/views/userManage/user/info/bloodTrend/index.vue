<template>
  <div>
    <!-- 血压趋势 -->
    <div class="margin-bottom">
      <!-- <el-card :body-style="{ padding: '0px' }"> -->
        <div class="card-header">
            <p class="title">血压趋势</p>
        </div>
        <!-- 日期选择 -->
        <div class="check-date">
          <el-row type="flex" justify="start">
            <button v-for="(item,index) in bloodTrendDate" 
            :key="item.date" 
            class="check-date-btn" 
            :class="{checked:item.isChecked}" 
            @click="updatebloodTrendChecked(index)">
              {{item.date}}
            </button>
          </el-row>
        </div>
        <!-- 状态选择 -->
        <div class="check-status">
          <span>测量场景统计：</span>
          <span class="status-span">
            <f-button
            :width="75"
            :height="24"
            v-for="(item,index) in statusType.move"
            :key="item.label"
            :isChecked="item.status"
            @checked="statusTypeChange('move',index)">
            {{item.label}}
            </f-button>
          </span>
          <span>用药状态统计：</span>
          <span>
            <f-button
            :width="90"
            :height="24"
            v-for="(item,index) in statusType.medicine"
            :key="item.label"
            :isChecked="item.status"
            @checked="statusTypeChange('medicine',index)">
            {{item.label}}
            </f-button>
          </span>

        </div>
        <!-- <div> -->
            <!-- <div> -->
              <!-- 左侧折线图 -->
        <div class="flex widthone">
          <!-- 左翻页按钮 -->
          <div class="flex-btn-left">
            <el-button v-show="showtrendBtn" :disabled="trendBtnNext" @click="bloodTrendNext" icon="el-icon-arrow-left" type="text" :style="{'font-size':'28px','color':'#999' ,'background':'#eaeaea'}"></el-button>
          </div>
          <!-- 趋势图 -->
          <div class="chart-min-width">
            <div id='bloodTrend' :style="{width:'auto',height:'300px'}"></div>
          </div>
          <!-- 右翻页按钮 -->
          <div class="flex-btn">
            <el-button v-show="showtrendBtn" :disabled="trendBtnPre" @click="bloodTrendPer" icon="el-icon-arrow-right" type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
          </div>
        </div>
            <!-- </div> -->
            <!-- 右侧数据显示 -->
        <div class="count-box">
          
          <div class="flex">
            <!-- 总测量次数 -->
            <div class="blood-trend-item totalbg">
              <p>{{this.bloodTrendState.total}}</p>
              <p>总测量次数</p>
            </div>
            <!-- 正常偏高次数 -->
            <div class="blood-trend-item normalbg">
              <p>{{this.bloodTrendState.normal}}</p>
              <p>正常偏高次数</p>
              <p>120/80~139/89</p>
            </div>
            <div class="blood-trend-item heighbg">
              <p>{{this.bloodTrendState.heigh}}</p>
              <p>高血压次数</p>
              <p>140/90~179/109</p>
            </div>
            <div class="blood-trend-item dangerbg">
              <p class="danger-text">{{this.bloodTrendState.danger}}</p>
              <p>危险次数</p>
              <p>>179/109</p>
            </div>
            <!-- <div class="blood-trend-item dangerbg">
              <p class="danger-text">{{this.bloodTrendState.miss}}</p>
              <p>漏检天数</p>
            </div> -->
          </div>
          <!-- 日期tip -->
          <div class="blood-trend-right-text">
            <span>{{tipDate}}</span>
          </div>
          <!-- <div class="blood-trend-right">
          </div> -->
        </div>
        <!-- </div> -->
      <!-- </el-card> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resize from '@/utils/mixins/resize'
import { dateFormat, computeWeekday, timeago } from '@/utils/date'
import {bloodTrend} from '@/api/userManage'
import fButton from './../button'
export default {
  name:'bloodTrend',
  mixins: [resize],
  components: {
    fButton
  },
  props:{
    id:{
      type:Number
    }
  },
  data () {
    return {
      chart:null,
      chartData:[],
      // 是否显示左右翻页按钮
      showtrendBtn: true,
      // 是否全选状态
      // ischeckAll: true,
      // 血压趋势 状态 按钮数据
      statusType: {
        move: [
          {
            label: '静止',
            value: 1,
            status: false
          },
          {
            label: '运动',
            value: 2,
            status: false
          },
          {
            label: '情绪波动',
            value: 3,
            status: false
          }
        ],
        medicine: [
          {
            label: '未用药',
            value: 1,
            status: false
          },
          {
            label: '服药2小时内',
            value: 2,
            status: false
          },
          {
            label: '服药2小时后',
            value: 3,
            status: false
          }

        ]
      },
      // 血压趋势 日期选择按钮状态
      bloodTrendDate: [
        {
          date: '最近',
          value: 'lately',
          isChecked: false
        },
        {
          date: '日',
          value: 'day',
          isChecked: false
        },
        {
          date: '周',
          value: 'week',
          isChecked: false
        },
        {
          date: '月',
          value: 'month',
          isChecked: false
        },
        {
          date: '半年',
          value: 'halfyear',
          isChecked: false
        }
      ],
      dataIndex: 0,  // 初始化 选择域
      // chartA: {date: ''},
      // 血压趋势 当前选择的日期按钮
      bloodTrendChecked: null,
      // 当前选择的状态
      statusArr: '',
      // 1-未药 2-服药2小时内 3-服药2小时后
      bpMeasureTime: '',
      // 1-静止 2-运动 3-情绪波动
      bpMeasureState: '',
      // 血压趋势 图表数据
      bloodTrendData: {
        date: [],
        week: [],
        systolic: [],
        diastolic: [],
        bptype: [],
        pages: 1,
        pageNum: 1,
        index: 0,
        currentPage: 1
      },
      // 当前选择的图表时间戳
      bloodTrendIndex: 0,
      // 血压趋势 表格数据
      bloodTrendState: {
        total: '无',
        normal: '无',
        heigh: '无',
        danger: '无',
        miss: '无'
      },
      // 上一页禁用
      trendBtnPre: false,
      // 下一页禁用
      trendBtnNext: false,
      // 折线图tooltip选择状态  如果相同则不更新数据 不同更新数据
      lastBloodTrendChecked: null,
      lastaxisValue: null,
      lastdataIndex: null,
      lastbpMeasureTime: '',
      lastbpMeasureState: '',
      // 右侧时间tip 最近显示无
      showtip: true,
      // 右侧时间tip 最近显示无
      tipDate: '',
      // x轴开始时间和结束时间
      xstart: '',
      xend: ''
    }
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    initChart(){
      this.chart = echarts.init(document.getElementById('bloodTrend'))
      this.chart.setOption(this.chartOption())
    },
    /**
     * @param {number} start 开始位置， end 结束位置
     * @description 血压趋势折线图
     */
    chartOption (start, end) {
      let vm = this
      let zoomstart = 0
      let zoomend = 100
      let x1 = ''
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
      }
      let xAxis = {}
      if (vm.bloodTrendChecked === 0) {
        xAxis = { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0
            // formatter: function (val) {
            //   let value
            //   let time
            //   if (val.length > 11) {
            //     time = val.slice(5, 10)
            //     value = val.slice(11)
            //   } else {
            //     time = val.slice(0, 4)
            //     value = val.slice(5)
            //   }
            //   if (vm._.eq(time, x1)) {
            //     x1 = time
            //     return value
            //   } else {
            //     let arr = []
            //     arr.push(value)
            //     arr.push(time)
            //     x1 = time
            //     return arr.join('\n')
            //   }
            // }
              // rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: this.bloodTrendData.date
        }
      }
      if (vm.bloodTrendChecked === 1) {
        xAxis = { // 直角坐标系grid的x轴
          type: 'time',
          boundaryGap: false,
          minInterval: 3600 * 1000,
          maxInterval: 60 * 60 * 1000,
          min: vm.xstart,
          max: vm.xend,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            // rotate: 60,
            formatter: function (val, index) {
              // let value
              // let time
              // if (val.length > 11) {
              //   time = val.slice(5, 10)
              //   value = val.slice(11)
              // } else {
              //   time = val.slice(0, 4)
              //   value = val.slice(5)
              // }
              // if (vm._.eq(time, x1)) {
              //   x1 = time
              //   return value
              // } else {
              //   let arr = []
              //   arr.push(value)
              //   arr.push(time)
              //   x1 = time
              //   return arr.join('\n')
              // }
              if (index === 0) {
                return [dateFormat(val, 0, false).slice(11), dateFormat(val, 0, false).slice(0, 11)].join('\n')
              }
              return dateFormat(val, 0, false).slice(11)
            }
              // rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          }
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          // data: this.bloodTrendData.date
        }
      }

      if (vm.bloodTrendChecked === 2) {
        xAxis = { // 直角坐标系grid的x轴
          type: 'time',
          boundaryGap: false,
          minInterval: 3600 * 1000 * 24,
          maxInterval: 60 * 60 * 1000 * 24*7,
          min: vm.xstart,
          max: vm.xend,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val) {
              return computeWeekday(val)
            }
              // rotate: 330
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          }
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          // data: this.bloodTrendData.date
        }
      }
      if (vm.bloodTrendChecked === 3) {
        xAxis = { // 直角坐标系grid的x轴
          type: 'time',
          boundaryGap: false,
          minInterval: 3600 * 1000 * 24,
          maxInterval: 60 * 60 * 1000 * 24,
          min: vm.xstart,
          max: vm.xend,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val, index) {
              if (index === 0) {
                return [dateFormat(val, 0, false).slice(8, 10), dateFormat(val, 0, false).slice(0, 7)].join('\n')
              }
              return dateFormat(val, 0, false).slice(8, 10)
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          }
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          // data: this.bloodTrendData.date
        }
      }
      if (vm.bloodTrendChecked === 4) {
        xAxis = { // 直角坐标系grid的x轴
          type: 'time',
          boundaryGap: false,
          minInterval: 3600 * 1000 * 24 * 30,
          maxInterval: 60 * 60 * 1000 * 24 * 30,
          min: vm.xstart,
          max: vm.xend,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val, index) {
              if (index === 0) {
                return [dateFormat(val, 0, false).slice(5, 10), dateFormat(val, 0, false).slice(0, 4)].join('\n')
              }
              return dateFormat(val, 0, false).slice(5, 10)
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          }
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          // data: this.bloodTrendData.date
        }
      }
      return {
        title: {
          // text: '广场舞30min',
          textStyle: {
            color: '#666',
            fontSize: 12,
            align: 'center',
            fontWeight: 'normal'
          },
          left: '40%'
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0],
            // disabled: false,
            show: false,
            realtime: true,
            start: zoomstart,
            end: zoomend,
            zoomlock: true,
            minValueSpan: 10,
            maxValueSpan: 10,
            throttle: 500,
            filterMode: 'empty',
            zoomOnMouseWheel: false

          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          hideDelay: 2000,
          // alwaysShowContent: vm.showtip,
          backgroundColor: 'rgba(250,250,250,0.7)',
          textStyle: {
            color: '#000'
          },
          // triggerOn: 'click',
          triggerOn: 'mousemove|click',
          formatter: function (a) {
            // a[0].axisValue 时间
            // a[0].dataIndex 选择第几个数据
            // if (vm.bloodTrendChecked !== 0) {
            //   if (vm.bloodTrendChecked !== vm.lastBloodTrendChecked || vm.lastaxisValue !== a[0].axisValue || vm.lastdataIndex !== a[0].dataIndex || vm.lastbpMeasureTime !== vm.bpMeasureTime || vm.lastbpMeasureState !== vm.bpMeasureState) {
            //     if (vm.bloodTrendChecked === 2) {
            //       vm.updatebloodTrendState(vm.bloodTrendData.week[a[0].dataIndex], a[0].dataIndex)
            //     } else {
            //       vm.updatebloodTrendState(a[0].axisValue, a[0].dataIndex)
            //     }
            //     vm.lastBloodTrendChecked = vm.bloodTrendChecked
            //     vm.lastaxisValue = a[0].axisValue
            //     vm.lastdataIndex = a[0].dataIndex
            //     vm.lastbpMeasureTime = vm.bpMeasureTime
            //     vm.lastbpMeasureState = vm.bpMeasureState
            //     vm.tipDate = a[0].axisValue
            //   }
            //   vm.bloodTrendIndex = a.dataIndex
            //   console.log(a)
            // }
            if (vm.bloodTrendChecked === 0) {
              return (
                a[0]['axisValueLabel'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                a[0]['seriesName'] + ': ' + a[0]['value']
              )
            }
            if (vm.bloodTrendChecked !== 0) {
              return (
                vm.bloodTrendData.date[a[0]['dataIndex']] +
                '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                a[1]['seriesName'] + ': ' + a[1]['value'][1] + '<br>' +
                '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                a[0]['seriesName'] + ': ' + a[0]['value'][1]
              )
            }
          }
        },
        axisPointer: {
          link: [{
            xAxisIndex: 'all'
          }],
          triggerTooltip: true,
          lineStyle: {
            color: '#fff',
            width: 0
          }
        },
        grid: { // 直角坐标系内绘图网格
          show: false,
          top: '30px',
          width: 'auto',
          height: 'auto',
          bottom: '50',
          left: '90',
          right: '80'
        },
        // xAxis: { // 直角坐标系grid的x轴
          //   type: 'category',
          //   boundaryGap: false,
          //   axisLabel: {
          //     interval: 0, // 显示x轴数据
          //     showMinLabel: true,
          //     showMaxLabel: true,
          //     align: 'center',
          //     rotate: 0
          //     // formatter: function (val) {
          //     //   let value
          //     //   let time
          //     //   if (val.length > 11) {
          //     //     time = val.slice(5, 10)
          //     //     value = val.slice(11)
          //     //   } else {
          //     //     time = val.slice(0, 4)
          //     //     value = val.slice(5)
          //     //   }
          //     //   if (vm._.eq(time, x1)) {
          //     //     x1 = time
          //     //     return value
          //     //   } else {
          //     //     let arr = []
          //     //     arr.push(value)
          //     //     arr.push(time)
          //     //     x1 = time
          //     //     return arr.join('\n')
          //     //   }
          //     // }
          //       // rotate: 330
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       color: '#999'
          //     }
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          //   data: this.bloodTrendData.date
        // },
        xAxis: xAxis,
        yAxis: { // 直角坐标系grid的y轴
          type: 'value',
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {  // y轴网格显示
            show: true
          },
          nameTextStyle: { // 坐标轴名样式
            color: '#666',
            fontSize: 12,
            align: 'left'
          },
          boundaryGap: true,
          splitNumber: 3,  // 坐标轴分割段数
          minInterval: 40, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
          data: ['0', '120', '140', '180']
        },
        series: [
          {
            name: '舒张压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            // tooltip: { // 提示框组件
            //   // snap: true,
            //   formatter: '{c}',
            //   trigger: 'item',
            //   // formatter: function (a) {
            //   //   console.log(a)
            //   // },
            //   backgroundColor: '#81cefc',
            //   textStyle: {
            //     color: '#fff',
            //     fontSize: 12
            //   },
            //   position: (point) => {
            //     point[0] -= 10
            //     point[1] += 25
            //     return point
            //   }

            // },
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                width: 2,
                color: '#32b77a'
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodTrendData.bptype[param.dataIndex]
                  return vm.computeDangerColor(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#e6f5fe',
            //     origin: 'auto',
            //     shadowColor: '#e6f5fe'
            //   }
            // },
            data: this.bloodTrendData.diastolic
          },
          {
            name: '收缩压',
            type: 'line',
            // smooth: true,
            // smoothMonotone: 'x',
            // tooltip: { // 提示框组件
            //   // snap: true,
            //   trigger: 'item',
            //   formatter: '{c}',
            //   backgroundColor: '#7cedc4',
            //   textStyle: {
            //     color: '#fff',
            //     fontSize: 12
            //   },
            //   position: (point) => {
            //     point[0] -= 10
            //     point[1] -= 40
            //     return point
            //   }
            // },
            lineStyle: {
              normal: {
                width: 2,
                color: '#228ec4'
              }
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: function (param) {
                  let index = vm.bloodTrendData.bptype[param.dataIndex]
                  return vm.computeDangerColor(index)
                }
              }
            },
            // areaStyle: {
            //   normal: {
            //     color: '#def3f2',
            //     origin: 'auto'
            //   }
            // },
            // data: [ 34, 55, 54, 76, 60, 75, 72, 16, 55, 74, 36, 10 ]
            data: this.bloodTrendData.systolic
          }
          // {
          //   type: 'line',
          //   name: '时间线',
          //   lineStyle: {
          //     normal: {
          //       width: 0,
          //       color: '#228ec4'
          //     }
          //   },
          //   symbol: 'circle',
          //   symbolSize: 0,
          //   data: [
          //   [vm.xstart, 0],
          //   [vm.xend, 0]
          //   ]
          // }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    /**
     * @param {nunber} index 选择日期的index 0最近 1日  2周  3月
     * @description 选择日期按钮
     */
    updatebloodTrendChecked (index) {
      if (index === 0) {
        this.showtrendBtn = false
      } else {
        this.showtrendBtn = true
      }
      this.bloodTrendDate.forEach(item => {
        item.isChecked = false
      })
      this.bloodTrendDate[index].isChecked = true
      this.bloodTrendChecked = index
      this.bloodTrendData.pageNum = 1
      this.updatebloodTrendData(index, this.statusArr)

      // console.log('index, this.statusArr', index, this.statusArr)
    },
    /**
     * @param {number} index 0最近 1日  2周  3月
     * @description 选择日期更新数据
     */
    updatebloodTrendData (index, status) {
      let vm = this
      let params = {
        'userId': vm.id,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': vm.bpMeasureTime || '',
        'bpMeasureState': vm.bpMeasureState || '',
        'pageNum': vm.bloodTrendData.pageNum
      }
      let bloodTrendChart = echarts.init(document.getElementById('bloodTrend'))
      vm.tipDate = ''
      if (index === 0) {
        vm.bloodTrendData.pageNum = 1
        bloodTrend(params, 0)
        .then(res => {
          if (res.code === '0000' && res.data.length > 0) {
            let resultBloodData = res.data[0].trendList
            let resultStateData = res.data[0].numberList
            this.bloodTrendData.date = []
            this.bloodTrendData.systolic = []
            this.bloodTrendData.diastolic = []
            this.bloodTrendData.bptype = []
            resultBloodData.forEach((item, index) => {
              this.bloodTrendData.date.push(timeago(item.measureTime))
              this.bloodTrendData.systolic.push(item.systolic)
              this.bloodTrendData.diastolic.push(item.diastolic)
              this.bloodTrendData.bptype.push(item.bpType)
            })
            // this.updatebloodTrendTotal(false)
            bloodTrendChart.setOption(this.chartOption())
            let total = 0
            let normalHeigh = 0
            let heigh = 0
            let danger = 0
            resultStateData.forEach(item => {
              if (item.id === 2) {
                normalHeigh += item.highNum
              }
              if (item.id === 3) {
                heigh += item.highNum
              }
              if (item.id === 4) {
                heigh += item.highNum
              }
              if (item.id === 5) {
                danger = item.highNum
              }
              total += item.highNum
            })
            this.bloodTrendState.total = total
            this.bloodTrendState.normal = normalHeigh
            this.bloodTrendState.heigh = heigh
            this.bloodTrendState.danger = danger
          }
        })
      }
      if (index === 1) {
        bloodTrend(params, 1)
        .then(res => {
          if (res.code === '0000' && res.data.length > 0) {
            let resultBloodData = res.data[0].trendList
            let resultStateData = res.data[0].numberList
            this.bloodTrendData.date = []
            this.bloodTrendData.systolic = []
            this.bloodTrendData.diastolic = []
            this.bloodTrendData.bptype = []
            if (resultBloodData.length === 1) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + (parseInt(resultBloodData[0].measureTime.slice(11, 13))) + ':00:00'
              this.xend = resultBloodData[resultBloodData.length - 1].measureTime.slice(0, 11) + (parseInt(resultBloodData[resultBloodData.length - 1].measureTime.slice(11, 13)) + 1) + ':00:00'
            }
            if (resultBloodData.length >= 2) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + (parseInt(resultBloodData[0].measureTime.slice(11, 13))) + ':00:00'
              this.xend = resultBloodData[resultBloodData.length - 1].measureTime.slice(0, 11) + (parseInt(resultBloodData[resultBloodData.length - 1].measureTime.slice(11, 13)) + 1) + ':00:00'
            }
            if (resultBloodData.length < 1) {
              this.xstart = ''
              this.end = ''
            }
            
            // this.updatebloodTrendTotal(this.xstart, this.xend)
            resultBloodData.forEach((item, index) => {
              this.$set(this.bloodTrendData.date, index, item.measureTime)
              this.$set(this.bloodTrendData.systolic, index, [item.measureTime, item.systolic])
              this.$set(this.bloodTrendData.diastolic, index, [item.measureTime, item.diastolic])
              this.$set(this.bloodTrendData.bptype, index, item.bpType)
            })
            let total = 0
            let normalHeigh = 0
            let heigh = 0
            let danger = 0
            resultStateData.forEach(item => {
              if (item.id === 2) {
                normalHeigh += item.highNum
              }
              if (item.id === 3) {
                heigh += item.highNum
              }
              if (item.id === 4) {
                heigh += item.highNum
              }
              if (item.id === 5) {
                danger = item.highNum
              }
              total += item.highNum
            })
            this.bloodTrendState.total = total
            this.bloodTrendState.normal = normalHeigh
            this.bloodTrendState.heigh = heigh
            this.bloodTrendState.danger = danger
          }
          bloodTrendChart.setOption(this.chartOption())
          if (res.data) {
            if (res.data.length !== 0) {
              // 点击日周月默认显示最后一条数据信息
              bloodTrendChart.dispatchAction({
                type: 'showTip',
                  // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                seriesIndex: 1,
                  // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                dataIndex: this.bloodTrendData.date.length - 1
                  // 可选，数据名称，在有 dataIndex 的时候忽略
                  // name?: string,
                  // 本次显示 tooltip 的位置。只在本次 action 中生效。
                  // 缺省则使用 option 中定义的 tooltip 位置。
                  // position: Array.<number>|string|Function,
              })
            }
          }
        })
      }
      if (index === 2) {
        // vm.bloodTrendData.pageNum = 1
        bloodTrend(params, 2)
        .then(res => {
          if (res.code === '0000' && res.data.length > 0) {
            let resultBloodData = res.data[0].trendList
            let resultStateData = res.data[0].numberList
            this.bloodTrendData.date = []
            this.bloodTrendData.week = []
            this.bloodTrendData.systolic = []
            this.bloodTrendData.diastolic = []
            this.bloodTrendData.bptype = []
            if (resultBloodData.length === 1) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + '00:00:00'
              this.xend = resultBloodData[0].measureTime.slice(0, 11) + '24:00:00'
            }
            if (resultBloodData.length >= 2) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + '00:00:00'
              this.xend = resultBloodData[resultBloodData.length - 1].measureTime.slice(0, 11) + '24:00:00'
            }
            if (resultBloodData.length < 1) {
              this.xstart = ''
              this.end = ''
            }
            // this.xstart = '2019-01-08 00:00:00'
            // this.end = '2019-01-08 24:00:00'
            // this.updatebloodTrendTotal(this.xstart, this.xend)
            resultBloodData.forEach((item, index) => {
              this.computeYearWeek(item.yearWeek)
              // let week = this.computeYearWeek(item.yearWeek)[0] + '-' + this.computeYearWeek(item.yearWeek)[1] + '周'

              // this.bloodTrendData.date.push(week)
              this.$set(this.bloodTrendData.date, index, item.measureTime)
              this.$set(this.bloodTrendData.systolic, index, [item.measureTime, item.systolic])
              this.$set(this.bloodTrendData.diastolic, index, [item.measureTime, item.diastolic])
              this.$set(this.bloodTrendData.bptype, index, item.bpType)
              // this.$set(this.bloodTrendData.diastolic, index, item.diastolic)
            })
            let total = 0
            let normalHeigh = 0
            let heigh = 0
            let danger = 0
            resultStateData.forEach(item => {
              if (item.id === 2) {
                normalHeigh += item.highNum
              }
              if (item.id === 3) {
                heigh += item.highNum
              }
              if (item.id === 4) {
                heigh += item.highNum
              }
              if (item.id === 5) {
                danger = item.highNum
              }
              total += item.highNum
            })
            this.bloodTrendState.total = total
            this.bloodTrendState.normal = normalHeigh
            this.bloodTrendState.heigh = heigh
            this.bloodTrendState.danger = danger
          }
          // this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          // this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          // this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          // this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          // this.bloodTrendData.week = this.bloodTrendData.week.reverse()
          // this.bloodTrendData.currentPage = 1
          // this.$set(this.bloodTrendData, 'pages', res.pages)
          // let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          // bloodTrendChart.setOption(this.chartOption(position.start, 100))
          bloodTrendChart.setOption(this.chartOption())
          if (res.data) {
            if (res.data.length !== 0) {
              bloodTrendChart.dispatchAction({
                type: 'showTip',
                  // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                seriesIndex: 1,
                  // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                dataIndex: this.bloodTrendData.week.length - 1
                  // 可选，数据名称，在有 dataIndex 的时候忽略
                  // name?: string,
                  // 本次显示 tooltip 的位置。只在本次 action 中生效。
                  // 缺省则使用 option 中定义的 tooltip 位置。
                  // position: Array.<number>|string|Function,
              })
              // this.updatebloodTrendState(false, -1)
              // this.updatebloodTrendState(res.data[-1].description)
              // this.updatebloodTrendState(this.bloodTrendData.date[-1])
            }
          }
        })
      }
      if (index === 3) {
        // vm.bloodTrendData.pageNum = 1
        bloodTrend(params, 3)
        .then(res => {
          if (res.code === '0000' && res.data.length > 0) {
            let resultBloodData = res.data[0].trendList
            let resultStateData = res.data[0].numberList
            this.bloodTrendData.date = []
            this.bloodTrendData.systolic = []
            this.bloodTrendData.diastolic = []
            this.bloodTrendData.bptype = []
            if (resultBloodData.length === 1) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + '00:00:00'
              this.xend = resultBloodData[0].measureTime.slice(0, 11) + '24:00:00'
            }
            if (resultBloodData.length >= 2) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + '00:00:00'
              this.xend = resultBloodData[resultBloodData.length - 1].measureTime.slice(0, 11) + '24:00:00'
            }
            if (resultBloodData.length < 1) {
              this.xstart = ''
              this.end = ''
            }
            // this.updatebloodTrendTotal(this.xstart, this.xend)
            resultBloodData.forEach((item, index) => {
              this.$set(this.bloodTrendData.date, index, item.measureTime)
              this.$set(this.bloodTrendData.systolic, index, [item.measureTime, item.systolic])
              this.$set(this.bloodTrendData.diastolic, index, [item.measureTime, item.diastolic])
              this.$set(this.bloodTrendData.bptype, index, item.bpType)
            })
            let total = 0
            let normalHeigh = 0
            let heigh = 0
            let danger = 0
            resultStateData.forEach(item => {
              if (item.id === 2) {
                normalHeigh += item.highNum
              }
              if (item.id === 3) {
                heigh += item.highNum
              }
              if (item.id === 4) {
                heigh += item.highNum
              }
              if (item.id === 5) {
                danger = item.highNum
              }
              total += item.highNum
            })
            this.bloodTrendState.total = total
            this.bloodTrendState.normal = normalHeigh
            this.bloodTrendState.heigh = heigh
            this.bloodTrendState.danger = danger
          }
          // console.log(this.bloodTrendData, '血压数据')
          // this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          // this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          // this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          // this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          // this.bloodTrendData.currentPage = 1
          // this.$set(this.bloodTrendData, 'pages', res.pages)
          // let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          // bloodTrendChart.setOption(this.chartOption(position.start, 100))
          bloodTrendChart.setOption(this.chartOption())
          if (res.data) {
            if (res.data.length !== 0) {
              bloodTrendChart.dispatchAction({
                type: 'showTip',
                  // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                seriesIndex: 1,
                  // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                dataIndex: this.bloodTrendData.date.length - 1
                  // 可选，数据名称，在有 dataIndex 的时候忽略
                  // name?: string,
                  // 本次显示 tooltip 的位置。只在本次 action 中生效。
                  // 缺省则使用 option 中定义的 tooltip 位置。
                  // position: Array.<number>|string|Function,
              })
              // this.updatebloodTrendState(false, -1)
              // this.updatebloodTrendState(res.data[-1].description)
              // this.updatebloodTrendState(this.bloodTrendData.date[-1])
            }
          }
        })
      }
      if (index === 4) {
        // vm.bloodTrendData.pageNum = 1
        bloodTrend(params, 4)
        .then(res => {
          if (res.code === '0000' && res.data.length > 0) {
            let resultBloodData = res.data[0].trendList
            let resultStateData = res.data[0].numberList
            this.bloodTrendData.date = []
            this.bloodTrendData.systolic = []
            this.bloodTrendData.diastolic = []
            this.bloodTrendData.bptype = []
            if (resultBloodData.length === 1) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + '00:00:00'
              this.xend = resultBloodData[0].measureTime.slice(0, 11) + '24:00:00'
            }
            if (resultBloodData.length >= 2) {
              this.xstart = resultBloodData[0].measureTime.slice(0, 11) + '00:00:00'
              this.xend = resultBloodData[resultBloodData.length - 1].measureTime.slice(0, 11) + '24:00:00'
            }
            if (resultBloodData.length < 1) {
              this.xstart = ''
              this.end = ''
            }
            // this.updatebloodTrendTotal(this.xstart, this.xend)
            resultBloodData.forEach((item, index) => {
              this.$set(this.bloodTrendData.date, index, item.measureTime)
              this.$set(this.bloodTrendData.systolic, index, [item.measureTime, item.systolic])
              this.$set(this.bloodTrendData.diastolic, index, [item.measureTime, item.diastolic])
              this.$set(this.bloodTrendData.bptype, index, item.bpType)
            })
            let total = 0
            let normalHeigh = 0
            let heigh = 0
            let danger = 0
            resultStateData.forEach(item => {
              if (item.id === 2) {
                normalHeigh += item.highNum
              }
              if (item.id === 3) {
                heigh += item.highNum
              }
              if (item.id === 4) {
                heigh += item.highNum
              }
              if (item.id === 5) {
                danger = item.highNum
              }
              total += item.highNum
            })
            this.bloodTrendState.total = total
            this.bloodTrendState.normal = normalHeigh
            this.bloodTrendState.heigh = heigh
            this.bloodTrendState.danger = danger
          }
          bloodTrendChart.setOption(this.chartOption())
          // this.bloodTrendData.date = this.bloodTrendData.date.reverse()
          // this.bloodTrendData.systolic = this.bloodTrendData.systolic.reverse()
          // this.bloodTrendData.diastolic = this.bloodTrendData.diastolic.reverse()
          // this.bloodTrendData.bptype = this.bloodTrendData.bptype.reverse()
          // this.bloodTrendData.currentPage = 1
          // this.$set(this.bloodTrendData, 'pages', res.pages)
          // let position = this.computeStartend(vm.bloodTrendData.currentPage, this.bloodTrendData.pageNum)
          // bloodTrendChart.setOption(this.chartOption(position.start, 100))
          if (res.data) {
            if (res.data.length !== 0) {
              bloodTrendChart.dispatchAction({
                type: 'showTip',
                  // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
                seriesIndex: 1,
                  // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                dataIndex: this.bloodTrendData.date.length - 1
                  // 可选，数据名称，在有 dataIndex 的时候忽略
                  // name?: string,
                  // 本次显示 tooltip 的位置。只在本次 action 中生效。
                  // 缺省则使用 option 中定义的 tooltip 位置。
                  // position: Array.<number>|string|Function,
              })
              // this.updatebloodTrendState(false, -1)
              // this.updatebloodTrendState(res.data[-1].description)
              // this.updatebloodTrendState(this.bloodTrendData.date[-1])
            }
          }
        })
      }
    },
    /**
     * @param {date} value 时间
     * @returns {array} [][0]年 [][1]周
     * @description 计算年 周数
     */
    computeYearWeek (value) {
      let time = value
      let year
      let week
      if (!isNaN(time)) {
        year = parseInt(time.toString().substr(0, 4))
        week = parseInt(time.toString().substr(4))
      } else if (isNaN(time)) {
        time = time + ''
        year = time.substr(0, 4)
        week = time.substr(4)
      }
      let arr = [year, week]
      return arr
    },
    /**
     * @param {number} pageNum 当前页数
     * @param {number} pages 总页数
     * @returns {object} .start 开始 .end 结束位置
     * @description 计算折线图 开始结束位置
     */
    computeStartend (pageNum, pages) {
      let page = {
      }
      if (pageNum === 1 && pages === 1) {
        page.start = 0
        page.end = 100
      } else if (pageNum === pages) {
        page.start = 0
        page.end = parseInt((1 / pages) * 100)
      } else if (pageNum < pages) {
        page.start = parseInt(((pages - pageNum) / pages) * 100)
        page.end = parseInt(((pages - pageNum + 1) / pages) * 100)
      }
      return page
    },
    /**
     * @param {number} bptype 血压bptype
     * @returns 色值
     * @description 血压颜色
     */
    computeDangerColor (bptype) {
      let type = this._.toNumber(bptype)
      let color = ''
      switch (type) {
        case 1:
          color = '#33b2f2'// 正常
          break
        case 2:
          color = '#59d8a1'// 正常高值
          break
        case 3:
          color = '#efa13a'// 轻度
          break
        case 4:
          color = '#ff7d43' // 中度
          break
        case 5:
          color = '#f96767' // 危险
          break
        case 6:
          color = '##9ac3e4' // 低血压
          break
        case 0:
          color = '#191918'
          break
        default:
          color = '#191918'
      }
      return color
    },
    /**
     * @description 上一页
     */
    bloodTrendPer () {
      let vm = this
      vm.bloodTrendData.pageNum --
      if (vm.bloodTrendData.pageNum < 1) {
        vm.bloodTrendData.pageNum = 1
        vm.trendBtnPre = true
      }
      vm.updatebloodTrendData(vm.bloodTrendChecked)
    },
    /**
     * @description xia一页
     */
    bloodTrendNext () {
      let vm = this
      vm.bloodTrendData.pageNum ++
      vm.updatebloodTrendData(vm.bloodTrendChecked)
    },
    // 状态选择move测量状态统计,medicine用药效果统计
    statusTypeChange (type, index) {
      this.statusType[type].forEach((item, i) => {
        if (i === index) {
          item.status = !item.status
        } else {
          item.status = false
        }
      })
      console.log('选择状态', type, index, this.statusType)
      this.tipDate = ''
    }
  },
  watch: {
    bloodTrendData: {
      handler: function (val) {
        if (val.pageNum > 1) {
          this.trendBtnPre = false
        } else {
          this.trendBtnPre = true
        }
      },
      deep: true,
      immediate: true
    },
    statusType: {
      handler: function (val) {
        let a = false
        let b = false
        this.statusType.medicine.forEach(item => {
          if (item.status) {
            this.bpMeasureTime = item.value
            a = true
          }
        })
        this.statusType.move.forEach(item => {
          if (item.status) {
            this.bpMeasureState = item.value
            b = true
          }
        })
        if (!a) {
          this.bpMeasureTime = ''
        }
        if (!b) {
          this.bpMeasureState = ''
        }
        this.updatebloodTrendData(this.bloodTrendChecked)
      },
      deep: true
      // immediate: true
    }
  },
  mounted(){
    this.initChart()
    this.updatebloodTrendChecked(3)
    this.dataIndex = 0
  },
  beforeDestroy() {
  }
}
</script>
<style lang="scss" scoped>
  .title{
    /* margin-left:20px; */
    margin-top:24px;
    margin-bottom:2px;
    font-size:20px;
    color:#666
  }
  .card-header{
    margin: 0 20px 0 20px;
    border-bottom:1px solid #ebeef5;
    height: 28px;
  }
  .chart{
    padding: 0px 24px 0px 24px;
  }
  .check-date{
    padding: 20px 0 20px 24px;
  }
  .check-date-btn{
    box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    border:1px solid #fff;
    background-color:#fff;
    cursor: pointer;
    font-size:18px;
    color:#666;
    width:64px;
    height: 36px;
    outline:none;
  }
  .check-date-btn:hover{
    opacity: 0.9;
    /* box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    border:1px solid #fff;
    background-color:#fff;
    cursor: pointer;
    font-size:18px;
    color:#666;
    width:64px;
    height: 36px;
    outline:none; */
  }
  .check-status{
    padding: 0px 0 20px 24px;
    font-size: 14px;
    color: #666;
  }
  .check-status span{
    display: inline-block;
    /* margin-right: 10px; */
  }
  .checked{
    box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    background-color:#1991fc;
    border-color: #1991fc;
    color:#fff;
    border-radius:2px;
  }
  table{
    /* height: 200px; */
    border:1px solid #eaeaea;
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    width: 100%;
  }
  table th{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    color: #041421;
  }
  table td{
    border:1px solid #eaeaea;
    padding: 15px 0;
    text-align: center;
    vertical-align: middle;
  }
  .red-text{
    color:#e87070;
  }
  table p{
    font-size: 14px;
    color: #666;
    margin: 0;
    padding: 0;
    padding-bottom: 10px;
  }
  .table{
    height: 250px;
    padding-top: 40px;
  }
  .blood-cover{
    margin-bottom: 8px;
    margin-top: 8px;
  }
  .check-all-btn{
    outline: none;
    border: none;
    background-color: #fff;
    color: #666;
    cursor: pointer;
    font-size: 14px;
  }
  .status-span{
    margin-right: 8px;
    margin-bottom: 5px;
  }
  button{
    padding: 0;
    vertical-align: baseline;
  }
  .check-all-span{
    margin-right: 30px;
  }
  .check-all-btn-icon{
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    background-color: #fff;
    vertical-align: middle;
    padding: 0;
  }
  .check-all-btn-icon-active{
    display: inline-block;
    position: relative;
    content: "";
    width: 20px; 
    height: 20px;  
    vertical-align: middle;
    // background: url('~icon/hospital-icon-44.png')
  }
  .label-right{
    margin-right: 20px;
    width: 60px;
  }
  .blood-trend-item{
    font-size: 14px;
    color: rgb(250, 245, 245);
    /* background-color: #f4f6f9; */
    // height: 70px;
    margin:10px 10px 0 0;
    width: 22%;
    /* min-width: 10%; */
    /* max-width: 20%; */
    padding: 10px;
    float: left;
  }
  .blood-trend-item p{
    padding-top:5px;
    /* color: #666; */
  }
  .blood-trend-item p:nth-child(1){
    font-size: 24px;
    /* color:#1991fc; */
  }
  .danger-text{
    /* color:#e87070 !important; */
  }
  .float-box{
    float: left;
  }
  .checked-kaluli{
    margin-top: 80px;
  }
  .checked-score{
    margin-top:10px;
  }
  .bloodTrend-chart{
    /* overflow: hidden; *zoom: 1; */
    /* position: relative; */
    display: flex;
  }
  .blood-trend-left{
    /* float: left; */
    /* max-width: 800px; */
    /* width: 100%; */
    /* margin-right: 450px; */
    /* display: flex; */
    /* justify-content: flex-start; */
    width: 100%;
  }
  .wrap{
    height: 100%;
    padding-bottom:20px;
    /* position: relative; */
  }
  .blood-trend-right{
    /* display: table-cell; */
    /* float: right; */
    /* position: relative; */
    /* height: 300px; */
    width: 350px;
    /* width: 100%; */
    /* margin: 0 auto; */
    padding-right: 45px;
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: space-around;
    /* flex-direction: column; */
    /* display: table-cell; */
    /* vertical-align: middle; */
    /* top:50%; */
    /* transform: translateY(-50%); */
    
    /* position: absolute; */
    /* top:0; */
    /* right: 0; */
  }
  .blood-trend-right-text span{
    display: inline-block;
    padding-left: 10px;
    font-size: 12px;
    color: #666;
  }
  .footer{
    background-color: #e87070;
    height: 10px;
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
  .totalbg{
    background-color: #33b2f2;
  }
  .normalbg{
    background-color: #59d8a1;
  }
  .heighbg{
    background-color: #efa13a;
  }
  .dangerbg{
    background-color: #f96767;
  }
  .margin-bottom{
    margin-bottom: 8px;
  }
  /* 数据统计 */
  .count-box{
    padding:0 20px;
    margin-bottom: 8px;
  }
</style>

