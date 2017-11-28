const {mongoose}=require('./../server/db/mongoose.js')
const {userModel}=require('./../server/models/user.js')

var id='5a18785af7df572270b49dfd'

userModel.findById(id).then((userModel)=>{S
  if(!userModel)
  {
    return console.log('User not find')
  }
  console.log('userModel details ' + userModel)
}).catch((e)=>console.log(e))
