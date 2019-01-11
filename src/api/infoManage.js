import request from '@/utils/request'

export function infoList(data) {
  return request({
    url: '/article/info/list',
    method: 'post',
    data: data
  })
}