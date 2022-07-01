<template>
  <div class="box">
      <h3>登录页面</h3>
      <el-form :model="loginData"  :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
            <el-input  v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginData.password" ></el-input>
        </el-form-item>
        <div class="item-button">
            <el-button type="primary" @click="submitForm('loginForm')" >登录</el-button>
        </div>
        <div class="regist_box">
        <p class="regist"  @click="jump()">没有账号?点击注册</p>
        </div>
        </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return{
            loginData:{
                username:'',
                password:'',
            },
            rules:{
                username:[{required:true,message:'账号不得为空',trigger:'blur'},{min:3,max:32,message:'长度应该在3-32之间',trigger:'blur'}],
                password:[{required:true,message:'密码不得为空',trigger:'blur'},{min:3,max:32,message:'长度应该在3-32之间',trigger:'blur'}],
            }
        }
    },
    methods:{
         submitForm(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios.post('/login',this.loginData).then(res=>{
                console.log(res.data)
                this.$message({
                    type:'success',
                    message:'用户登录成功'
                })
                localStorage.setItem('elementToken','Bearer '+res.data.token)//把token存在localStorage
                this.$router.push('/home')
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      jump(){
          this.$router.push('/register');
      }
    }

}
</script>

<style scoped>
.box{
    width: 500px;
    height: 300px;
    margin:  160px auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
    background-color: rgba(255,255,255,80%);
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
.regist{
    text-align: right;
    color: blue;
    font-size: 15px;
}
.regist :hover{
    background: red;
}
</style>