<template>
  <div class="setting-container">
    <el-form ref="passwordForm" :model="passwordForm" status-icon :rules="rules" label-width="100px" class="password-form">
      <el-form-item label="旧密码" prop="old_password">
        <el-input v-model="passwordForm.old_password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="passwordForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="password_confirmation">
        <el-input v-model="passwordForm.password_confirmation" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" :loading="loading" @click="submitForm('passwordForm')">提交</el-button>
        <el-button size="small" @click="resetForm('passwordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Setting',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6) {
          callback(new Error('密码最少6位!'))
        }
        if (this.passwordForm.old_password === value) {
          callback(new Error('不能和旧密码一致!'))
        }
        if (this.passwordForm.password_confirmation !== '') {
          this.$refs.passwordForm.validateField('password_confirmation')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        old_password: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirmation: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    ...mapActions('user', [
      'updatePassword'
    ]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.updatePassword(this.passwordForm).then(response => {
            if (response.code === 200) {
              this.loading = false
              this.$message({
                message: `更新密码成功！请重新登录!`,
                type: 'success'
              })
              this.$store.dispatch('user/logout').then(() => {
                this.$router.push('/login')
              })
            } else {
              this.$message({
                message: `更新密码失败!`,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.password-form {
  margin-top: 20px;
  .el-input {
    width: 200px;
  }
}
</style>
