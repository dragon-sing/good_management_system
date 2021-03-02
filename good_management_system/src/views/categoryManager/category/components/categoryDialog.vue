<template>
  <el-dialog
    title="品类配置"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form label-width="100px" style="width:90%">
      <el-form-item label="品类名称">
        <el-input v-model="form.cat_name" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.comment" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCategory, updateCategory } from '@/api/categoryManager'

const defaultForm = () => ({
  cat_name: '',
  comment: ''
})
export default {
  name: 'CategoryDialog',
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
      loading: false,
      form: defaultForm()
    }
  },
  watch: {
    'visible': {
      handler(show) {
        this.dialogVisible = show
        if (show) {
          this.init()
        }
      }
    }
  },
  methods: {
    init() {
      // 新增
      if (!this.oldRow) {
        this.form = defaultForm()
        return
      }
      // 修改
      this.form.cat_name = this.oldRow.cat_name
      this.form.comment = this.oldRow.comment
    },
    close() {
      this.$emit('update:visible')
      this.dialogVisible = false
    },
    handleClose(done) {
      this.close()
      done()
    },
    async confirm() {
      this.loading = true
      try {
        let res = {}
        this.loading = true
        // 添加
        if (!this.oldRow) {
          res = await addCategory(this.form)
        } else {
          res = await updateCategory(this.oldRow.cat_id, this.form)
        }

        const { code } = res

        if (code === 200) {
          this.$layer.msg('操作成功', { type: 'success' })
          this.close()
          this.$emit('init')
        }
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

