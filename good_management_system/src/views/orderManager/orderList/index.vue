<template>
  <div class="app-container ml-10">
    <el-form ref="searchForm" class="flex-inline mt-20" :model="form" label-width="100px" style="width:100% ">
      <el-form-item label="订单编号" prop="order_sn">
        <el-input v-model="form.order_sn" placeholder="订单编号" style="width:200px " />
      </el-form-item>
      <el-form-item label="收货人" prop="receiver_name">
        <el-input v-model="form.receiver_name" placeholder="收件人姓名或号码" style="width:200px " />
      </el-form-item>
      <el-form-item label="提交时间" prop="create_time">
        <el-col>
          <el-date-picker v-model="form.create_time" type="date" placeholder="选择日期" style="width:200px " />
        </el-col>
      </el-form-item>
      <el-form-item label="订单状态" prop="status">
        <el-select v-model="form.status" style="width:200px" placeholder="全部">
          <el-option
            v-for="v in order_status"
            :key="v.value"
            :label="v.label"
            :value="v.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单分类" prop="order_type">
        <el-select v-model="form.order_type" style="width:200px" placeholder="全部">
          <el-option
            v-for="v in order_type"
            :key="v.value"
            :label="v.label"
            :value="v.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单来源" prop="source_type">
        <el-select v-model="form.source_type" style="width:200px" placeholder="全部">
          <el-option
            v-for="v in order_source_type"
            :key="v.value"
            :label="v.label"
            :value="v.value"
          />
        </el-select>
      </el-form-item>
      <div class="mb-23 ml-35">
        <el-button type="primary" @click="query">提交</el-button>
      </div>
    </el-form>

    <el-table
      v-loading="loading"
      class="mt-20"
      :data="tableData"
      max-height="500"
      border
    >
      <el-table-column align="center" prop="id" label="编号" width="180px" />
      <el-table-column align="center" prop="order_sn" label="订单编号" width="180px" />
      <el-table-column align="center" prop="create_time" label="提交时间" width="180px" />
      <el-table-column align="center" prop="member_username" label="用户账号" width="180px" />
      <el-table-column align="center" prop="total_amount" label="订单金额" width="180px" />
      <el-table-column align="center" prop="" label="支付方式" width="180px">
        <template v-slot="{row}">
          <div>{{ order_status[row.status] && order_status[row.status].label }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="source_type" label="订单来源">
        <template v-slot="{row}">
          <div>{{ order_source_type[row.source_type] && order_source_type[row.source_type].label }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="订单状态">
        <template v-slot="{row}">
          <div>{{ order_status[row.status] && order_status[row.status].label }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="" label="操作" width="250px">
        <template v-slot="{row}">
          <el-button type="success" size="mini" @click="orderinfo(row)">查看订单</el-button>
          <el-button v-if="row.status === 0" type="success" size="mini" @click="orderclose(row)">{{ order_status[row.status].button_text }}</el-button>
          <el-button v-if="row.status === 1" type="success" size="mini" @click="orderdeliver(row)">{{ order_status[row.status].button_text }}</el-button>
          <el-button v-if="row.status === 2" type="success" size="mini" @click="ordertrack(row)">{{ order_status[row.status].button_text }}</el-button>
          <el-button v-if="row.status === 3" type="success" size="mini" @click="orderinfo(row)">{{ order_status[row.status].button_text }}</el-button>
          <el-button v-if="row.status === 4" type="danger" size="mini" @click="del(row)">{{ order_status[row.status].button_text }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <close-dialog :old-row="oldRow1" :visible="closevisible" @update="update()" @init="init" />
    <track-dialog :old-row="oldRow2" :visible="trackvisible" @update="update()" @init="init" />
  </div>
</template>

<script>
import { getOrderList, delOrder } from '@/api/orderManager/orderList'
import { order_status, order_type, order_source_type } from '@/constants'
import TrackDialog from './components/trackDialog'
import CloseDialog from './components/closeDialog'
const defaultForm = () => ({
  order_sn: '',
  receiver_name: '',
  create_time: '',
  status: '',
  order_type: '',
  source_type: ''
})
export default {
  name: 'OrderList',
  components: {
    TrackDialog,
    CloseDialog
  },
  data() {
    return {
      loading: false,
      form: defaultForm(),
      tableData: [{}],
      order_status,
      order_type,
      order_source_type,
      trackvisible: false,
      closevisible: false,
      oldRow1: {},
      oldRow2: {}
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
        const { code, data } = await getOrderList(this.form)
        if (code === 200) {
          this.tableData = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    },
    del({ id }) {
      this.$layer.confirm('确定要删除吗?').then(async() => {
        const { code } = await delOrder(id)
        if (code === 200) {
          this.$layer.msg('删除成功。', { type: 'success' })
          this.query()
        }
      })
    },
    orderdeliver(row) {
      // this.$router.push({ path: '/orderManager/orderDeliver', query: row })
      // console.log(row)
      this.$router.push(`/orderManager/orderDeliver?order=${JSON.stringify(row)}`)
    },
    orderclose(row) {
      this.closevisible = true
      this.oldRow1 = row
    },
    ordertrack(row) {
      this.trackvisible = true
      this.oldRow2 = row
    },
    orderinfo({ order_sn }) {
      this.$router.push({ path: '/orderManager/orderInfo', query: { order_sn: order_sn }})
    },
    update(formstate) {
      this.visible = formstate
    }
  }

}
</script>

<style>

</style>
