<template>
  <div v-loading="loading" class="app-container ml-10">
    <div class="mt-10">
      <el-button size="small" type="success" @click="add"> 增加品类 </el-button>
    </div>

    <el-table
      class="mt-10"
      :data="tableData"
      border
    >
      <el-table-column align="center" prop="cat_id" label="id" width="180" />
      <el-table-column align="center" prop="cat_name" label="名称" />
      <el-table-column align="center" prop="created_time" label="创建时间" />
      <el-table-column align="center" prop="comment" label="备注" />
      <el-table-column align="center" prop="" label="操作" width="180">
        <template v-slot="{row}">
          <el-button type="success" size="mini" @click="edit(row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <category-dialog :old-row="oldRow" :visible="visible" @update="update()" @init="init" />
  </div>
</template>

<script>
import { getCategoryList, delCategory } from '@/api/categoryManager'
import categoryDialog from './components/categoryDialog'

export default {
  name: 'Category',
  components: {
    categoryDialog
  },
  data() {
    return {
      tableData: [],
      visible: false,
      loading: false,
      oldRow: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化表格
    init() {
      this.query()
    },
    // 查询是异步函数
    async query() {
      try {
        this.loading = true
        const { code, data } = await getCategoryList()
        if (code === 200) {
          this.tableData = Array.isArray(data) ? data : []
        }
      } finally {
        this.loading = false
      }
    },
    // 向子组件dialog传递两个参数, add添加中oldrow是空行
    add() {
      this.visible = true
      this.oldRow = null
    },
    // edit中oldrow中本来就有数据,将该行row赋值给oldrow
    edit(row) {
      this.visible = true
      this.oldRow = row
    },
    // 删除
    del({ cat_id }) {
      this.$layer.confirm('确定要删除吗?').then(async() => {
        const { code } = await delCategory(cat_id)
        if (code === 200) {
          this.$layer.msg('删除成功。', { type: 'success' })
          this.query()
        }
      })
    },
    update(formstate) {
      this.visible = formstate
    }
  }

}
</script>

<style>

</style>
