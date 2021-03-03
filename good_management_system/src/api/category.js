import request from '@/utils/request'
export function queryCategory() {
  return request({
    url: '/category',
    method: 'get'
  })
}

export function deleteCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}

export function addCategory() {
  return request({
    url: '/category',
    method: 'post'
  })
}
