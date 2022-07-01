<template>
  <div class="box">
      <h3>注册页面</h3>
      <el-form :model="registerData"  :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
            <el-input  v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
            <el-input v-model="registerData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerData.password" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerData.password2" ></el-input>
        </el-form-item>
        <div class="item-button">
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        </div>
        </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerData.password2) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerData: {
        username: '',
        name: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '账号不得为空', trigger: 'blur' }, { min: 3, max: 32, message: '长度应该在3-32之间', trigger: 'blur' }],
        name: [{ required: true, message: '用户名不得为空', trigger: 'blur' }, { min: 3, max: 32, message: '长度应该在3-32之间', trigger: 'blur' }],
        password: [{ required: true, message: '密码不得为空', trigger: 'blur' }, { min: 3, max: 32, message: '长度应该在3-32之间', trigger: 'blur' }],
        password2: [{ required: true, message: '确认密码不得为空', trigger: 'blur' }, { min: 3, max: 32, message: '长度应该在3-32之间', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (registerForm) {
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$axios.post('/register', this.registerData).then(() => {
            // console.log(res.data)
            this.$message({
              type: 'success',
              message: '用户注册成功'
            })
            this.$router.push('/login')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>

<style scoped>
.box{
    width: 500px;
    height: 400px;
    margin:  100px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
}
h3{
    text-align: center;
}
.el-input{
    width: 92%;
}
.item-button{
    display: flex;

}
.item-button button{
    width: 120px;
    margin: 0 auto;
}
</style>
