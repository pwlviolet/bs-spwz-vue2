const jwt=require('jsonwebtoken')//导入加密字符
const expressJWT=require('express-jwt')//导入解密字符
//定义secret秘钥
const secret='miyao'
//登录成功后用jwt.sign生成jwt字符串
//参数1:用户的信息对象  密码不要写进去
//参数2：加密的秘钥
//参数3:配置对象，可以配置token有效期
const tokenstr=jwt.sign({username:userinfo.username},secret,{expiresIn:'30s'})
res.send({
    token: tokenstr
})

//解析还原过程
app.use(expressJWT({secret:secret}).unless({path:[/^\/api\//]}))//unless方法配置不需要访问权限的接口
//只要配置成功，expressjwt可以把解析的用户信息挂载到req.user上
