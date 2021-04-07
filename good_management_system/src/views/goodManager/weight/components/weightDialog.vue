<template>
  <el-dialog
    title="添加重量"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="dialogForm" :model="form" label-width="100px" style="width:90%" :rules="rules">
      <el-form-item label="商品ID" prop="product_id" autocomplete="off">
        <el-input v-model="form.product_id" :disabled="oldRow && !!oldRow.product_id" />
      </el-form-item>
      <el-form-item label="重量" prop="weight" autocomplete="off">
        <el-input v-model="form.weight" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addWeight, updateWeight } from '@/api/goodManager/weight'
const defaultForm = () => ({
  product_id: '',
  weight: ''
})
export default {
  name: 'WeightDialog',
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
        callback(new Error('商品ID不能为空'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('重量不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: defaultForm(),
      loading: false,
      dialogVisible: this.visible,
      rules: {
        product_id: [
          { validator: validatePass1, trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }]
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
      if (this.oldRow.product_id !== '' && this.oldRow.weight === '') {
        console.log('修改重量')
        this.form.product_id = this.oldRow.product_id
        this.form.weight = ''
        return
      }
      // 修改
      this.form.product_id = this.oldRow.product_id
      this.form.weight = this.oldRow.weight
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
              console.log('准备添加')
              res = await addWeight(this.form)
              console.log('添加完成')
            } else if (this.oldRow.product_id !== '' && this.oldRow.weight === '') {
              this.$router.push('/goodManager/weight')
              res = await addWeight(this.form)
            } else { // 修改时候
              res = await updateWeight(this.oldRow.product_id, this.form.weight)
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

<style>

</style>
