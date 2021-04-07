<template>
  <el-dialog
    title="退货原因配置"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="dialogForm" :model="form" label-width="100px" style="width:90%" :rules="rules">
      <el-form-item label="原因" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" />
      </el-form-item>
      <el-form-item label="是否可用">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addReason, updateReason } from '@/api/orderManager/returnReason'

const defaultForm = () => ({
  name: '',
  sort: '',
  status: ''
})
export default {
  name: 'ReasonDialog',
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
        callback(new Error('原因不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: this.visible,
      loading: false,
      form: defaultForm(),
      rules: {
        name: [{ validator: validatePass1, trigger: 'blur' }]
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
      this.form.name = this.oldRow.name
      this.form.sort = this.oldRow.sort
      this.form.status = this.oldRow.status
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
              res = await addReason(this.form)
            } else { // 修改时候
              res = await updateReason(this.oldRow.id, this.form)
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

