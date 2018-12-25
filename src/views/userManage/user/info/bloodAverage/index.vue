<template>
  <div>
    <div class="margin-bottom">
      <!-- <el-card :body-style="{ padding: '0px' }"> -->
        <div class="card-header">
            <p class="title">血压平均水平</p>
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

        <div>
          <el-row>
            <!-- <el-col :span="14"> -->
              <div class="flex">
                <div class="flex widthone">
                  <!-- 翻页按钮 -->
                  <div class="flex-btn-left">
                    <el-button v-show="showtrendBtn" :disabled="trendBtnNext" @click="bloodTrendNext" icon="el-icon-arrow-left" type="text" :style="{'font-size':'28px','color':'#999' ,'background':'#eaeaea'}"></el-button>
                  </div>
                  <!-- 图 -->
                  <div class="chart-min-width">
                    <div id='bloodAverageLine' :style="{width:'auto',height:'300px'}"></div>
                  </div>
                  <!-- 翻页按钮 -->
                  <div class="flex-btn">
                    <!-- <el-button :disabled="trendBtnNext" @click="bloodTrendNext" icon="el-icon-arrow-right" type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button> -->
                    <el-button v-show="showtrendBtn" :disabled="trendBtnPre" @click="bloodTrendPer" icon="el-icon-arrow-right" type="text" :style="{'font-size':'28px','color':'#999','background':'#eaeaea'}"></el-button>
                  </div>
                </div>
              </div>
          </el-row>
        </div>
      <!-- </el-card> -->
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import resize from '@/utils/mixins/resize'
import {bloodAverage} from '@/api/userManage'
import {dateFormat, computeWeekMorNoon} from '@/utils/date'
// import {bloodAverageApi} from '@/api/components/BloodheighSickcard/bloodAverage'
export default {
  name:'bloodCover',
  mixins: [resize],
  props: {
    id:{
      type:Number
    }
  },
  data () {
    return {
      chart:null,
      chartData:[],
      // 显示翻页按钮
      showtrendBtn: true,
      // 日期 选择数据
      bloodTrendDate: [
        {
          date: '日',
          value: 'lately',
          isChecked: false
        },
        {
          date: '周',
          value: 'day',
          isChecked: false
        },
        {
          date: '月',
          value: 'week',
          isChecked: false
        },
        {
          date: '年',
          value: 'month',
          isChecked: false
        }
      ],
      // 当前选择的日期
      bloodTrendChecked: null,
      // 柱状图数据
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
        total: '',
        normal: '',
        heigh: '',
        danger: ''
      },
      // 右侧翻页
      trendBtnPre: false,
      // 左侧翻页
      trendBtnNext: false,
      // 1-未药 2-服药2小时内 3-服药2小时后
      bpMeasureTime: '',
      // 1-静止 2-运动 3-情绪波动
      bpMeasureState: '',
      // 选择月的总天数
      monthDay: 31,
      // 选择时间段变化
      time: ''
    }
  },
  watch: {
    bloodTrendData: {
      handler: function (val) {
        if (val.pageNum > 1) {
          this.trendBtnPre = false
          this.trendBtnNext = false
        } else {
          this.trendBtnPre = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    initChart(){
      this.chart = echarts.init(document.getElementById('bloodAverageLine'))
      this.chart.setOption(this.chartOption())
    },
    /**
     * @param {number} start 开始位置 end 结束位置
     * @description 柱状图配置
     */
    chartOption (start, end) {
      let vm = this
      let zoomstart = 0
      let zoomend = 100
      // let x1 = ''
      let dayX = ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
      let weekX = ['周一白天', '周一晚上', '周二白天', '周二晚上', '周三白天', '周三晚上', '周四白天', '周四晚上', '周五白天', '周五晚上', '周六白天', '周六晚上', '周日白天', '周日晚上']
      // let weekX = ['周一白天', '周一晚上', '周二白天', '周二晚上', '周三白天', '周三晚上', '周四白天', '周四晚上', '周五白天', '周五晚上', '周六白天', '周六晚上', '周日白天', '周日晚上']
      let monthX = []
      for (let i = 0; i < this.monthDay; i++) {
        monthX.push((i + 1))
      }
      let yearX = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      let x = []
      switch (vm.bloodTrendChecked) {
        case 0:
          x = dayX
          break
        case 1:
          x = weekX
          break
        case 2:
          x = monthX
          break
        case 3:
          x = yearX
          break
      }
      if (start) {
        zoomstart = start
      }
      if (end) {
        zoomend = end
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
          // alwaysShowContent: true,
          backgroundColor: 'rgba(250,250,250,0.7)',
          textStyle: {
            color: '#000'
          },
          triggerOn: 'mousemove|click',
          // triggerOn: 'mousemove|click',
          formatter: function (a) {
            // if (a[0].dataIndex === vm.bloodTrendIndex) {
              // vm.updatebloodTrendState(a[0].axisValue, a[0].dataIndex)
            // } else {
            // if (vm.bloodTrendChecked === 2) {
            //   vm.updatebloodTrendState(vm.bloodTrendData.week[a[0].dataIndex], a[0].dataIndex)
            // } else {
            //   vm.updatebloodTrendState(a[0].axisValue, a[0].dataIndex)
            // }
            // }
            // vm.bloodTrendIndex = a.dataIndex
            console.log(a, 'a]')

            if (a[0]['value'] !== '-') {
              if (vm.bloodTrendChecked === 1) {
                return (
                    vm.bloodTrendData.week[a[0]['dataIndex']] + '<br>' +
                    a[0]['axisValueLabel'] + '<br>' +
                    '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                    a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                    '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                    a[0]['seriesName'] + ': ' + a[0]['value']
                )
              }
              if (vm.bloodTrendChecked === 2) {
                return (
                  a[0]['axisValueLabel'] + '日' + '<br>' +
                  '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                  a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                  '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                  a[0]['seriesName'] + ': ' + a[0]['value']
                )
              } else {
                return (
                    a[0]['axisValueLabel'] + '<br>' +
                    '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
                    a[1]['seriesName'] + ': ' + a[1]['value'] + '<br>' +
                    '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
                    a[0]['seriesName'] + ': ' + a[0]['value']
                )
              }
            } else {
              return ''
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
          bottom: '70',
          left: '95',
          right: '80'
        },
        xAxis: { // 直角坐标系grid的x轴
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            interval: 0, // 显示x轴数据
            showMinLabel: true,
            showMaxLabel: true,
            align: 'center',
            rotate: 0,
            formatter: function (val, index) {
              if (vm.bloodTrendChecked === 1) {
                return [val.slice(0, 2), val.slice(2, 4)].join('\n')
              }
              if (index === 0) {
                if (vm.bloodTrendChecked === 0) {
                  return [val, vm.time.slice(5, 11), vm.time.slice(0, 4)].join('\n')
                }
                if (vm.bloodTrendChecked === 1) {
                  return [val.slice(0, 2), val.slice(2, 4)].join('\n')
                }
                if (vm.bloodTrendChecked === 2) {
                  return [val, vm.time.slice(0, 7)].join('\n')
                }
                if (vm.bloodTrendChecked === 3) {
                  return [val, vm.time.slice(0, 4)].join('\n')
                }
              } else {
                return val
              }
            }
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
          // data: this.bloodTrendData.date
          data: x
        },
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
            symbol: 'circle',
            symbolSize: 6,
            z: 10,
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
                  return vm.computeDanger(index)
                }
              }
            },
            barWidth: 15,
            data: this.bloodTrendData.diastolic
          },
          {
            name: '收缩压',
            type: 'line',
            z: 10,
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
                  return vm.computeDanger(index)
                }
              }
            },
            barWidth: 15,
            data: this.bloodTrendData.systolic
          },
          {
            name: '舒张压',
            type: 'line',
            symbol: 'none',
            // symbolSize: 6,
            data: this.bloodTrendData.diastolic,
            smooth: false,
            z: -1,
            connectNulls: true,
            lineStyle: {
              normal: {
                type: 'dashed',
                width: 1.5,
                color: '#999'
              }
            }
          },
          {
            name: '收缩压',
            type: 'line',
            symbol: 'none',
            // symbolSize: 6,
            data: this.bloodTrendData.systolic,
            smooth: false,
            z: -1,
            connectNulls: true,
            lineStyle: {
              normal: {
                type: 'dashed',
                width: 1.5,
                color: '#999'
              }
            }
          }

        ],
        textStyle: {
          color: '#666',
          fontSize: 12
        }
      }
    },
    /**
     * @description 筛选日数据无数据加-
     * @param {array} DateArr 时间
     * @param {array} dataArr 数据
     */
    filterWeekData (DateArr, dataArr) {
      let vm = this
      let day = ['周一白天', '周一晚上', '周二白天', '周二晚上', '周三白天', '周三晚上', '周四白天', '周四晚上', '周五白天', '周五晚上', '周六白天', '周六晚上', '周日白天', '周日晚上']
      // let day = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
      let data = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
      DateArr.forEach((item, index) => {
        if (vm._.indexOf(day, item) !== -1) {
          data[vm._.indexOf(day, item)] = dataArr[index]
        }
        // console.log(vm._.toNumber(item.slice(11, 13)))
      })
      // data.map(item => {
      //   if (item) {
      //     return item
      //   } else {
      //     return '-'
      //   }
      // })
      return data
    },
    /**
     * @description 筛选日数据无数据加-
     * @param {array} DateArr 时间
     * @param {array} dataArr 数据
     */
    filterDayData (DateArr, dataArr) {
      let vm = this
      let day = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
      // let day = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
      let data = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
      DateArr.forEach((item, index) => {
        if (vm._.indexOf(day, vm._.toNumber(item.slice(11, 13))) !== -1) {
          data[vm._.indexOf(day, vm._.toNumber(item.slice(11, 13)))] = dataArr[index]
        }
        console.log(vm._.toNumber(item.slice(11, 13)))
      })
      // data.map(item => {
      //   if (item) {
      //     return item
      //   } else {
      //     return '-'
      //   }
      // })
      return data
    },
    /**
     * @description 筛选日数据无数据加-
     * @param {array} DateArr 时间
     * @param {array} dataArr 数据
     */
    filterMonthData (DateArr, dataArr) {
      let vm = this
      let day = []
      let data = []
      for (let i = 0; i < this.monthDay; i++) {
        day.push(i + 1)
        data.push('-')
      }
      DateArr.forEach((item, index) => {
        // item = parseInt(item)
        if (vm._.indexOf(day, vm._.toNumber(item.slice(8))) !== -1) {
          data[vm._.indexOf(day, vm._.toNumber(item.slice(8)))] = dataArr[index]
        }
        // console.log(vm._.toNumber(item.slice(11, 13)))
      })
      return data
    },
    /**
     * @description 筛选日数据无数据加-
     * @param {array} DateArr 时间
     * @param {array} dataArr 数据
     */
    filterYearData (DateArr, dataArr) {
      let vm = this
      let day = []
      let data = []
      for (let i = 0; i <= 12; i++) {
        day.push(i + 1)
        data.push('-')
      }
      DateArr.forEach((item, index) => {
        // item = parseInt(item)
        if (vm._.indexOf(day, vm._.toNumber(item.slice(5, 7))) !== -1) {
          data[vm._.indexOf(day, vm._.toNumber(item.slice(5, 7)))] = dataArr[index]
        }
        // console.log(vm._.toNumber(item.slice(11, 13)))
      })
      return data
    },
    /**
     * @param {number} index 选择bloodTrendDate的index
     * @description 选择按钮
     */
    updatebloodTrendChecked (index) {
      this.bloodTrendDate.forEach(item => {
        item.isChecked = false
      })
      this.bloodTrendDate[index].isChecked = true
      this.bloodTrendChecked = index
      this.bloodTrendData.pageNum = 1
      this.updatebloodTrendData(index)
    },
    /**
     * @param {number} index  0-日血压平均 1-周平均 2-月平均 3-年
     * @description 更新数据
     */
    updatebloodTrendData (index, status) {
      let vm = this
      let params = {
        'userId': vm.id,
        'adminHospitalId': vm.hospitalId,
        'bpMeasureTime': this.bpMeasureTime || '',
        'bpMeasureState': this.bpMeasureState || '',
        'pageNum': this.bloodTrendData.pageNum
      }
      let bloodTrend = echarts.init(document.getElementById('bloodAverageLine'))
      if (index === 0) {
        // vm.bloodTrendData.pageNum = 1
        bloodAverage(params, 0)
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          if (res.data.length > 0) {
            this.time = res.data[0].description.slice(0, 11)
          } else {
            this.time = ''
          }
          res.data.forEach((item, index) => {
            this.bloodTrendData.date.push(dateFormat(item.description + ':00', 0, false))
            this.bloodTrendData.systolic.push(item.avgSystolic)
            this.bloodTrendData.diastolic.push(item.avgDiastolic)
            this.bloodTrendData.bptype.push(item.bpType || '')
          })
          this.bloodTrendData.systolic = this.filterDayData(this.bloodTrendData.date, this.bloodTrendData.systolic)
          this.bloodTrendData.diastolic = this.filterDayData(this.bloodTrendData.date, this.bloodTrendData.diastolic)
          this.bloodTrendData.bptype = this.filterDayData(this.bloodTrendData.date, this.bloodTrendData.bptype)
          // this.bloodTrendData.pages = 1
          // this.bloodTrendData.currentPage = 1
          // console.log('bloodTrendData', this.bloodTrendData)
          bloodTrend.setOption(this.chartOption())
        })
      }
      if (index === 1) {
        // vm.bloodTrendData.pageNum = 1
        bloodAverage(params, 1)
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.week = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          if (res.data.length > 0) {
            this.time = res.data[0].description.slice(0, 11)
          } else {
            this.time = ''
          }
          res.data.forEach((item, index) => {
            this.bloodTrendData.date.push(computeWeekMorNoon(dateFormat(item.description + ':00', 0, false)))
            this.bloodTrendData.week.push(dateFormat(item.description + ':00', 0, true))
            this.$set(this.bloodTrendData.bptype, index, item.bpType || '')
            this.$set(this.bloodTrendData.systolic, index, item.avgSystolic)
            this.$set(this.bloodTrendData.diastolic, index, item.avgDiastolic)
          })
          this.bloodTrendData.systolic = this.filterWeekData(this.bloodTrendData.date, this.bloodTrendData.systolic)
          this.bloodTrendData.diastolic = this.filterWeekData(this.bloodTrendData.date, this.bloodTrendData.diastolic)
          this.bloodTrendData.bptype = this.filterWeekData(this.bloodTrendData.date, this.bloodTrendData.bptype)
          this.bloodTrendData.week = this.filterWeekData(this.bloodTrendData.date, this.bloodTrendData.week)
          // this.bloodTrendData.currentPage = 1
          // this.$set(this.bloodTrendData, 'pages', res.pages)
          // console.log('bloodTrendData', this.bloodTrendData)
          bloodTrend.setOption(this.chartOption())
        })
      }
      if (index === 2) {
        // vm.bloodTrendData.pageNum = 1
        bloodAverage(params, 2)
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          if (res.data.length > 0) {
            this.time = res.data[0].description.slice(8)
            this.monthDay = parseInt(this.time)
            this.time = res.data[0].description.slice(0, 11)
          } else {
            this.time = ''
          }
          res.data.forEach((item, index) => {
            this.$set(this.bloodTrendData.date, index, item.description)
            this.$set(this.bloodTrendData.systolic, index, item.avgSystolic)
            this.$set(this.bloodTrendData.diastolic, index, item.avgDiastolic)
            this.$set(this.bloodTrendData.bptype, index, item.bpType || '')
          })
          this.bloodTrendData.systolic = this.filterMonthData(this.bloodTrendData.date, this.bloodTrendData.systolic)
          this.bloodTrendData.diastolic = this.filterMonthData(this.bloodTrendData.date, this.bloodTrendData.diastolic)
          this.bloodTrendData.bptype = this.filterMonthData(this.bloodTrendData.date, this.bloodTrendData.bptype)
          // this.bloodTrendData.currentPage = 1
          // this.$set(this.bloodTrendData, 'pages', res.pages)
          bloodTrend.setOption(this.chartOption())
        })
      }
      if (index === 3) {
        // vm.bloodTrendData.pageNum = 1
        bloodAverage(params, 3)
        .then(res => {
          this.bloodTrendData.date = []
          this.bloodTrendData.systolic = []
          this.bloodTrendData.diastolic = []
          this.bloodTrendData.bptype = []
          if (res.data.length > 0) {
            this.time = res.data[0].description.slice(0, 4)
          } else {
            this.time = ''
          }
          res.data.forEach((item, index) => {
            this.$set(this.bloodTrendData.date, index, item.description)
            this.$set(this.bloodTrendData.systolic, index, item.avgSystolic)
            this.$set(this.bloodTrendData.diastolic, index, item.avgDiastolic)
            this.$set(this.bloodTrendData.bptype, index, item.bpType || '')
          })
          this.bloodTrendData.systolic = this.filterYearData(this.bloodTrendData.date, this.bloodTrendData.systolic)
          this.bloodTrendData.diastolic = this.filterYearData(this.bloodTrendData.date, this.bloodTrendData.diastolic)
          this.bloodTrendData.bptype = this.filterYearData(this.bloodTrendData.date, this.bloodTrendData.bptype)
          // this.bloodTrendData.currentPage = 1
          // this.$set(this.bloodTrendData, 'pages', res.pages)
          bloodTrend.setOption(this.chartOption())
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
    computeDanger (bptype) {
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
     * @description 下一页
     */
    bloodTrendNext () {
      let vm = this
      vm.bloodTrendData.pageNum++
      vm.updatebloodTrendData(vm.bloodTrendChecked)
    },
    /**
     * @description 上一页
     */
    bloodTrendPer () {
      let vm = this
      vm.bloodTrendData.pageNum--
      if (vm.bloodTrendData.pageNum <= 1) {
        vm.bloodTrendData.pageNum = 1
      }
      vm.updatebloodTrendData(vm.bloodTrendChecked)
    }
  },
  mounted(){
    this.initChart()
    this.updatebloodTrendChecked(2)
  },
  beforeDestroy() {
  }
}
</script>
<style lang="scss" scoped>
  .title{
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
    border: 1px solid #fff;
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
    // box-sizing: border-box;
    // line-height: 1;
    // white-space: nowrap;
    // border: 1px solid #fff;
    // background-color:#fff;
    // cursor: pointer;
    // font-size:18px;
    // color:#666;
    // width:64px;
    // height: 36px;
    // outline:none;
  }
  .check-status{
    padding: 0px 0 20px 24px;
    font-size: 14px;
    color: #666;
  }
  .check-status span{
    display: inline-block;
  }
  .checked{
    border-color: #1991fc;
    background-color:#1991fc;
    color:#fff;
    border-radius:2px;
  }
  table{
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
    margin-right: 2px;
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
    height: 80px;
    margin:10px 10px 0 0;
    width: 130px;
    padding: 10px;
    float: left;
  }
  .blood-trend-item p{
    padding-top:5px;
  }
  .blood-trend-item p:nth-child(1){
    font-size: 24px;
  }
  .danger-text{
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
    display: flex;
  }
  .blood-trend-left{
    width: 100%;
  }
  .wrap{
    height: 100%;
    padding-bottom:20px;
  }
  .blood-trend-right{
    width: 350px;
    padding-right: 45px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
    position: absolute;
    bottom:50%;
    right: 0;
    z-index:99;
  }
  .flex-btn-left{
    max-width: 55px;
    min-width: 55px;
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
</style>

