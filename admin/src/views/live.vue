<template>
  <div class="box">
      <el-table class="el_main"    :data="list"  style="width: 100% height:100%"  :default-sort = "{prop: 'index', order: 'ascending'}" >
      <el-table-column type="index" prop='index' label="序号"  width="100"></el-table-column>
      <el-table-column prop="author" label="作者id"  width="300"></el-table-column>
      <el-table-column prop="_id" label="视频id"  width="300"></el-table-column>
      <el-table-column prop="title" label="标题"  width="100"></el-table-column>
      <el-table-column prop="type" label="类型"  width="100"></el-table-column>
      <el-table-column prop='desc' label="描述"  width="100"></el-table-column>
      <!-- <el-table-column prop='videoUrl' label="视频地址"  width="100">{{dataurl}}</el-table-column>
      <el-table-column label="服务器端口"  width="100"></el-table-column> -->
      <el-table-column prop="isshow" label="show" width="100"></el-table-column> 
          <el-table-column label="操作">
      <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handlejump(scope.$index, scope.row)">查看视频</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row)">通过</el-button>
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
import bottompagiation from '../components/bottompagiationvediosh.vue'
export default {
  data() {
    return{
      list: [],
      maxlength:{type:Number}, //父子组件通信
      dataurl: []
    }
  },
  beforeMount(){
    this.$axios.get('/videomanagesh').then(res=>{
      // console.log(res)
      console.log(res.data)
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
        //   this.$prompt('修改标题', '修改标题', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //   // inputErrorMessage: '邮箱格式不正确'
        //   // inputPattern:/^[\u4E00-\u9FA5A-Za-z0-9_].{3,32}+$/,
        //   inputPattern:/^.{3,20}$/,
        //   inputErrorMessage:'标题格式不正确'
        // }).then(({ value }) => {
          let aobject1={
            
          }
          aobject1.first=row
          this.$axios.post('/user/changesh',aobject1).then((res)=>{
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
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });       
        // });

      },
      handleDelete(index, row) {
        this.$axios.post('/user/delsh',row).then((res)=>{
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
            handlejump(index, row) {
              console.log(index)
              const a='http://'+"localhost:8080"+row.videoUrl
              console.log(a)
              // window.location.href=a
              window.open(a,"","top=300,left=300,width=300,height=200")
              
            // console.log(row)
            // row.map((item) => {
            //   console.log(item.type)
            // }) 

      },
      childvalue(res)
      {
        this.list=res
        // console.log(res.data)
        // this.dataurl = res.data
        // console(this.list)
        // res.data.forEach(item => {
        //   console(item)
        // })
        // const a = {
        //   videoid: res.
        // }
        // this.$axios.post('/user/manage/imga')
        // console.log(this.list)
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