import request from '@/utils/request'
export function queryVisitor() {
  return request({
    url: '/visit',
    method: 'get'
  })
}
