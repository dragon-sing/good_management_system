<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="to do list" name="directly">
        <el-input v-model="inputValue" placeholder="添加你想要做的任务" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleClick(inputValue,$event)">
          添加任务
        </el-button>
        <el-button type="primary" icon="el-icon-document" @click="handleSelect(inputValue,$event)">
          查询任务
        </el-button>
        <list-task :send-list="list" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import listTask from './listTask'
export default {
  components: {
    // 'todo-item': todoItem,
    listTask
  },
  data() {
    return {
      activeName: 'toDolist',
      inputValue: '',
      list: [],
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.list.push({ 'id': this.count, 'value': this.inputValue })
      this.count++
      this.inputValue = ''
      console.log(this.count, this.list)
    }
    // handleSelect(input, event) {
    //   this.selectList = []
    //   // for (let i = 0; i < this.list.length; i++) {
    //   //   if (this.list[i].indexOf(input) !== -1) {

    //   //   }
    //   // }
    // }
  }
}
</script>
