const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')//引入加密模块对密码进行加密
const Schema = mongoose.Schema
const model = mongoose.model
const {DEFAULT_NICK, DEFAULT_SIGN, DEFAULT_HEAD} = require('../util/config')
const userSchema = new Schema({
    username:{type:String ,require:true},
    password:{type:String ,
             require:true,
             set(val){
                 return bcrypt.hashSync(val,10)  //进行加密 10为等级
             }
            },
    // name:{type:String ,require:true},
    isAdmin:{type:String,default:'0'}, //身份 1为管理员  0为普通用户
    isshow:{type:String,default:'1'}, //身份 1为显示  0为删除了不显示
    email: {type: String, unique: true},
    nick: {type: String, default: DEFAULT_NICK, maxlength: 14},
    sex: {type: Number, default: 0},
    headUrl: {type: String, default: DEFAULT_HEAD},
    sign: {type: String, default: DEFAULT_SIGN, maxlength: 40},
})
const user =model('User',userSchema)
module.exports = user