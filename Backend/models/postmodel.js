let mongoose = require('mongoose')
let postschema = new mongoose.Schema({
    Name:String,
    Description:String,
    Type:String,
    Start_Date:String,
    End_Date:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'registerDetails'}


})

let userpost = mongoose.model('Post', postschema)
module.exports = userpost