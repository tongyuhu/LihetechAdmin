import request from '@/utils/request'

export function powerList(parentId) {
  let data = {
    parentId:parentId
  }
  return request({
    url: '/auths/list',
    method: 'post',
    data: data
  })
}
export function powerAdd(child) {
  let parmas = {
    authName:child.authName,
    authUrl:child.authUrl,
    parentId:child.parentId,
    authType:child.authType,
    authNote:child.authNote,
    authCode:child.authCode,
    // id:child.id,
    authSorting:child.authSorting,
    icon:child.icon
  }
  return request({
    url: '/auths/add',
    method: 'post',
    data: parmas
  })
}
export function powerUpdate(child) {
  let parmas = {
    authName:child.authName,
    authUrl:child.authUrl,
    parentId:child.parentId,
    authType:child.authType,
    authNote:child.authNote,
    authCode:child.authCode,
    id:child.id,
    authSorting:child.authSorting,
    icon:child.icon
  }
  return request({
    url: '/auths/update',
    method: 'post',
    data: parmas
  })
}
export function powerStop(child) {
  let parms = {
    ids:child.id,
    isStop:child.isStop
  }
  return request({
    url: '/auths/update/stop',
    method: 'post',
    data: parms
  })
}


export function roleList() {
  return request({
    url: '/role/list',
    method: 'post',
    data: {}
  })
}
export function roleAdd(role) {
  let parmas = {
    roleName:role.roleName,
    authsId:role.authsId,
    description:role.description,
    roleCode:role.roleCode,
  }
  return request({
    url: '/role/add',
    method: 'post',
    data: parmas
  })
}
export function roleUpdate(role) {
  let parmas = {
    roleName:role.roleName,
    authsId:role.authsId,
    description:role.description,
    roleCode:role.roleCode,
    id:role.id,
  }
  return request({
    url: '/role/update',
    method: 'post',
    data: parmas
  })
}


export function adminList(data) {
  return request({
    url: '/admin/list',
    method: 'post',
    data: data
  })
}
export function adminUpdate(data) {
  let parmas = {
    username:data.username,
    mobile:data.mobile,
    name:data.name,
    password:data.password,
    isStop:data.isStop,
    rolesId:data.rolesId,
    id:data.id,
    version:data.version,
    email:data.email
  }
  return request({
    url: '/admin/update',
    method: 'post',
    data: parmas
  })
}
export function adminAdd(data) {
  let parmas = {
    username:data.username,
    mobile:data.mobile,
    name:data.name,
    password:data.password,
    rolesId:data.rolesId,
    email:data.email
  }
  return request({
    url: '/admin/add',
    method: 'post',
    data: parmas
  })
}