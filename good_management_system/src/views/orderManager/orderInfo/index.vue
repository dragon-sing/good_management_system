<template>
  <div class="detail-container">
    <div ref="step-container">
      <el-steps :active="1" finish-status="success">
        <el-step title="提交订单" />
        <el-step title="支付订单" />
        <el-step title="平台发货" />
        <el-step title="确认收货" />
        <el-step title="完成评价" />
      </el-steps>
    </div>
    <div>

    </div>
    <div class="body-container">
      <div class="operate-container flex-inline mb-50">
        <div>
          <i class="el-icon-warning-outline"></i>
          <span>当前订单状态：</span>
          <span>待发货</span>
        <!-- 写组件 -->
        </div>
      </div>

      <div class="info">
        <i class="el-icon-collection-tag"></i>
        <span>基本信息：</span>

        <el-table
          v-loading="loading"
          class="mt-30 mb-50"
          :data="basicData"
          border
        >

          <el-table-column align="center" prop="order_sn" label="订单编号" />
          <el-table-column align="center" prop="datetime" label="提交时间" />
          <el-table-column align="center" prop="member_username" label="用户账号" />
          <el-table-column align="center" prop="" label="支付方式" width="180px">
            <template v-slot="{row}">
              <div>{{ pay_type[row.pay_type] && pay_type[row.pay_type].label }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="source_type" label="订单来源">
            <template v-slot="{row}">
              <div>{{ order_source_type[row.source_type] && order_source_type[row.source_type].label }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="order_type" label="订单类型">
            <template v-slot="{row}">
              <div>{{ order_type[row.order_type] && order_type[row.order_type].label }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="delivery_company" label="配送方式">
            <template v-slot="{row}">
              <div>{{ order_deliver_type[row.order_deliver_type] && order_deliver_type[row.order_deliver_type].label }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="delivery_sn" label="物流单号" />
          <el-table-column align="center" prop="auto_confirm_day" label="自动确认收货时间" />
          <el-table-column align="center" prop="integration" label="订单可得优币" />
          <el-table-column align="center" prop="growth" label="订单可得成长值" />
          <el-table-column align="center" prop="promotion_info" label="活动信息" width="200px" />

        </el-table>

        <i class="el-icon-collection-tag"></i>
        <span>收货人信息：</span>
        <el-table
          v-loading="loading"
          class="mt-30 mb-50"
          :data="basicData"
          border
        >
          <el-table-column align="center" prop="receiver_name" label="收货人" />
          <el-table-column align="center" prop="receiver_phone" label="联系方式" />
          <el-table-column align="center" prop="receiver_post_code" label="邮政编码" />
          <el-table-column align="center" prop="" label="收货地址">
            <template v-slot="{row}">
              <span>{{ row.receiver_province }}{{ row.receiver_city }}{{ row.receiver_region }}{{ row.receiver_detail_address }}</span>
            </template>
          </el-table-column>

        </el-table>

        <i class="el-icon-collection-tag"></i>
        <span>商品信息：</span>
        <el-table
          v-loading="loading"
          class="mt-30 mb-20"
          :data="goodData"
          border
        >
          <el-table-column align="center" prop="" label="商品图片">
            <template v-slot="{row}">
              <el-image
                style="width: 80px; height:80px"
                :src="row.product_pic"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="product_name" label="商品名称" />
          <el-table-column align="center" prop="product_price" label="价格/货号" />
          <el-table-column align="center" prop="" label="属性">
            <template v-slot="{row}">
              <span>{{ JSON.parse(row.product_attr)[0].key }}: </span>
              <span>{{ JSON.parse(row.product_attr)[0].value }}</span>
              <br />
              <span>{{ JSON.parse(row.product_attr)[1].key }}: </span>
              <span>{{ JSON.parse(row.product_attr)[1].value }}</span>

            </template>
          </el-table-column>
          <el-table-column align="center" prop="product_quantity" label="数量" />
          <el-table-column align="center" prop="" label="小计">
            <template v-slot="{row}">
              <span>{{ row.product_quantity*row.product_price }}</span>
            </template>
          </el-table-column>

        </el-table>
        <div class="mb-50">
          <span style="float:right">总计为：{{ totalPrice }}</span>
        </div>

        <i class="el-icon-collection-tag"></i>

        <span>费用信息：</span>
        <el-table
          v-loading="loading"
          class="mt-30 mb-50"
          :data="basicData"
          border
        >
          <el-table-column align="center" prop="" label="商品合计">
            <template v-slot>
              <span>￥{{ totalPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="运费">
            <template v-slot="{row}">
              <div>￥{{ row.freight_amount?row.freight_amount:0 }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="优惠券">
            <template v-slot="{row}">
              <span>-￥{{ row.coupon_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="积分抵扣">
            <template v-slot="{row}">
              <span>-￥{{ row.integration_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="活动优惠">
            <template v-slot="{row}">
              <span>-￥{{ row.promotion_amount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="折扣金额">
            <template v-slot="{row}">
              <div>-￥{{ row.discount_amount?row.discount_amount:0 }}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="订单总金额">
            <template v-slot>
              <span style="color:red">￥{{ totalPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="" label="应付款金额">
            <template v-slot="{row}">
              <span style="color:red">￥{{ row.pay_amount?row.pay_amount:0 }}</span>
            </template>
          </el-table-column>
        </el-table>

        <i class="el-icon-collection-tag"></i>
        <span>操作信息：</span>
        <el-table
          v-loading="loading"
          class="mt-30 mb-50"
          :data="historyData"
          border
        >
          <el-table-column align="center" prop="operate_man" label="操作者" />
          <el-table-column align="center" prop="create_time" label="操作时间" />
          <el-table-column align="center" prop="order_status" label="订单状态" />
          <el-table-column align="center" prop="note" label="备注" />
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import { pay_type, order_type, order_source_type, order_deliver_type } from '@/constants'
import { getGoodsById } from '@/api/orderManager/orderInfo'
import { getOrderList } from '@/api/orderManager/orderList'
import { getOperationHistory } from '@/api/orderManager/orderOperate'
const defaultForm = () => {
  return {
    order_sn: ''
  }
}
export default {
  name: 'OrderInfo',
  data() {
    return {
      loading: false,
      basicData: [],
      goodData: [],
      historyData: [],
      costData: [],
      pay_type,
      order_type,
      form: defaultForm(),
      order_source_type,
      order_deliver_type,
      order_id: ''
    }
  },
  computed: {
    totalPrice() {
      return this.goodData.map(
        row => row.product_quantity * row.product_price).reduce(
        (acc, cur) => (parseFloat(cur) + acc), 0)
    }
  },
  mounted() {
    this.setOrderSn()
    this.getGoods()
    this.getOrder()
  },

  methods: {
    setOrderSn() {
      if (this.$route.query.hasOwnProperty('order_sn')) {
        this.form.order_sn = this.$route.query.order_sn
      } else {
        return
      }
    },
    async getGoods() {
      try {
        this.loading = true
        const { code, data } = await getGoodsById(this.form)
        if (code === 200) {
          this.goodData = Array.isArray(data) ? data : []
          this.order_id = this.goodData[0].order_id
          this.getOperation()
        }
      } finally {
        this.loading = false
      }
    },
    async getOrder() {
      try {
        this.loading = true
        const { code, data } = await getOrderList(this.form)
        if (code === 200) {
          this.basicData = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    },
    async getOperation() {
      try {
        this.loading = true
        const { code, data } = await getOperationHistory({ order_id: this.order_id })
        if (code === 200) {
          this.historyData = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    }

  }
}
</script>

<style>
.detail-container {
  margin: 0px 20px;
  padding: 40px;
}
.body-container {
  padding: 30px;
  margin: 20px;
}
.operate-container {
  background-color: rgb(227, 233, 233);
  height: 100px;

}
.info{
 position: relative;
}
</style>
