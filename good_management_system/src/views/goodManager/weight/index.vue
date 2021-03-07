<template>
  <div v-loading="loading" class="app-container ml-10">
    <div class="flex-inline mt-10">
      <div class="flex-inline  mr-10">
        <span class="flex-inline mr-10">商品ID:</span>
        <el-input v-model="form.product_id" />
      </div>

      <el-button size="small" type="success" @click="query"> 查询 </el-button>
    </div>

    <div class="flex-inline">
      <el-table
        class="mt-30"
        :data="tableData"
        border
      >
        <el-table-column align="center" prop="id" label="id" />
        <el-table-column align="center" prop="product_id" label="商品id" />
        <el-table-column align="center" prop="weight" label="重量" />
        <el-table-column align="center" prop="" label="操作" width="180">
          <template v-slot="{row}">
            <el-button type="success" size="mini" @click="edit(row)">修改</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column></el-table></div>

    <weight-dialog :old-row="oldRow" :visible="visible" @update="update()" @init="init" />
  </div>
</template>

<script>
import { getWeight, delWeight } from '@/api/goodManager/weight'
import WeightDialog from './components/weightDialog'

const defaultForm = () => {
  return {
    product_id: ''
  }
}
export default {
  name: 'Weight',
  components: {
    WeightDialog
  },
  data() {
    return {
      // 这里面写一个空对象，可以显示操作
      tableData: [{}],
      loading: false,
      visible: false,
      oldRow: {},
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
        const { code, data } = await getWeight(this.form)
        if (code === 200) {
          this.tableData = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    },

    add() {
      this.visible = true
      this.oldRow = null
    },

    edit(row) {
      this.visible = true
      this.oldRow = row
    },
    update(formstate) {
      this.visible = formstate
    },
    del({ product_id }) {
      this.$layer.confirm('确定要删除吗?').then(async() => {
        const { code } = await delWeight(product_id)
        if (code === 200) {
          this.$layer.msg('删除成功。', { type: 'success' })
          this.query()
        }
      })
    },
    setWeight({ product_id }) {

    },
    setPrice({ product_id }) {

    }
  }
}
</script>

<style>

</style>
