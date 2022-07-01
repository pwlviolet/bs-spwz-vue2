//导入node.js内置的querystring模块
const qs=require('querystring')

const mybodyparser=((req,res,next)=>{
    //定义中间件具体的业务
    //解析表单数据的中间件
    let str=''
    req.on('data',(chunk)=>{
        str +=chunk
        //监听req的data事件，拼接数据字符串
    })
    req.on('end',()=>{ 
        //str中存放的是完整的请求体数据
        //把字符串解析成对象的格式
        const body=qs.parse(str)
        req.body=body
        console.log(body)
        next()
    })
    
    })

    module.exports=mybodyparser