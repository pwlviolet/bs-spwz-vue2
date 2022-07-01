<template>
  <div>
    <el-form :model="user" :rules="rules" status-icon ref="userForm">
      <el-form-item prop="email">
        <el-input v-model="user.email" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-col :span="14">
          <el-input v-model.number="user.code" placeholder="输入验证码"></el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button type="primary" @click="getCode">{{ btnText }}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="user.checkPass" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:28rem" @click="submit">提交</el-button>
      </el-form-item>
      <router-link replace to="/login/loginForm" style="color: #00A1D6;display: block;text-align: right">
        返回登录
      </router-link>
    </el-form>
  </div>
</template>
<script>
import { sendEmail, updatePass } from '../../../api/user'
export default {
  name: 'reSet',
  data () {
    const validateCheck = (rule, value, callback) => {
      if (this.user.password !== value) {
        callback(new Error('两次密码输入不一样！'))
      } else {
        callback()
      }
    }
    return {
      user: {
        email: '',
        code: '',
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { type: 'number', message: '请输入正确的6位验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '再次输入密码', trigger: 'blur' },
          { min: 6, max: 14, message: '长度在 6 到 14 个字符', trigger: 'blur' },
          { validator: validateCheck, trigger: 'blur' }
        ]
      },
      btnText: '点击获取',
      isDisabled: false
    }
  },
  methods: {
    async submit () {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const result = await updatePass({
            code: this.user.code,
            email: this.user.email,
            password: this.user.password
          })
          if (!result.err) {
            this.$message.success(result.msg)
            await this.$router.replace('/login')
          } else this.$message.error(result.msg)
        } else {
          this.$message.error('请修改错误项')
          return false
        }
      })
    },
    async getCode () {
      const result = await sendEmail(this.user.email)
      if (!result.err) {
        this.$message.success(result.msg)
      } else this.$message.error(result.msg)
      let count = 0
      this.isDisabled = true
      const tag = setInterval(() => {
        if (++count >= 60) {
          clearInterval(tag)
          this.isDisabled = false
          return (this.btnText = '点击获取')
        }
        this.btnText = `${60 - count}秒后获取`
      }, 1000)
    }
  }
}
</script>
<style scoped>
.el-form {
  width: 28rem;
}
</style>
