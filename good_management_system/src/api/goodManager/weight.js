import request from '@/utils/request'

// 查询商品重量
export const getWeight = () => {
  return request({
    url: '/weight',
    method: 'get'
  })
}

// 添加商品重量
export const addWeight = (data) => {
  return request({
    url: '/weight',
    method: 'post',
    data
  })
}

export const updateWeight = (id, data) => {
  return request({
    url: `/weight/${id}`,
    method: 'put',
    data
  })
}
export function delWeight(id) {
  return request({
    url: `/weight/${id}`,
    method: 'delete'
  })
}
