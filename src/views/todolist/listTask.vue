<template>
  <ul>
    <li v-for="(item,index) of list" :key="item.id" :content="item" :index="index">
      {{ item.value }}
      <el-button type="primary" icon="el-icon-document" @click="handleDelete(item)">
        删除任务
      </el-button>
      <el-button type="primary" icon="el-icon-document" @click="handleModify(item)">
        修改任务
      </el-button>
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="modifyVisible"
      >
        <el-input v-model="inputValueDialog" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleSave()">
          保存
        </el-button>
      </el-dialog>
    </li>
  </ul>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      modifyVisible: false,
      inputValueDialog: '',
      selectVisible: false,
      currItem: {}
    }
  },
  methods: {
    handleClick() {
      this.list.push({ 'id': this.count, 'value': this.inputValue })
      this.count++
      this.inputValue = ''
    },
    handleDelete(item) {
      this.currItem = item
      const { id: deleteId } = item
      const index = this.list.findIndex(v => v.id === deleteId)
      this.list.splice(index, 1)
    },
    handleModify(item) {
      this.currItem = item
      this.modifyVisible = true
      this.inputValueDialog = item.value
    },
    handleSave() {
      this.modifyVisible = false
      const { id: deleteId } = this.currItem
      const index = this.list.findIndex(v => v.id === deleteId)
      this.list[index].value = this.inputValueDialog
    }
  }
}
</script>
