import request from '@/utils/request'
// 用唯一的商品号来修改商品价格
export const updatePrice = (id, data) => {
  return request({
    url: `/price/${id}`,
    method: 'post',
    data
  })
}
