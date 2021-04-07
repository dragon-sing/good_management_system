export const pay_type = [
  { value: 0, label: '未支付' },
  { value: 1, label: '支付宝' },
  { value: 2, label: '微信' }
]

export const order_type = [
  { value: 0, label: '正常订单' },
  { value: 1, label: '秒杀订单' }
]

export const order_source_type = [
  { value: 0, label: 'PC订单' },
  { value: 1, label: 'app订单' }
]

export const order_status = [
  { value: 0, label: '待付款', button_text: '关闭订单' },
  { value: 1, label: '待发货', button_text: '订单发货' },
  { value: 2, label: '已发货', button_text: '订单跟踪' },
  { value: 3, label: '已完成', button_text: '订单跟踪' },
  { value: 4, label: '已关闭', button_text: '删除订单' },
  { value: 5, label: '无效订单' }
]

export const order_deliver_type = [
  { value: 0, label: '顺丰快递' },
  { value: 1, label: '圆通快递' },
  { value: 2, label: '中通快递' },
  { value: 3, label: '韵达快递' }
]
