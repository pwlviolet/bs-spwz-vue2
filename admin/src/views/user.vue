<template>
  <div class="box">
      <el-table class="el_main"    :data="list"  style="width: 100% height:100%"  :default-sort = "{prop: 'index', order: 'ascending'}" >
      <el-table-column type="index" prop='index' label="序号"  width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" sortable width="200"></el-table-column>
      <el-table-column prop="sign" label="个性标签" sortable width="200"></el-table-column>
      <el-table-column prop="nick" label="用户名" sortable width="200"></el-table-column>
      <!-- <el-table-column prop="name" label="头像" ></el-table-column>  -->
          <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">编辑</el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      <bottompagiation class="bottom" :maxlength="maxlength" @childvalue='childvalue'></bottompagiation>
  </div>
</template>

<script>
import bottompagiation from '../components/bottompagiation.vue'
export default {
  data() {
    return{
      list: [],
      maxlength:{type:Number} //父子组件通信
    }
  },
  beforeMount(){
    this.$axios.get('/user').then(res=>{
      // console.log(res)
      // console.log(res.data)
      // this.list =res.data
      //  console.log(this.list)
      this.maxlength=res.data.length
      // console.log(this.maxlength)
    })
    
    // this.$store.dispatch('asygetmaxlength')
    // console.log(1)
    
  },
  updated(){
    //     this.$axios.get('/user').then(res=>{
    //   // console.log(res)
    //   // console.log(res.data)
    //   this.list =res.data
    //   // console.log(this.list)
    // })
    // this.$router.go(0);
  },
  components:{ bottompagiation},
  methods: {
        handleEdit(index,row) {
          this.$prompt('请输入用户名', '修改用户名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
          // inputPattern:/^[\u4E00-\u9FA5A-Za-z0-9_].{3,32}+$/,
          inputPattern:/^.{3,20}$/,
          inputErrorMessage:'用户名格式不正确'
        }).then(({ value }) => {
          let aobject1={
            
          }
          aobject1.first=row
          aobject1.username=value
          this.$axios.post('/user/change',aobject1).then((res)=>{
            console.log(res)
            this.$message({
            type: 'success',
            message: res.data
          });
          setTimeout(()=>{
            this.$router.go(0);
              },500)
          }).catch(()=>{
            setTimeout(()=>{
              this.$router.go(0);
            },500)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });

      },
      handleDelete(index, row) {
        this.$axios.post('/user/del',row).then((res)=>{
          // console.log(res)
                this.$message({
                    type:'success',
                    message:res.data
                })
                setTimeout(()=>{
                  this.$router.go(0);
                },500)
                
        })

      },
      childvalue(res)
      {
        this.list=res
      }
  }

}
</script>

<style scoped>
/* .el_main{
  padding: 0px;
}
.box{
  padding: 0px;
} */

</style>