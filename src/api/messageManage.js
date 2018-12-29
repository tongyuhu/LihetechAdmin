import request from '@/utils/request'

export function suggestList(data) {
  return request({
    url: '/feedback/suggest/list',
    method: 'post',
    data: data
  })
}
export function suggestSubmit(data) {
  let params = {
    realame:data.realame,
    createTime:data.createTime,
    dealWithContent:data.dealWithContent,
    operatId:data.operatId,
    feedDesc:data.feedDesc,
    isProcessed:data.isProcessed,
    name:data.name,
    mobile:data.mobile,
    id:data.id,
    userId:data.userId
  }
  return request({
    url: '/feedback/suggest/update',
    method: 'post',
    data: params
  })
}