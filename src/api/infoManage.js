import request from '@/utils/request'

export function infoList(data) {
  return request({
    url: '/article/info/list',
    method: 'post',
    data: data
  })
}
export function infoAdd(data) {
  let params = {
    inforTitle: data.inforTitle,
    inforDesc: data.inforDesc,
    inforTypeSmall: data.inforTypeSmall,
    inforTypeBig:data.inforTypeBig,
    inforContent: data.inforContent,
    inforImgUrl:data.inforImgUrl
  }
  return request({
    url: '/article/info/add',
    method: 'post',
    data: params
  })
}
export function infoEdit(data) {
  let params = {
    inforTitle: data.inforTitle,
    inforDesc: data.inforDesc,
    inforTypeSmall: data.inforTypeSmall,
    inforTypeBig:data.inforTypeBig,
    inforContent: data.inforContent,
    inforImgUrl:data.inforImgUrl,
    id:data.id
  }
  return request({
    url: '/article/info/add',
    method: 'post',
    data: params
  })
}