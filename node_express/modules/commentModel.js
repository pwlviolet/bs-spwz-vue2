const mongoose = require('mongoose')
let commentSchema = new mongoose.Schema({
  video: {type: mongoose.Types.ObjectId, index: true, require},
  author: {type: mongoose.Types.ObjectId, ref: 'User'},
  content: String,
  date: Number,
  reply: [{
    from: {type: mongoose.Types.ObjectId, ref: 'User'},
    to: {type: mongoose.Types.ObjectId, ref: 'User'},
    content: String,
    date: Number
  }]
})
let Comment = mongoose.model('comment', commentSchema)
module.exports = Comment
