<template>
  <el-dialog
    title="库存配置"
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
      <el-form-item label="库存码" prop="sku_code" autocomplete="off">
        <el-input v-model="form.sku_code" :disabled="oldRow && !!oldRow.product_id" />
      </el-form-item>
      <el-form-item label="库存量" prop="stock" autocomplete="off">
        <el-input v-model="form.stock" />
      </el-form-item>
      <el-form-item label="最低库存量" prop="low_stock" autocomplete="off">
        <el-input v-model="form.low_stock" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addSku, updateSku } from '@/api/goodManager/sku'
const defaultForm = () => ({
  product_id: '',
  sku_code: '',
  stock: '',
  low_stock: ''
})
export default {
  name: 'SkuDialog',
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
        callback(new Error('库存量不能为空'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('最低库存量不能为空'))
      } else {
        callback()
      }
    }
    return {
      form: defaultForm(),
      loading: false,
      dialogVisible: this.visible,
      rules: {
        stock: [{ validator: validatePass1, trigger: 'blur' }],
        low_stock: [{ validator: validatePass2, trigger: 'blur' }]
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
      this.form.product_id = this.oldRow.product_id
      this.form.sku_code = this.oldRow.sku_code
      this.form.stock = this.oldRow.stock
      this.form.low_stock = this.oldRow.low_stock
    },
    close() {
      // 向index父组件中传值
      this.$emit('update', this.visible)
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
              res = await addSku(this.form)
            } else { // 修改时候
              console.log(this.form)
              res = await updateSku(this.oldRow.product_id, this.form)
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
