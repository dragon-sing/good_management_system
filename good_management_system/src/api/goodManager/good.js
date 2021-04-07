import request from '@/utils/request'

// 查询该品类下的商品 请求头方式
export const getGoods = (params) => {
  return request({
    url: '/good',
    method: 'get',
    params
  })
}

// 添加商品
export const addGoods = (data) => {
  return request({
    url: '/good',
    method: 'post',
    data
  })
}

// 修改商品
export const updateGoods = (id, data) => {
  return request({
    url: `/good/${id}`,
    method: 'post',
    data
  })
}

// 删除商品
export const delGoods = (id) => {
  return request({
    url: `/good/${id}`,
    method: 'delete'
  })
}
