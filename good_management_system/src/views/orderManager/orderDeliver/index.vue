<template>
  <div v-loading="loading" class="app-container ml-10">

    <div class="flex-inline">
      <el-table
        class="mt-30 mr-20"
        :data="tableData"
        border
      >
        <el-table-column align="center" prop="order_sn" label="订单编号" />
        <el-table-column align="center" prop="receiver_name" label="收货人" />
        <el-table-column align="center" prop="receiver_phone" label="手机号码" />
        <el-table-column align="center" prop="receiver_post_code" label="邮政编码" />
        <el-table-column align="center" prop="" label="收货地址">
          <template v-slot="{row}">
            <span>{{ row.receiver_province }}{{ row.receiver_city }}{{ row.receiver_region }}{{ row.receiver_detail_address }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="配送方式">
          <template v-slot>
            <!-- <div v-if="!!row.delivery_company">{{ row.delivery_company }}</div> -->
            <el-select v-model="form.delivery_company" style="width:180px" placeholder="选择配送方式">
              <el-option
                v-for="v in order_deliver_type"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="物流单号">
          <template v-slot>
            <!-- <div v-if="!!row.delivery_sn">{{ row.delivery_sn }}</div> -->
            <el-input v-model="form.delivery_sn" style="width:180px" placeholder="输入物流单号" />
          </template>
        </el-table-column></el-table>

    </div>
    <el-button class="mt-20" style="float:center" size="small" type="primary" :loading="loading" @click="submitForm">提交</el-button>
  </div>
</template>

<script>
import { order_deliver_type } from '@/constants'
import { setDeliverOrder } from '@/api/orderManager/orderDeliver'
const defaultForm = () => {
  return {
    order_sn: '',
    delivery_company: '',
    delivery_sn: '',
    receiver_name: '',
    receiver_phone: '',
    receiver_post_code: '',
    receiver_province: '',
    receiver_city: '',
    receiver_region: '',
    receiver_detail_address: ''
  }
}

export default {
  name: 'OrderDeliver',

  data() {
    return {
      tableData: [],
      loading: false,
      form: defaultForm(),
      order_deliver_type
    }
  },
  mounted() {
    this.getOrder()
  },

  methods: {
    getOrder() {
      const oldRow = JSON.parse(this.$route.query.order)
      if (oldRow) {
        this.tableData[0] = oldRow
        this.form.delivery_company = oldRow.delivery_company
        this.form.delivery_sn = oldRow.delivery_sn
        this.form.order_sn = oldRow.order_sn
      }
    },
    async submitForm() {
      try {
        this.loading = true
        const { code } = await setDeliverOrder(this.form.order_sn, this.form)
        if (code === 200) {
          // this.tableData = Array.isArray(data) ? data : []
          this.$layer.msg('提交成功', { type: 'success' })
        }
      } finally {
        this.loading = false
      }
    }

  }
}
</script>

<style>

</style>

