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
      <el-table-column align="center" prop="category_id" label="id" width="180" />
      <el-table-column align="center" prop="category_name" label="名称" width="180" />
      <el-table-column align="center" prop="category_time" label="创建时间" width="180" />
      <el-table-column align="center" prop="" label="操作" width="180">
        <template v-slot="{row}">
          <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
    this.init()
  },
  methods: {
    // 初始化表格
    init() {
      this.query()
    },
    // 查询是异步函数
    query() {

    }

  }

}
</script>

<style>

</style>
