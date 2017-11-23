//const MongodbClient=require('mongodb').MongoClient
const {MongoClient,ObjectID}=require('mongodb') // This is a objecy destructor. You can use this syntax to create
//new object ID on fly using-- _id=new ObjectID()
MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
  if(err)
  {
    return console.log('There is a problem connecting to Database')
  }
  console.log('Successfully connected to database')

//finding and updating one records
db.collection('ToDos').findOneAndUpdate({_id:new ObjectID('5a15e54e0ffd07371cc9f5c4')},
{$set:{completed:true}},{returnOriginal:false}).then((result)=>{
  console.log('Records updates',result)
})

//   db.close()
})
