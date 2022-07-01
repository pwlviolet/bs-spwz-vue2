<template>
  <div>
    <el-form :model="userReg" ref="userReg" status-icon :rules="rules">
      <el-form-item prop="email">
        <el-input v-model="userReg.email" placeholder="请输入真实邮箱,用于密码找回"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="userReg.password" autocomplete="off" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="userReg.checkPass" autocomplete="off" placeholder="重复密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:28rem" type="primary" @click="register('userReg')">注册</el-button>
      </el-form-item>
    </el-form>
    <router-link to="/login" replace class="link"><p>已有账号直接登录</p></router-link>
  </div>
</template>
<script>
// import { reg } from '../../../api/user'
export default {
  data () {
    const validateCheck = (rule, value, callback) => {
      if (this.userReg.password !== value) {
        callback(new Error('两次密码输入不一样！'))
      } else {
        callback()
      }
    }
    return {
      userReg: {
        email: '',
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
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
      }
    }
  },
  methods: {
    register (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$axios.post('/user/register/email', this.userReg).then((res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '用户注册成功'
            })
            this.$router.push('/login')
          })
          // const result = await reg(this.userReg)
        } else {
          this.$message.error('请修改错误项')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.link {
  text-align: right;
  color: #00a1d6;
}
</style>
