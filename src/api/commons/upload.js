import request from '@/utils/request'
export function upload(data) {
  // let parms = {
  //   ids:params.id,
  //   isStop:params.isStop
  // }
  return request({
    url: '/BPWatch/upload/commons',
    method: 'post',
    data: data
  })
}