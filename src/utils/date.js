// export const dateFormat = function (source, ignoreMinute) {
//   let myDate
//   let separate = '-'
//   let minute = ''
//   if (source === void (0)) {
//     source = new Date()
//   }
//   if (source) {
//     if (source.split) {
//       source = source.replace(/\-/g, '/')
//     } else if (isNaN(parseInt(source))) {
//       source = source.toString().replace(/\-/g, '/')
//     } else {
//       source = new Date(source)
//     }

//     if (new Date(source) && (new Date(source)).getDate) {
//       myDate = new Date(source)
//       if (!ignoreMinute) {
//         minute = (myDate.getHours() < 10 ? ' 0' : ' ') + myDate.getHours() + ':' + (myDate.getMinutes() < 10 ? '0' : '') + myDate.getMinutes()
//       }
//       return myDate.getFullYear() + separate + ((myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute
//     } else {
//       return source.slice(0, 16)
//     }
//   } else {
//     return source
//   }
// }
/**
 *
 * @param {date} source 原始时间  'yyyy-MM-dd HH:mm:ss'
 * @param {number} monthbefor 几个月前
 * @param {boolean} ignoreMinute 忽略分钟
 */
export const dateFormat = function (source, monthbefor, ignoreMinute) {
  let myDate
  let separate = '-'
  let minute = ''
  if (source === void (0)) {
    source = new Date()
  }
  if (source) {
    if (source.split) {
      source = source.replace(/\-/g, '/')
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/\-/g, '/')
    } else {
      source = new Date(source)
    }

    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source)
      if (!ignoreMinute) {
        minute = (myDate.getHours() < 10 ? ' 0' : ' ') + myDate.getHours() + ':' + (myDate.getMinutes() < 10 ? '0' : '') + myDate.getMinutes()
      }

      let year = myDate.getFullYear()
      let month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1)
      let monthNum
      if (!isNaN(month)) {
        monthNum = month
      } else {
        monthNum = parseInt(month)
      }
      if (monthbefor) {
        if (monthbefor > 12) {
          year = year - Math.floor(monthbefor / 12)
          monthbefor = monthbefor - 12 * Math.floor(monthbefor / 12)
        }
        if ((monthNum - monthbefor) <= 0) {
          month = monthNum - monthbefor + 12
          year = year - 1
          if (month < 10) {
            month = '0' + month
          }
        } else {
          month = monthNum - monthbefor
          if (month < 10) {
            month = '0' + month
          }
        }
      }

      return year + separate + month + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute
    } else {
      return source.slice(0, 16)
    }
  } else {
    return source
  }
}
/**
 *
 * @param {date}sourceDay 原始时间 sourceDay
 * @param {number} day多少天前
 * @param {boolean}是否忽略分钟 ignoreMinute
 * @description 多少天以前
 */
export const daybefor = function (sourceDay, day, ignoreMinute) {
  let myDate = dateFormat(sourceDay, 0, 1)
  let arr = myDate.split('-')
  // console.log(arr)
  // let myDate1 = Date(arr[0], arr[1], arr[2])
  let myDate1 = new Date()
  myDate1.setFullYear(arr[0])
  myDate1.setFullYear(arr[0], arr[1] - 1, arr[2])
  let date = new Date(myDate1)
  let value = date.getTime() - day * 86400000
  return dateFormat(value, 0, ignoreMinute)
}
//   通过周数和星期计算日期
/**
 *
 * @param {年} year
 * @param {周数} week
 * @param {星期 0-6 0代表周日} day
 * @returns {时间日期}
 */
export const dateFromWeek = function (year, week, day) {
  //   year       年
  //   week       周
  //   day         星期   (0-6,   0代表周日)
  day = day | 0
  let date1 = new Date(year, 0, 1)
  let dayMS = 24 * 60 * 60 * 1000
  let firstDay = (7 - date1.getDay()) * dayMS
  let weekMS = (week - 2) * 7 * dayMS
  let result = date1.getTime() + firstDay + weekMS + day * dayMS
  date1.setTime(result)
  // return date1.toLocaleDateString()
  return dateFormat(date1, 0, 1)
}
/**
 *
 * @param {Date} date
 * @description 转换周几
 */
export const computeWeekday = function (date) {
  let day = dateFormat(date, 0, true)
  let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let myday = new Date(Date.parse(day.replace(/-/g, '/')))
  return weekDays[myday.getDay()]
}
/**
 *
 * @param {Date} date
 * @description 转换周几
 */
export const computeWeekMorNoon = function (date) {
  let day = dateFormat(date, 0, false)
  let time = parseInt(day.slice(11, 13))
  let t = ''
  if (time > 18 || time < 6) {
    t = '晚上'
  }
  if (time >= 6 || time <= 18) {
    t = '白天'
  }
  let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let myday = new Date(Date.parse(day.replace(/-/g, '/')))

  return weekDays[myday.getDay()] + t
}
/**
 *
 * @param {Date} date
 * @description 每月总天数
 */
export const computeMonthDays = function (date) {
  let day = dateFormat(date, 0, true)
  let year = day.slice(0, 4)
  let month = day.slice(5, 6)
  let myday = new Date(year, month, 0)
  return myday.getDate()
}
/**
 *
 * @param {date} date 'yyyy-MM-dd HH:mm:ss'
 */
export const timeago = function (date) {
      // source =new Date(source.toString().replace(/\-/g, '/'))
  let time = new Date(date.toString().replace(/\-/g, '/'))
  console.log(time, '现在时间')
  let dateTimeStamp = time.getTime()
  var minute = 1000 * 60      // 把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60
  var day = hour * 24
  var week = day * 7
  var halfamonth = day * 15
  var month = day * 30
  var halfminute = 30 * 1000
  var now = new Date().getTime()   // 获取当前时间毫秒
//     console.log(now)
  var diffValue = now - dateTimeStamp// 时间差

  if (diffValue < 0) {
    return
  }
  var minC = diffValue / halfminute  // 计算时间差的分，时，天，周，月
  var hourC = diffValue / hour
  var dayC = diffValue / day
  var weekC = diffValue / week
  var monthC = diffValue / month
  var result = ''
  if (monthC >= 1 && monthC <= 3) {
    result = ' ' + parseInt(monthC) + '月前'
  } else if (weekC >= 1 && weekC <= 3) {
    result = ' ' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC <= 6) {
    result = ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    result = ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 2 && minC < 120) {
    var min = parseInt(minC)
    if (min % 2) {
      result = ' ' + parseInt(minC / 2) + '分半钟前'

//             result =" " + parseInt(minC/2) + "分钟前"
    } else if (!(min % 2)) {
      result = ' ' + parseInt(minC / 2) + '分钟前'
//             result =" " + parseInt(minC/2) + "分半钟前"
    }
//         result =" " + parseInt(minC) + "分钟前"
  } else if (diffValue >= halfminute && diffValue <= minute) {
    result = '半分钟前'
  } else if (diffValue >= 0 && diffValue <= halfminute) {
    result = '刚刚'
  } else {
    var datetime = new Date()
    datetime.setTime(dateTimeStamp)
    var Nyear = datetime.getFullYear()
    var Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
    var Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    var Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    var Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
    var Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
    result = Nyear + '-' + Nmonth + '-' + Ndate
  }
  return result
}
// timeago(1539591237005)
