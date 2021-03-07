import request from '@/utils/request'

// 查询商品重量
export const getWeight = () => {
  return request({
    url: '/weight',
    method: 'get'
  })
}

export function delWeight(id) {
  return request({
    url: `/weight/${id}`,
    method: 'delete'
  })
}
