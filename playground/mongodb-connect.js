const MongodbClient=require('mongodb')

var users={name:'Prashant',age:25}
var {name}=users
console.log(name)

// MongodbClient.connect('mongodb://localhost:27017/ToDoApp',(err,db)=>{
//   if(err)
//   {
//     return console.log('There is a problem connecting to Database')
//   }
//   console.log('Successfully connected to database')
//   // db.collection('ToDos').insert({
//   //   text:'Something to do',
//   //   completed:false
//   // },(err,result)=>{
//   //   if(err){return console.log('document not inserted in database'),err}
//   //   console.log('Document inserted'+JSON.stringify(result.ops,undefined,2))
//   // })
//
//   db.collection('Users').insert({
//     name:'Vineet Kumar',
//     age:45,
//     location:'Mathura'
//   },(err,result)=>{
//     if(err){return console.log('document not inserted in database'),err}
//     console.log('Document inserted'+JSON.stringify(result.ops,undefined,2))
//     console.log('Document inserted at ',result.ops[0]._id.getTimestamp())
//   })
//   db.close()
//})
