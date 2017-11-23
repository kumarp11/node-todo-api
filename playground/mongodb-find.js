//const MongodbClient=require('mongodb').MongoClient
const {MongoClient,ObjectID}=require('mongodb') // This is a objecy destructor. You can use this syntax to create
//new object ID on fly using-- _id=new ObjectID()
MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
  if(err)
  {
    return console.log('There is a problem connecting to Database')
  }
  console.log('Successfully connected to database')

// db.collection('ToDos').find({
//   _id:new ObjectID('5a15e54e0ffd07371cc9f5c4')
// }).toArray().then((docs)=>{
//   console.log('ToDos')
//   console.log(JSON.stringify(docs,undefined,2)),(err)=>{
//     console.log('unable to fetch records',err)
//   }
// })

//db.collection('ToDos').find().count().then((count)=>{console.log('ToDos count ' + count)})

db.collection('Users').find({name:'Prashant Kumar'}).toArray().then((docs)=>{
  console.log(JSON.stringify(docs,undefined,2)),(err)=>{console.log('No record found',err)}
})

//   db.close()
})
