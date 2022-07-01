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
module.exports=sfyz