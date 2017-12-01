var mongoose=require('mongoose')
mongoose.Promise=global.Promise
var options={useMongoClient: true}
mongoose.connect(process.env.MONGODB_URI,options)

module.exports={mongoose:mongoose}
