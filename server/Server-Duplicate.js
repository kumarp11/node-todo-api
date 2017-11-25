var mongoose=require('mongoose')
mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/ToDoApp')

//Creating schems which is equivalent to collection in mongodb.

var ToDos=mongoose.Schema({
  text:{type:String,required:true,minlength:1,trim:true},
  completed:{type:Boolean,default:false},
  completedat:{type:Number,default:null}
})

//attchinh schema to model

var ToDoModel=mongoose.model('ToDoModel',ToDos)

//putting data in a model
var ToDoDoc=new ToDoModel({text:'something to do'})
var ToDoDocOther=new ToDoModel({text:'Behave yourself',completed:true,completedat:123})

//saving data to database

ToDoDoc.save().then((doc)=>{
  console.log('Document inserted',JSON.stringify(doc,undefined,2))
},(err)=>{
  console.log('Document can not be inserted',err)
})

ToDoDocOther.save().then((doc)=>{
  console.log('Document inserted',JSON.stringify(doc,undefined,2))
},(err)=>{
  console.log('Document can not be inserted',err)
})

var userSchema=mongoose.Schema({email:{required:true,minlength:1,type:String,trim:true}})
var userModel=mongoose.model('userModel',userSchema)

//var userModelDoc=new userModel({email:'kumarp11@123.com
var userModelDoc=new userModel({email:'sanjay@yahoo.com'})
userModelDoc.save().then((doc)=>{console.log('User inserted',JSON.stringify(doc,undefined,2))},
(err)=>{
console.log('Could not create user')
})
