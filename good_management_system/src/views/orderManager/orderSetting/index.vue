<template>
  <div v-loading="loading" class="app-container ml-10">
    <el-form ref="settingForm" class="flex-inline mt-10" :model="form" label-width="120px" style="width:40%">
      <el-form-item label="秒杀订单超过：" prop="flash_order_overtime">
        <el-input v-model="form.flash_order_overtime" style="width:150px">
          <template slot="append">分</template>
        </el-input>
        <span class="ml-20">未付款，订单自动关闭</span>
      </el-form-item>

      <el-form-item label="正常订单超过：" prop="normal_order_overtime">
        <el-input v-model="form.normal_order_overtime" style="width:150px">
          <template slot="append">分</template>
        </el-input>
        <span class="ml-20">未付款，订单自动关闭</span>
      </el-form-item>

      <el-form-item label="发货超过：" prop="confirm_overtime">
        <el-input v-model="form.confirm_overtime" style="width:150px">
          <template slot="append">天</template>
        </el-input>
        <span class="ml-20">未收货，订单自动完成</span>
      </el-form-item>

      <el-form-item label="订单完成超过：" prop="finish_overtime">
        <el-input v-model="form.finish_overtime" style="width:150px">
          <template slot="append">天</template>
        </el-input>
        <span class="ml-20">自动结束交易，不能申请售后</span>
      </el-form-item>

      <el-form-item label="订单完成超过：">
        <el-input v-model="form.comment_overtime" style="width:150px">
          <template slot="append">天</template>
        </el-input>
        <span class="ml-20">自动五星好评</span>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="confirm('settingForm')">提交</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { getOrderSetting, updateOrderSetting } from '@/api/orderManager/orderSetting'

const defaultForm = () => ({
  flash_order_overtime: '',
  normal_order_overtime: '',
  confirm_overtime: '',
  finish_overtime: '',
  comment_overtime: ''
})
export default {
  name: 'OrderSetting',
  data() {
    return {
      loading: false,
      form: defaultForm()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.query()
    },

    async query() {
      try {
        this.loading = true
        const { code, data } = await getOrderSetting()
        if (code === 200) {
          this.form = Array.isArray(data) ? data[0] : []
          if (this.form !== {}) {
            this.form.flash_order_overtime = data[0].flash_order_overtime
            this.form.normal_order_overtime = data[0].normal_order_overtime
            this.form.confirm_overtime = data[0].confirm_overtime
            this.form.finish_overtime = data[0].finish_overtime
            this.form.comment_overtime = data[0].comment_overtime
          }
        }
      } finally {
        this.loading = false
      }
    },

    confirm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          try {
            this.loading = true
            const { code } = await updateOrderSetting(1, this.form)
            if (code === 200) {
              this.$layer.msg('操作成功', { type: 'success' })
            }
          } finally {
            this.loading = false
          }
        }
      })
    }
  }

}
</script>

<style>

</style>
