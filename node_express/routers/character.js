//生成路由表
const router =require('express').Router()
// //引入密码加密
const bcrypt= require('bcryptjs')   //引入模块对加密的密码进行解密
const multer = require('multer')
const fs = require('fs')
const jsonRes = require('../util/jsonRes')
const Video = require('../modules/videoModel')
const Comment = require('../modules/commentModel')
// const { setEncode,constrast } = require('../util/encode')
//引入user mongodb模型
const user = require('../modules/user')
const jwt=require('jsonwebtoken')//导入加密字符
const expressJWT=require('express-jwt')//导入解密字符
//定义secret秘钥
const {secret}=require('../config/key')
let fileName, imgName, videoName, avatarName
const videoStorage = multer.diskStorage({
    //指定路径
    destination: function (req, file, cb) {
      cb(null, './res')
    },
    //指定名字
    filename: function (req, file, cb) {
      let before = Date.now() + parseInt(Math.random() * 999 + '')
      let after = file.originalname.split('.').pop()
      fileName = before + '.' + after
      if (after === 'mp4' || after === 'flv') {
        videoName = fileName
      }
      if (after === 'jpg' || after === 'png' || after === 'jpeg') {
        imgName = fileName
      }
      cb(null, fileName)
    }
  })
const avatarStorage = multer.diskStorage({
    //指定路径
    destination: function (req, file, cb) {
      cb(null, './res/avatar')
    },
    //指定名字
    filename: function (req, file, cb) {
      let random = Date.now() + parseInt(Math.random() * 999 + '')
      let last = file.originalname.split('.').pop()
      avatarName = random + '.' + last
      cb(null, avatarName)
    }
  })
