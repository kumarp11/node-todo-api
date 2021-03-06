require('./config/config.js')
var express=require('express')
var bodyParser=require('body-parser')
const _=require('lodash')

var {mongoose}=require('./db/mongoose')
var {ToDoModel}=require('./models/todo')
var {userModel}=require('./models/user')
var {ObjectID}=require('mongodb')
var {authenticate}=require('./middleware/authenticate')

const port=process.env.PORT||3000//before cinfiguring to heroku server

var app=express()
app.use(bodyParser.json())

app.post('/todos',(req,res)=>{
var ToDoModelDoc= new ToDoModel({text:req.body.text})
ToDoModelDoc.save().then((doc)=>{
  res.send(doc)
},(err)=>{
    res.status(400).send(err)
})
})

app.get('/todos',(req,res)=>{
  ToDoModel.find().then((docs)=>{
    res.send({docs})
  },(err)=>{
    res.status(400).send(err)
  })
})

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id
  var validity=  ObjectID.isValid(id)
    if(!validity)
    {
    return  res.status(404).send()
    }

ToDoModel.findById(id).then((todo)=>{
  if(!todo)
  {
return  res.status(404).send()
  }
 return res.send(todo)

},(err)=>{return  res.status(400).send()})

})


app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id
  var validity=  ObjectID.isValid(id)
    if(!validity)
    {
    return  res.status(404).send()
    }

ToDoModel.findByIdAndRemove(id).then((todo)=>{
  if(!todo)
  {
return  res.status(404).send()
  }
 return res.send(todo)

},(err)=>{return  res.status(400).send()})

})

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id

  if(!ObjectID.isValid(id))
  {
    return res.status(404).send()
  }
  var body=_.pick(req.body,['text','completed'])

  if(_.isBoolean(body.completed) && body.completed)
  {
    body.completedat=new Date().getTime()
  }
  else
  {
    body.completed=false
    body.completedat=null
  }
  ToDoModel.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc)=>{
  if(!doc)
  {
      return res.status(404).send()
  }
    return res.send({doc})
  },(err)=>{return  res.status(400).send()})
})

app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password'])
  var userModelDoc=new userModel(body)
  userModelDoc.save().then((user)=>{
      return userModelDoc.generateAuthToken()
  },(err)=>{res.status(400).send()}).then((token)=>{
    res.header('x-auth',token).send(userModelDoc)
  })
})


app.get('/users/me',authenticate,(req,res)=>
{
  res.send(req.userModelDoc)
}
)


app.listen(port,()=>{console.log(`started at port ${port}`)})

module.exports={app:app}
