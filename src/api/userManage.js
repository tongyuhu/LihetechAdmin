import request from '@/utils/request'

export function userList(data) {
  return request({
    url: '/userManage/member/list',
    method: 'post',
    data: data
  })
}
export function editUser(data) {
  let params = {
    realName:data.realName,
    sex:data.sex,
    birthDate:data.birthDate,
    height:data.height,
    weight:data.weight,
    mobile:data.mobile,
    doctorId:data.doctorId,
    isStop:data.isStop,
    userId:data.userId
  }
  return request({
    url: '/userManage/user/basic/edit',
    method: 'post',
    data: params
  })
}

export function userOnOff(data) {
  return request({
    url: '/userManage/update/stop',
    method: 'post',
    data
  })
}

export function bloodCover(data) {
  return request({
    url: '/userManage/blood/countBase',
    method: 'post',
    data:data
  })
}
export function bloodAverage(data,type) {
  data.dateType = type + 1
  return request({
    url: '/userManage/blood/trend/bpAvg',
    method: 'post',
    data:data
  })
}
export function bloodTrend(data,type) {
  data.dateType = type
  return request({
    url: '/userManage/blood/trend',
    method: 'post',
    data:data
  })
}

