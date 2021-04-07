import request from '@/utils/request'
// 获取订单设置
export const getOrderSetting = () => {
  return request({
    url: `/order_setting`,
    method: 'get'
  })
}

// 修改原因
export const updateOrderSetting = (id, data) => {
  return request({
    url: `/order_setting/${id}`,
    method: 'put',
    data
  })
}
