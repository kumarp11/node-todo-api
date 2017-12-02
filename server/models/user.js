const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const _=require('lodash')

var userSchema=mongoose.Schema({
  email:
  {required:true,
    minlength:1,
    type:String,
    trim:true,
    unique:true,
    validate:{validator:(value)=>{return validator.isEmail(value)},
    message:'{value} is not a valid email'}
  },

  password:
  {required:true,
  minlength:6,
type:String},

tokens:[{access:{
  type:String,
  required:true
},token:{
  type:String,
  required:true
}}]
})

userSchema.methods.toJSON=function()
{
    var userModelDoc=this;
    var userObject=userModelDoc.toObject();
    return _.pick(userObject,['_id','email'])
}

userSchema.methods.generateAuthToken=function()
{
  var userModelDoc=this;
  var access='auth';
  var token=jwt.sign({_id:userModelDoc._id.toHexString(),access},'123abc').toString();

  userModelDoc.tokens.push({access,token})
return userModelDoc.save().then(()=>{return token;})
}

var userModel=mongoose.model('userModel',userSchema)

module.exports={userModel:userModel}
