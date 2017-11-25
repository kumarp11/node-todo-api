var mongoose=require('mongoose')
var userSchema=mongoose.Schema({email:{required:true,minlength:1,type:String,trim:true}})
var userModel=mongoose.model('userModel',userSchema)

module.exports={userModel:userModel}
