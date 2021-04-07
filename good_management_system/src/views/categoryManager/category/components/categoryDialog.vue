<template>
  <el-dialog
    title="品类配置"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="dialogForm" :model="form" label-width="100px" style="width:90%" :rules="rules">
      <el-form-item label="品类名称" prop="cat_name">
        <el-input v-model="form.cat_name" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.comment" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
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
    const validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('品类名不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: this.visible,
      loading: false,
      form: defaultForm(),
      rules: {
        cat_name: [{ validator: validatePass1, trigger: 'blur' }]
      }
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
      // 向index父组件中传值
      this.$emit('update', this.visible)
      console.log(this.visible)
      this.dialogVisible = false
    },
    handleClose(done) {
      this.close()
      done()
    },
    confirm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          try {
            let res = {}
            this.loading = true
            // 新增时候
            if (!this.oldRow) {
              res = await addCategory(this.form)
            } else { // 修改时候
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
      })
    }
  }
}
</script>

