import request from '@/utils/request'
export function updatePassword(data) {
  return request({
    url: '/user/password',
    method: 'post',
    data
  })
}
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
