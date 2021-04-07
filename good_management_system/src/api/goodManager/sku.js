import request from '@/utils/request'

// 查询商品库存 有一个非必须的请求参数
export const getSku = () => {
  return request({
    url: '/sku',
    method: 'get'
  })
}

// 添加商品库存
export const addSku = (data) => {
  return request({
    url: '/sku',
    method: 'post',
    data
  })
}

export const updateSku = (id, data) => {
  return request({
    url: `/sku/${id}`,
    method: 'put',
    data
  })
}
export function delSku(id) {
  return request({
    url: `/sku/${id}`,
    method: 'delete'
  })
}
