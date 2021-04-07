<template>
  <div v-loading="loading" class="app-container ml-10">
    <div class="mt-10">
      <el-button size="small" type="primary" @click="add"> 添加 </el-button>
    </div>

    <div class="flex-inline">
      <el-table
        class="mt-30"
        :data="tableData"
        border
      >
        <el-table-column align="center" prop="id" label="id" />
        <el-table-column align="center" prop="name" label="原因" />
        <el-table-column align="center" prop="sort" label="排序" />
        <el-table-column align="center" prop="status" label="是否可用">
          <template v-slot="{row}">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_time" label="添加时间" />
        <el-table-column align="center" prop="" label="操作" width="180">
          <template v-slot="{row}">
            <el-button type="success" size="mini" @click="edit(row)">修改</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column></el-table></div>

    <reason-dialog :old-row="oldRow" :visible="visible" @update="update()" @init="init" />
  </div>
</template>

<script>
import { getReasonList, delReason } from '@/api/orderManager/returnReason'
import reasonDialog from './components/reasonDialog'

const defaultForm = () => {
  return {
    id: ''
  }
}
export default {
  name: 'ReturnReason',
  components: {
    reasonDialog
  },
  data() {
    return {
      tableData: [],
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
        const { code, data } = await getReasonList()
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
    del({ id }) {
      this.$layer.confirm('确定要删除吗?').then(async() => {
        const { code } = await delReason(id)
        if (code === 200) {
          this.$layer.msg('删除成功。', { type: 'success' })
          this.query()
        }
      })
    }

  }
}
</script>

<style>

</style>

