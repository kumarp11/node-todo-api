const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const _=require('lodash')
const bcrypt=require('bcryptjs')

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


userSchema.statics.findByToken=function(token)
{
  var userModel=this;
  var decoded;
  try {
    decoded=jwt.verify(token,'123abc')
  } catch (e) {
    return new Promise((resolve,reject)=>{
      reject()
    })
  }
return userModel.findOne({
  '_id':decoded._id,
  'tokens.token':token,
  'tokens.access':'auth'
})

}

userSchema.pre('save',function(next){
  var userModelDoc=this;
if(userModelDoc.isModified('password'))
{

  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(userModelDoc.password,salt,(err,hash)=>{
  userModelDoc.password=hash
  next()
    })
  })

  }
else {
  next()
}

})

var userModel=mongoose.model('userModel',userSchema)

module.exports={userModel:userModel}
