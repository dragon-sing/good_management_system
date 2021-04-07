import request from '@/utils/request'
// 获取订单
export const getOrderList = (params) => {
  return request({
    url: `/order`,
    method: 'get',
    params
  })
}

// 删除订单
export const delOrder = (id) => {
  return request({
    url: `/order/${id}`,
    method: 'delete'
  })
}

