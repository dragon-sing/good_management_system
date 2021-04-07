import request from '@/utils/request'
// 获取商品
export const getOperationHistory = (params) => {
  return request({
    url: `/order_operate`,
    method: 'get',
    params
  })
}
