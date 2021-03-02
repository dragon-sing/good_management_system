import request from '@/utils/request'

// 添加品类
export const addCategory = (data) => {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}

// 删除品类
export const delCategory = (id) => {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}

// 获取品类
export const getCategoryList = () => {
  return request({
    url: `/category`,
    method: 'get'
  })
}

// 修改品类
export const updateCategory = (id, data) => {
  return request({
    url: `/category/${id}`,
    method: 'put',
    data
  })
}