//视频
const video = multer({storage: videoStorage})
//头像
const avatar = multer({storage: avatarStorage})
//配置路由表
const sfyz=async(req,res,next)=>{
    //定义中间件具体的业务
    //解析表单数据的中间件
    // console.log(req.headers.authorization)
    //获取token
    //解析还原过程
// app.use(expressJWT({secret:secret}).unless({path:[/^\/api\//]}))//unless方法配置不需要访问权限的接口
//只要配置成功，expressjwt可以把解析的用户信息挂载到req.user上
    // const token= req.headers.authorization.split(' ')[1]
    // const tokenstr=expressJWT({secret:secret})
    // const id=token.split('.')[0]
    // const User=token.split('.')[1]
    // console.log(id,User)

    const tokenstr=req.headers.authorization.split(' ').pop()
    // console.log(jwt.verify(tokenstr,secret))
    const{_id ,username}=jwt.verify(tokenstr,secret)

    const User1 =await user.findById(_id) //从mongodb数据库中查找是否有相同_id的用户，有的话返回true
    if(!User1){ return res.status(422).send('用户错误')}
                                          //如果有相同_id再查username
        if(username !== User1.username)
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
router.post('/upload/avatar', avatar.single('img'), async (req, res) => {
  res.json(jsonRes(0, '成功', '/avatar/' + avatarName))
})
router.post('/homepage', async (req, res) => {
    let {page, type} = req.body
    let videos, count
    console.log(req.body)
    console.log(page)
    // console.log(page)
    // console.log(type)
    if (!type) {
      videos = await Video.find().populate('author', 'nick').limit(8).skip((page - 1) * 8)
      count = await Video.estimatedDocumentCount()
    } else {
      videos = await Video.find({type}).populate('author', 'nick').limit(8).skip((page - 1) * 8)
      count = await Video.countDocuments({type})
    }
    res.json(jsonRes(0, '查询成功', {videos, count}))
})

router.get('/hot', async (req, res) => {
    let data = await Video.find(null, ['title', 'imgUrl']).sort('-uploadAt').limit(4)
    res.json(jsonRes(0, '查询成功', data))
})

//点赞
router.post('/zan', async (req, res) => {
  let {_id, author} = req.body
  console.log(author)
  let video = await Video.findById(_id)
  let index = video.zanList.indexOf(author)
  if (index === -1) {
    video.zanList.push(author)
    res.send('点赞成功')
  } else {
    video.zanList.splice(index, 1)
    res.send('点赞失败')
  }
  console.log(video.zanList)
  await video.save()
})
// router.post('/play', async (req, res) => {
//     let _id = req.query._id
//     let video = await Video.findOne({_id})
//     let playCount = ++video.playCount
//     await Video.updateOne({_id}, {playCount})
//     res.json(jsonRes(0, '成功'))
//   })

//获取视频列表
router.post('/byId', async (req, res) => {
    // let _id1 = req.body._id
    let _id = req.body._id
    // console.log(req.body)
    // let result = await Danmu.findOne({player: _id})
    // let danmuCount = result ? result.danmuList.length : 0
    let count = await Video.estimatedDocumentCount()
    let video = await Video.findById(_id).populate('author', ['nick', 'headUrl', 'sign',])
    // const video = await Video.find({_id: _id1 }&&{isshow:'1'})
    // console.log(video)
    let skip = parseInt(Math.random() * (count - 3) + '')
    let otherVideos = await Video.find().populate('author', 'nick').limit(4).skip(skip)       //**`Query.populate(path, [select], [model], [match], [options])`**1.path指定要查询的表2.select(可选)指定要查询的字段3.model(可选)类型：Model，可选，指定关联字段的 model，如果没有指定就会使用Schema的ref。4.match(可选)类型：Object，可选，指定附加的查询条件。5.options(可选)类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。
    res.json(jsonRes(0, '查询成功', {video: video, otherVideos}))
})
// 个人中心获取视频列表
router.post('/byIdd', async (req, res) => {
  // let _id1 = req.body._id
  let _id = req.body.auther
  // console.log(_id)
  // console.log(req.body)
  // let result = await Danmu.findOne({player: _id})
  // let danmuCount = result ? result.danmuList.length : 0
  let count = await Video.estimatedDocumentCount()
  // let video = await Video.findById(_id).populate('author', ['nick', 'headUrl', 'sign',])
  const video = await Video.find({author: _id })
  // videos = await Video.find({author: _id }).populate('author', 'nick').limit(8).skip((page - 1) * 8)
  // console.log(video)
  let skip = parseInt(Math.random() * (count - 3) + '')
  let otherVideos = await Video.find().populate('author', 'nick').limit(4).skip(skip)
  res.json(jsonRes(0, '查询成功', {video: video, otherVideos}))
})

router.post('/byIddd', async (req, res) => {
  // let _id1 = req.body._id
  let _id = req.body.auther
  let page =req.body.page
  // console.log(_id)
  // console.log(req.body)
  // let result = await Danmu.findOne({player: _id})
  // let danmuCount = result ? result.danmuList.length : 0
  let count = await Video.estimatedDocumentCount()
  // let video = await Video.findById(_id).populate('author', ['nick', 'headUrl', 'sign',])
  let video = await Video.find({author: _id })
  // video = await Video.find({author:_id}).limit(8).skip((page - 1) * 8)
  // console.log(video)
  count = video.length
  console.log(count)
  // let skip = parseInt(Math.random() * (count - 3) + '')
  let vedioo=video.slice(0+8*(req.body.page-1),8+8*(req.body.page-1))
  // let otherVideos = await Video.find().populate('author', 'nick').limit(4).skip(skip)
  res.json(jsonRes(0, '查询成功', {video: vedioo,count}))
  // res.send(vedioo,otherVideos,count)
})

// 个人中心获取审核视频列表
router.post('/byIddsh', async (req, res) => {
  // let _id1 = req.body._id
  let _id = req.body.auther
  // console.log(_id)
  // console.log(req.body)
  // let result = await Danmu.findOne({player: _id})
  // let danmuCount = result ? result.danmuList.length : 0
  let count = await Video.estimatedDocumentCount()
  // let video = await Video.findById(_id).populate('author', ['nick', 'headUrl', 'sign',])
  const video = await Video.find({author: _id }&&{isshow:'2'})
  // console.log(video)
  let skip = parseInt(Math.random() * (count - 3) + '')
  let otherVideos = await Video.find().populate('author', 'nick').limit(4).skip(skip)
  res.json(jsonRes(0, '查询成功', {video: video, otherVideos}))
})

//获取用户列表
router.get('/user',sfyz,async(req,res) => {
    const list = await user.find({isAdmin: '0' }&&{isshow:'1'})
    res.send(list)
})
//管理系统获取视频列表
router.get('/videomanage',async(req,res) => {
  const list = await Video.find({isshow:'1'})
  console.log(list)
  res.send(list)
})
//管理系统获取视频列表2
router.get('/videomanagesh',async(req,res) => {
  const list = await Video.find({isshow:'2'})
  console.log(list)
  res.send(list)
})
//分页操作
router.post('/user/page',sfyz,async(req,res) => {
    const list = await user.find({isAdmin: '0' }&&{isshow:'1'})
    // console.log(req.body.pagenum)
    const arry10=list.slice(0+7*(req.body.pagenum-1),7+7*(req.body.pagenum-1))
    res.send(arry10)
})
router.post('/user/page/video',async(req,res) => {
  const list = await Video.find({isshow:'1'})
  // console.log(req.body.pagenum)
  const arry10=list.slice(0+7*(req.body.pagenum-1),7+7*(req.body.pagenum-1))
  res.send(arry10)
})
router.post('/user/page/videosh',async(req,res) => {
  const list = await Video.find({isshow:'2'})
  // console.log(req.body.pagenum)
  const arry10=list.slice(0+7*(req.body.pagenum-1),7+7*(req.body.pagenum-1))
  res.send(arry10)
})
//重置用户
router.get('/user/reset',sfyz,async(req,res) => {
    const reqdel= await user.updateMany({isAdmin: '0' }&&{isshow:'0'},{isshow:'1'},function(err,raw){
        if(err){ console.log(err)}
        // console.log('The raw response from Mongo was',raw)
        res.send('恢复成功')
        // console.log(1)
    })
})
//更改用户名
router.post('/user/change',sfyz,async(req,res) => {
    // console.log(req.body)
    const User= await user.findOne({ name: req.body.username})
    if(User){ return res.status(409).send('该用户名已存在')}   //判断用户名是否存在
    const reqchange= await user.updateOne({username: req.body.first.username},{name: req.body.username},function(err,raw){
        if(err){ console.log(err)}
        // console.log('The raw response from Mongo was',raw)
        res.send('修改成功')
        // console.log(1)
    })
})
//审核视频
router.post('/user/changesh',async(req,res) => {
  // console.log(req.body)
  const vdid = req.body.first._id
  const video= await Video.findOne({ _id: vdid})
  // if(User){ return res.status(409).send('该用户名已存在')}   //判断用户名是否存在
  const reqchange= await Video.updateOne({_id: vdid},{isshow: 1},function(err,raw){
      if(err){ console.log(err)}
      // console.log('The raw response from Mongo was',raw)
      res.send('通过')
      // console.log(1)
  })
})
//删除用户
router.post('/user/del',async(req,res)=>{
    // console.log(req)
    const reqdel= await user.updateOne({username: req.body.username},{isshow:'0'},function(err,raw){
        if(err){ console.log(err)}
        // console.log('The raw response from Mongo was',raw)
        res.send('删除成功')
    })
})
//删除视频
router.post('/user/delsh',async(req,res)=>{
  // console.log(req)
  const reqdel= await Vedio.updateOne({_id: req.body._id},{isshow:'0'},function(err,raw){
      if(err){ console.log(err)}
      // console.log('The raw response from Mongo was',raw)
      res.send('删除成功')
  })
})
//注册
router.post('/register',async(req,res) => {
    const User= await user.findOne({ username: req.body.username})
    const Email= await user.findOne({ email: req.body.email})
    if(User && Email){ return res.status(409).send('该用户或邮箱已存在')}   //判断注册的用户是否存在
    // const email= await user.findOne({ email: req.body.email})
    // if(email){ return res.status(409).send('该邮箱已存在')}
    // //密码加密
    // req.body.password=setEncode(req.body.password,salt)
    // req.body
    const newUser = await user(req.body).save()
    res.send('注册成功')
})
//邮箱注册
router.post('/register/email',async(req,res) => {
  // const User= await user.findOne({ username: req.body.username})
  const Email= await user.findOne({ email: req.body.email})
  if(Email){ return res.status(409).send('该用户或邮箱已存在')}   //判断注册的用户是否存在
  // const email= await user.findOne({ email: req.body.email})
  // if(email){ return res.status(409).send('该邮箱已存在')}
  // //密码加密
  // req.body.password=setEncode(req.body.password,salt)
  // req.body
  const newUser = await user(req.body).save()
  res.send('注册成功')
})
//登录
router.post('/login',async(req,res) => {
    // console.log(req)
    const User= await user.findOne({ username: req.body.username})
    // const Email= await user.findOne({ email: req.body.email})
    if(!User){ return res.status(422).send('该用户不存在')} //判断登录的用户是否存在
    // if(req.body.password !== User.password){return res.status(422).send('密码错误')} //判断密码是否正确
    // else{ return res.send('token')}
    // //解密
    let ispassword = bcrypt.compareSync(req.body.password,User.password)  //将数据库中的密码进行解密和发送的密码进行配对
    if(!ispassword){return res.status(422).send('密码错误')}
    // res.send(user)
    // const token =User._id+'.'+User.username     //User对象从mongodb  user modoule中获取
    // res.send(token)
    const tokenstr=jwt.sign({username:User.username,  _id:User._id},secret,{expiresIn:'24h'})
    // console.log(tokenstr)
    // console.log(req)
    // req.session.login=true
    res.send({
        token: tokenstr,
        _id: User._id
})
})

//邮箱登录
router.post('/login/email',async(req,res) => {
  // console.log(req)
  // const User= await user.findOne({ username: req.body.username})
  const Email= await user.findOne({ email: req.body.email})
  if(!Email){ return res.status(422).send('该用户不存在')} //判断登录的用户是否存在
  // if(req.body.password !== User.password){return res.status(422).send('密码错误')} //判断密码是否正确
  // else{ return res.send('token')}
  // //解密
  let ispassword = bcrypt.compareSync(req.body.password,Email.password)  //将数据库中的密码进行解密和发送的密码进行配对
  if(!ispassword){return res.status(422).send('密码错误')}
  // res.send(user)
  // const token =User._id+'.'+User.username     //User对象从mongodb  user modoule中获取
  // res.send(token)
  const tokenstr=jwt.sign({username:Email.username,  _id:Email._id},secret,{expiresIn:'24h'})
  // console.log(tokenstr)
  // console.log(req)
  // req.session.login=true
  res.send({
      token: tokenstr,
      _id: Email._id
})
})





// router.post('/login/login1',async(req,res) => {
//     const User= await user.findOne({ email: req.body.email})
//     if(!User){ return res.status(422).send('该用户不存在')} //判断登录的用户是否存在
//     // if(req.body.password !== User.password){return res.status(422).send('密码错误')} //判断密码是否正确
//     // else{ return res.send('token')}
//     // //解密
//     let ispassword = bcrypt.compareSync(req.body.password,User.password)  //将数据库中的密码进行解密和发送的密码进行配对
//     if(!ispassword){return res.status(422).send('密码错误')}
//     // res.send(user)
//     // const token =User._id+'.'+User.username     //User对象从mongodb  user modoule中获取
//     // res.send(token)
//     const tokenstr=jwt.sign({username:User.username,  _id:User._id},secret,{expiresIn:'24h'})
//     console.log('登录成功')
//     console.log(req.session)
//     req.session.login=true
//     // console.log(tokenstr)
//     res.send({
//         token: tokenstr,
//         _id: User._id
// })
// })

//修改用户信息
router.post('/updateuser', async (req, res) => {
  let {_id, sign, nick, sex, headUrl} = req.body
  console.log(headUrl)
  if (!_id) return res.json(jsonRes(-1, '无id'))
  //签名
  if (_id && sign) {
    await user.findByIdAndUpdate(_id, {sign})
    let User = await user.findById(_id, ['nick', 'headUrl', 'sex', 'sign', 'sex', 'fansCount'])
    console.log(User)
    res.json(jsonRes(0, '', User))
  } else {
    res.json(jsonRes(-1, '缺少关键字段'))
  }
  //昵称
  if (_id && nick) {
    if (headUrl) {
      // console.log(headUrl)
      // let avatarName = headUrl.split('/').pop()
      // console.log(avatarName)
      //从临时文件移到avatar
      // const readable = fs.createReadStream('res/temp/' + avatarName);
      // const writable = fs.createWriteStream('res/avatar/' + avatarName);
      // readable.pipe(writable);
      // fs.unlinkSync('res/temp/' + avatarName)
      let User = await user.findById(_id)
      let index = User.headUrl.indexOf('la1.jpg')
      // console.log(index)
      // if (index === -1) {
      //   let oldName = User.headUrl.split('/').pop()
      //   fs.unlinkSync('res/avatar/' + oldName)
      // }
      User.headUrl = headUrl
      User.nick = nick
      User.sex = sex
      console.log(User)
      await User.save()
    } else {
      await user.findByIdAndUpdate(_id, {nick, sex})
    }
  }
})
//删除视频
router.post('/deletevedio', async (req, res) => {
  // console.log(req.body)
  let vdid = req.body.vedioid
  // if (!_id) return res.json(jsonRes(-1, '无id'))
  // const Email= await user.findOne({ email: req.body.email})
  let video = await Video.findOne({ _id: vdid })
  // console.log(video)
  //截取文件名
  // let imgName = video.imgUrl.split('/').pop()
  // let videoName = video.videoUrl.split('/').pop()
  // //删除User里收藏的该视频
  // await user.updateMany({_id: video.collectList}, {$pull: {collectList: _id}})
  //删除弹幕
  // await Danmu.deleteOne({player: _id})
  //删除评论
  // await Comment.deleteMany({video: _id})
  //删除该视频相关消息回复提醒
  // let comments = await Comment.find({video: _id}, '_id')
  // await Message.deleteMany({comment: comments})
  //删除视频
  await Video.deleteOne({_id: vdid})
  // 删除文件
  // fs.unlinkSync(`./res/${imgName}`)
  // fs.unlinkSync(`./res/${videoName}`)
  res.json(jsonRes(0, '删除成功'))
})




//获取用户信息
router.post('/userid', async (req, res) => {
  console.log(req.body)
  let _id = req.body._id
  if (!_id) return res.json(jsonRes(-1, '无id'))
  if (_id) {
    let User = await user.findById(_id, ['nick', 'headUrl', 'sex', 'sign', 'fansCount'])
    // console.log(User)
    res.send(User)
  } else res.json(jsonRes(-1, '缺少关键字段'))
})
// 获取用户头像
router.post('/getava',async(req,res) => {
    let _id = req.body._id
    // console.log(req.body._id)
    if (!_id) return res.send('无id')
    let User = await user.findById(_id, ['nick', 'headUrl', 'attentionList'])
    // console.log(User)
    res.send(User)
    // const User=await user.findOne({ _id: req.body._id})
})
//上传视频
router.post('/upload', video.fields([{name: 'img', maxCount: 1}, {name: 'video', maxCount: 1}]),
async (req, res) => {
  let {author, title, type, desc} = req.body
  const isshow = 2
  if (author && title && type) {
    let data = await Video.insertMany({
      author,
      title,
      type,
      desc,
      isshow,
      uploadAt: Date.now(),
      imgUrl: `/${imgName}`,
      videoUrl: `/${videoName}`,
    })
    res.json(jsonRes(0, '上传成功', data))
  } else {
    res.json(jsonRes(-2, '缺少必要信息,上传失败'))
  }
}
)
// router.get('/user/logout', (req, res) => {
//   req.session.destroy()
//   res.json(jsonRes(0, '退出成功'))
// })
// router.post('/login/reg',async(req,res) => {
//     const User= await user.findOne({ email: req.body.email})
//     if(User){ return res.status(409).send('该邮箱已存在')}   //判断注册的用户是否存在
//     // //密码加密
//     // req.body.password=setEncode(req.body.password,salt)
//     // req.body
//     const newUser = await user(req.body).save()
//     res.send(newUser)
// })
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

// 评论
router.post('/comment/send', async (req, res) => {
  let {video, author, content} = req.body
  await Comment.insertMany({video, author, content, date: Date.now()})
  return res.json(jsonRes(0, '发表成功'))
})
async function findPage (_id, page) {
  let commentCount = await Comment.countDocuments({video: _id})
  let comment = await Comment.find({video: _id}).sort('-date').limit(5).skip((page - 1) * 5)
    .populate('author', ['nick', 'headUrl'])
    .populate('reply.from', ['nick', 'headUrl'])
    .populate('reply.to', ['nick', 'headUrl'])
  return {comment, commentCount}
}

router.post('/comment/page', async (req, res) => {
  // let {_id, page} = req.query
  let id = req.body._id
  // console.log(id)
  let page = req.body.page
  let data = await findPage(id, page)
  // console.log(data)
  return res.json(jsonRes(0, '获取成功', data))
})
//增加播放次数
router.post('/video/play', async (req, res) => {
  // console.log(req.body._id)
  let _id = req.body._id
  let video = await Video.findOne({_id})
  // console.log(video)
  let playCount = video.playCount+1
  // console.log(playCount)
  await Video.updateOne({_id}, {playCount})
  res.json(jsonRes(0, '成功'))
})
//回复
router.post('/comment/reply', async (req, res) => {
  let {_id, from, to, content, video, page, heSay} = req.body
  let comment = await Comment.findById(_id, 'reply')
  let date = Date.now()
  comment.reply.push({from, to, content, date})
  comment.save()
  // await Message.insertMany({comment: _id, you: to, youSay: heSay, user: from, content, date})
  let data = null
  //有则返回分页
  if (video) data = await findPage(video, page)
  console.log(data)
  return res.json(jsonRes(0, '回复成功', data))
})
//搜索
router.post('/search', async (req, res) => {
  console.log(req.body)
  let {keyWord, page, sortBy} = req.body
  let reg = new RegExp(keyWord)
  console.log(reg)
  let count = await Video.countDocuments({title: reg})
  let videos
  if (sortBy) {
    videos = await Video.find({title: reg}).sort('-' + sortBy).limit(8).skip((page - 1) * 8).populate('author', 'nick')
  } else {
    videos = await Video.find({title: reg}).limit(8).skip((page - 1) * 8).populate('author', 'nick')
  }
  console.log(videos)
  console.log(count)
  res.json(jsonRes(0, '搜索成功', {videos, count}))
  // const a = videos[0]
  // res.send(a)
})

module.exports =router