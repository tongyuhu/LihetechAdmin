import request from '@/utils/request'

export function adminLogList(data) {
  return request({
    url: '/sysLogs/admin/list',
    method: 'post',
    data: data
  })
}
export function doctorLogList(data) {
  return request({
    url: '/sysLogs/doctor/list',
    method: 'post',
    data: data
  })
}
export function userLogList(data) {
  return request({
    url: '/sysLogs/user/list',
    method: 'post',
    data: data
  })
}