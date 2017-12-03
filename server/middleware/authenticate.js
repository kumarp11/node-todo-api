var {userModel}=require('./../models/user')
var authenticate=(req,res,next)=>{
  var token=req.header('x-auth')
  userModel.findByToken(token).then((userModelDoc)=>{

    if(!userModelDoc)
    {
      return Promise.reject()
    }
    req.userModelDoc=userModelDoc;
    req.token=token;
    next();
  }).catch((e)=>{res.status(401).send()})
}

module.exports={authenticate}
