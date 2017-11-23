//const MongodbClient=require('mongodb').MongoClient
const {MongoClient,ObjectID}=require('mongodb') // This is a objecy destructor. You can use this syntax to create
//new object ID on fly using-- _id=new ObjectID()
MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
  if(err)
  {
    return console.log('There is a problem connecting to Database')
  }
  console.log('Successfully connected to database')

//Deleting many records whiuvh matches teh condition
// db.collection('ToDos').deleteMany({text:'I love you'}).then((result)=>{
//   console.log('Records Deleted',result)
// })

//delete the first record that matches the condition
// db.collection('ToDos').deleteOne({completed:true}).then((result)=>{
//   console.log('Records deleted', result)
// })

//Find the records, retunns the deleted record and delete it
db.collection('ToDos').findOneAndDelete({text:'I love you'}).then((result)=>{
  console.log('records deleted',result)
})


//   db.close()
})
