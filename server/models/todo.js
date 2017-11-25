var mongoose=require('mongoose')

var ToDos=mongoose.Schema({
  text:{type:String,required:true,minlength:1,trim:true},
  completed:{type:Boolean,default:false},
  completedat:{type:Number,default:null}
})

//attchinh schema to model

var ToDoModel=mongoose.model('ToDoModel',ToDos)

module.exports={ToDoModel:ToDoModel}
