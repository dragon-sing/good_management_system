<template>
  <div v-loading="loading" class="app-container">
    <div class="mt-10">
      <el-button size="small" type="success" @click="add"> 增加品类 </el-button>
    </div>

    <el-table
      class="mt-10"
      :data="tableData"
      border
      height="250"
    >
      <el-table-column align="center" prop="cat_id" label="id" width="180" />
      <el-table-column align="center" prop="cat_name" label="名称" width="180" />
      <el-table-column align="center" prop="created_time" label="创建时间" width="180" />
      <el-table-column align="center" prop="comment" label="备注" width="180" />
      <el-table-column align="center" prop="" label="操作" width="180">
        <template v-slot="{row}">
          <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryCategory } from '@/api/category'

export default {
  name: 'Category',
  data() {
    return {
      tableData: [],
      visible: false,
      loading: false,
      oldRow: {}
    }
  },
  mounted() {
    // 调用初始化函数进行初始查询
    this.init()
  },
  methods: {
    // 初始化表格
    init() {
      this.query()
    },

    async query() {
      try {
        this.loading = true
        const { data, code } = await queryCategory()
        if (code === 200) {
          this.tableData = data
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
