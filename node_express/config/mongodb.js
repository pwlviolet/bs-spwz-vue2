const  Mongoose  = require('mongoose');
const mongourl = 'mongodb://localhost:27017/login'
//引入mongoose
module.exports = mongodb => {
Mongoose.connect(mongourl,{useNewUrlParser:true, useUnifiedTopology:true},() =>{
    console.log('mongodb connect')
})
}