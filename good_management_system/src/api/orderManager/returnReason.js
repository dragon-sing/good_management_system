import request from '@/utils/request'
// 获取原因
export const getReasonList = () => {
  return request({
    url: `/order_return_reason`,
    method: 'get'
  })
}

// 添加原因
export const addReason = (data) => {
  return request({
    url: `/order_return_reason`,
    method: 'post',
    data
  })
}

// 修改原因
export const updateReason = (id, data) => {
  return request({
    url: `/order_return_reason/${id}`,
    method: 'put',
    data
  })
}

// 删除原因
export const delReason = (id) => {
  return request({
    url: `/order_return_reason/${id}`,
    method: 'delete'
  })
}
