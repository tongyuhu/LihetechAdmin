import request from '@/utils/request'

export function userList(data) {
  return request({
    url: '/userManage/member/list',
    method: 'post',
    data: data
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

