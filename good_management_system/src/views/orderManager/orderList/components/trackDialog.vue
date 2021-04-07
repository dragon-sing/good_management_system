<template>
  <div>
    <el-dialog
      title="订单跟踪"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      width="40%"
      append-to-body
      :before-close="handleClose"
    >

      <el-steps direction="vertical" finish-status="success" :active="6">
        <el-step title="订单已提交，等待付款" description="2017-04-01 12:00:00" />
        <el-step title="订单付款成功" description="2017-04-01 12:00:00" />
        <el-step title="在上海市进行下级地点扫描，等待付款" description="2017-04-01 12:00:00" />
        <el-step title="在分拨中心上海奉贤公司进行卸车扫描，等待付款" description="2017-04-01 12:00:00" />
        <el-step title="在上海奉贤公司进行发出扫描" description="2017-04-01 12:00:00" />
        <el-step title="到达目的地网点上海师范大学菜鸟驿站，快件将很快进行派送" description="2017-04-01 12:00:00" />
        <el-step title="订单已签收，期待再次为您服务" description="2017-04-01 12:00:00" />
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'TrackDialog',
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
      dialogVisible: this.visible
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
