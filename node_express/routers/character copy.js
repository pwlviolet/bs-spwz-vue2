//生成路由表
const router =require('express').Router()
// //引入密码加密
// const { setEncode,constrast } = require('../util/encode')
//引入user mongodb模型
const user = require('../modules/user')
// //加密加盐
// const salt ='ranransuki'
//配置路由表
const sfyz=async(req,res,next)=>{
    //定义中间件具体的业务
    //解析表单数据的中间件
    console.log(req.headers.authorization)
    //获取token
    const token= req.headers.authorization.split(' ')[1]
    const id=token.split('.')[0]
    const User=token.split('.')[1]
    console.log(id,User)
    const User1 =await user.findById(id) //从mongodb数据库中查找是否有相同_id的用户，有的话返回true
    if(!User1){ return res.status(422).send('用户错误')}
                                          //如果有相同_id再查username
        if(User !== User1.username)
        {
            res.status(422).send('用户名错误')
        }
        else {
            //用户存在,查看权限
            if (User1.isAdmin==='0')
            {res.status(409).send('没有权限')} //说明身份是用户
            else
             (User1.isAdmin==='1')
            {
                // res.send('Admin')
                next()
            }}
}







//获取用户列表
router.get('/',sfyz,async(req,res) => {
    const list = await user.find()
    res.send(list)
})
//注册
router.post('/register',async(req,res) => {
    const User= await user.findOne({ username: req.body.username})
    if(User){ return res.status(409).send('该用户已存在')}   //判断注册的用户是否存在
    // //密码加密
    // req.body.password=setEncode(req.body.password,salt)
    // req.body
    const newUser = await user(req.body).save()
    res.send(newUser)
})
//登录
router.post('/login',async(req,res) => {
    const User= await user.findOne({ username: req.body.username})
    if(!User){ return res.status(422).send('该用户不存在')} //判断登录的用户是否存在
    if(req.body.password !== User.password){return res.status(422).send('密码错误')} //判断密码是否正确
    // else{ return res.send('token')}
    // //解密
    // let ispassword = constrast(req.body.password,user.password,salt)
    // if(!ispassword){return res.status(422).send('密码错误')}
    // res.send(user)
    const token =User._id+'.'+User.username    //User对象从mongodb  user modoule中获取
    res.send(token)
})

//验证
// router.get('/verify',async(req,res)=>{
//     console.log(req.headers.authorization)
//     //获取token
//     const token= req.headers.authorization.split(' ')[1]
//     const id=token.split('.')[0]
//     const User=token.split('.')[1]
//     console.log(id,User)
//     const User1 =await user.findById(id) //从mongodb数据库中查找是否有相同_id的用户，有的话返回true
//     if(!User1){ return res.status(422).send('用户错误')}
//                                           //如果有相同_id再查username
//         if(User !== User1.username)
//         {
//             res.status(422).send('用户名错误')
//         }
//         else {
//             //用户存在,查看权限
//             if (User1.isAdmin==='0')
//             {res.status(409).send('没有权限')} //说明身份是用户
//             else
//              (User1.isAdmin==='1')
//             {
//                 res.send('Admin')
//             }}

// })将其封装为sfyz中间件
//导出路由表
module.exports =router