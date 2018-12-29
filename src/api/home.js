import request from '@/utils/request'

export function userNumber() {
  return request({
    url: '/home/statistics/num',
    method: 'post',
    // data: data
  })
}
export function userRiseRate(data) {
  return request({
    url: '/home/userRiseRate/list',
    method: 'post',
    data: data
  })
}