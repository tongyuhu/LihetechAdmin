import request from '@/utils/request'

export function doctorList(data) {
  return request({
    url: '/hospitalManage/doctor/list',
    method: 'post',
    data: data
  })
}