import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/info',
    method: 'post',
    data
  })
}

export function logout() {
  // return request({
  //   url: '/login/logout',
  //   method: 'post'
  // })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: { token }
  })
}
export function getRouter() {
  return request({
    url: '/index',
    // url: '/index;jsessionid="563bbf31-a689-4520-949c-b58efd55749b"',
    method: 'post',
  })
}

