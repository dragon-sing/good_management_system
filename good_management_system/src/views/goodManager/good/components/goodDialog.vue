<template>
  <el-dialog
    title="商品配置"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    width="30%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="dialogForm" :model="form" label-width="100px" style="width:90%" :rules="rules">
      <el-form-item label="商品ID" prop="product_id">
        <el-input v-model="form.product_id" :disabled="oldRow" />
      </el-form-item>
      <el-form-item label="商品名称" prop="product_name">
        <el-input v-model="form.product_name" />
      </el-form-item>
      <el-form-item label="品类ID" prop="cat_id">
        <category-select v-model="form.cat_id" width="70%" />
      </el-form-item>

      <el-form-item label="商品图片">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="danger" @click="close">取 消</el-button>
      <el-button size="small" type="primary" :loading="loading" @click="confirm('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGoods, updateGoods } from '@/api/goodManager/good'
import CategorySelect from '@/components/CategorySelect'

const defaultForm = () => ({
  product_id: '',
  product_name: '',
  cat_id: '',
  url: '',
  description: ''

})
export default {
  name: 'GoodDialog',
  components: {
    CategorySelect
  },
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
        callback(new Error('商品名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('商品ID不能为空'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
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
        product_name: [{ validator: validatePass1, trigger: 'blur' }],
        product_id: [{ validator: validatePass2, trigger: 'blur' }],
        cat_id: [{ validator: validatePass3, trigger: 'blur' }]
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
      this.form.product_name = this.oldRow.product_name
      this.form.cat_id = this.oldRow.cat_id
      this.form.url = this.oldRow.url
      this.form.description = this.oldRow.description
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
            // 新增
            if (!this.oldRow) {
              console.log(this.form)
              res = await addGoods(this.form)
            } else { // 修改时候
              res = await updateGoods(this.oldRow.product_id, this.form)
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

