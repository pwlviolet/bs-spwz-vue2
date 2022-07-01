const express = require('express');
//body-parser用来解析数据类型
const bodyparser = require('body-parser')
const cors = require('cors');  //引入cors模块处理跨域
const mongo = require('./config/mongodb')
//导入路由表
const loginrouter = require('./routers/character')

//创建服务
const app = express();
mongo(app)
//静态文件路径
// app.use( express.static(__dirname+ '/res'));
app.use(express.static('res'))
// app.get('/la1.jpg',(req, res) => {
//     res.sendFile(__dirname + '/res/la1.jpg')
//  })
app.use(cors())
//引擎挂载 art-template
// app.engine('html',require('express-art-template'))
//用来机械json和ur-lencoded格式的请求
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use('/user', loginrouter)



// //全局处理jwt失败后产生的错误
// app.use((err,req,res,next)=>{
//     if(err.name==='UnauthorizedError')
//     {
//         return res.send({
//             status:401,
//             message:'无效的token'
//         })
//     }
//     res.send({
//         status:500,
//         message:'未知的错误',
//     })
// })


//监听端口
app.get('/',(req,res)=>{
    res.send('启动成功')
})
app.listen(8080,() => console.log('express serve running at port 8080!'))