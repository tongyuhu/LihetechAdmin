import request from '@/utils/request'

export function doctorList(data) {
  return request({
    url: '/hospitalManage/doctor/list',
    method: 'post',
    data: data
  })
}
export function doctorEdit(data) {
  let params = {
    username:data.username,
    mobile:data.mobile,
    name:data.name,
    password:data.password,
    adminHospitalId:data.adminHospitalId,
    email:data.email,
    id:data.id,
    isStop:data.isStop,
  }
  return request({
    url: '/hospitalManage/doctor/update',
    method: 'post',
    data: params
  })
}
export function doctorAdd(data) {
  let params = {
    username:data.username,
    mobile:data.mobile,
    name:data.name,
    password:data.password,
    adminHospitalId:data.adminHospitalId,
    email:data.email,
  }
  return request({
    url: '/hospitalManage/doctor/add',
    method: 'post',
    data: params
  })
}
export function doctorOnOff(data) {
  let params = {
    ids:data.ids,
    isStop:data.isStop,
  }
  return request({
    url: '/hospitalManage/doctor/update/stop',
    method: 'post',
    data: params
  })
}
export function hospitalList(data) {
  return request({
    url: '/hospitalManage/hospital/list',
    method: 'post',
    data: data
  })
}
export function hospitalEdit(data) {
  let params = {
    username:data.username,
    mobile:data.mobile,
    name:data.name,
    email:data.email,
    password:data.password,
    department:data.hospitalName,
    address:data.address,
    id:data.id,
    isStop:data.isStop,
  }
  return request({
    url: '/hospitalManage/hospital/update',
    method: 'post',
    data: params
  })
}
export function hospitalAdd(data) {
  let params = {
    username:data.username,
    mobile:data.mobile,
    name:data.name,
    password:data.password,
    department:data.department,
    email:data.email,
    address:data.address
  }
  return request({
    url: '/hospitalManage/hospital/add',
    method: 'post',
    data: params
  })
}
export function hospitalOnOff(data) {
  let params = {
    ids:data.ids,
    isStop:data.isStop,
  }
  return request({
    url: '/hospitalManage/hospital/update/stop',
    method: 'post',
    data: params
  })
}