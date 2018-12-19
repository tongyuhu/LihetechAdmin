// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export function sex(sex) {
  if(sex){
    sex = '男'
  }else{
    sex = '女'
  }
  return sex
}
export function bloodPressureType(type) {
  switch (type) {
    case 0:
      type = '未知 '
      break;
    case 1:
      type = '1级高血压 '
      break;
    case 2:
      type = '2级高血压 '
      break;
    case 3:
      type = '3级高血压 '
      break;
    case 4:
      type = '正常 '
      break;
    case 5:
      type = '正常高值 '
      break;
    case 6:
      type = '低压 '
      break;
  
    default:
    type = '未知 '
      break;
  }
  return type
}
export function joinTime(time) {
  if(time){
    return time.substring(0,10)
  }else{
    return time
  }
}
export function isStop(stauts) {
  if(!stauts){
    return '停用'
  }else if(stauts){
    return '开启'
  }
}
