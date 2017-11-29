var express=require('express')
var bodyParser=require('body-parser')

var {mongoose}=require('./db/mongoose')
var {ToDoModel}=require('./models/todo')
var {userModel}=require('./models/user')
var {ObjectID}=require('mongodb')

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


app.listen(3000,()=>{console.log('started at port 3000')})

module.exports={app:app}
