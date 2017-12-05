const {ObjectID}=require('mongodb')
const {ToDoModel}=require('./../../models/todo')
const {userModel}=require('./../../models/user')
const jwt=require('jsonwebtoken')

const todos=[{_id:new ObjectID(),text:'This is first example',completed:false,completedat:333},{_id:new ObjectID(),text:'This is second example',completed:false,completedat:333}]

var userOneID=new ObjectID()
var userSecondID=new ObjectID()
const userModelDoc=[
  {_id:userOneID,
  email:'prashant@example.com',
password:'userone',
tokens:[{access:'auth',
  token:jwt.sign({_id:userOneID.toHexString(),access:'auth'},'123abc').toString()}
]
},
{_id:userSecondID,
email:'akash@example.com',
password:'usersecond'
}

]

const populatetodos=(done)=>{
  ToDoModel.remove({}).then(()=>{
    ToDoModel.insertMany(todos).then(()=>{done()})
    })
}

const populateusers=(done)=>{
  userModel.remove({}).then(()=>{
    var userone=new userModel(userModelDoc[0]).save()
    var usertwo=new userModel(userModelDoc[1]).save()
    return Promise.all([userone,usertwo])
  }).then(()=>done())
}


module.exports={todos,populatetodos,userModelDoc,populateusers}
