import request from '@/utils/request'
// 获取商品
export const getGoodsById = (params) => {
  return request({
    url: `/order_item`,
    method: 'get',
    params
  })
}
