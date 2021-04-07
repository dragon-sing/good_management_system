<template>
  <div>
    <el-dialog
      title="关闭订单"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      width="30%"
      append-to-body
      :before-close="handleClose"
    >
      <div class="mb-10">添加备注:</div>
      <el-input
        v-model="textarea"
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
      />

      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="close">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'CloseDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    oldRow: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: this.visible,
      textarea: '',
      loading: false
    }
  },
  watch: {
    'visible': {
      handler(show) {
        this.dialogVisible = show
        if (show) {
          // this.init()
        }
      }
    }
  },
  methods: {
    close() {
      // 向index父组件中传值
      this.$emit('update', this.visible)
      this.dialogVisible = false
    },
    handleClose(done) {
      this.close()
      done()
    }
  }

}
</script>

<style>

</style>
