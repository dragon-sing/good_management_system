import request from '@/utils/request'
export const setDeliverOrder = (id, data) => {
  return request({
    url: `/order_deliver/${id}`,
    method: 'put',
    data
  })
}
