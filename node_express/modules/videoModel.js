const mongoose = require('mongoose')
let videoSchema = new mongoose.Schema(
  {
    //  user _id
    author: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, maxlength: 30},
    type: {type: Number, required: true},
    desc: String,
    uploadAt: {type: Number},
    imgUrl: {type: String, require: true},
    videoUrl: {type: String, require: true},
    playCount: {type: Number, default: 0},
    isshow:{type:String,default:'1'}, //身份 1为显示  0为删除了不显示
    zanList: [{type: mongoose.SchemaTypes.ObjectId}]
  }
)
let Video = mongoose.model('video', videoSchema)
module.exports = Video
