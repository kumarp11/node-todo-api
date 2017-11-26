var express=require('express')
var bodyParser=require('body-parser')

var {mongoose}=require('./db/mongoose')
var {ToDoModel}=require('./models/todo')
var {userModel}=require('./models/user')

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


app.listen(3000,()=>{console.log('started at port 3000')})

module.exports={app:app}