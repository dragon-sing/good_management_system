<template>
  <el-dialog
    title="价格配置"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="dialogForm" :model="form" label-width="100px" style="width:90%" :rules="rules">
      <el-form-item label="商品ID" prop="product_id">
        <el-input v-model="form.product_id" :disabled="true" />
      </el-form-item>
      <el-form-item label="商品名称" prop="product_name">
        <el-input v-model="form.product_name" :disabled="true" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="form.price" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { updatePrice } from '@/api/goodManager/price'

const defaultForm = () => ({
  product_id: '',
  product_name: '',
  price: ''
})

export default {
  name: 'PriceDialog',
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
        callback(new Error('品类ID不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: this.visible,
      loading: false,
      form: defaultForm(),
      isAdd: false,
      rules: {
        price: [{ validator: validatePass1, trigger: 'blur' }]
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
      // 设置价格
      this.form.product_id = this.oldRow.product_id
      this.form.product_name = this.oldRow.product_name
      this.form.price = ''
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
            res = await updatePrice(this.oldRow.product_id, this.form)
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

