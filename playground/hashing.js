const {SHA256}=require('crypto-js')

const jwt=require('jsonwebtoken')

var data={id:10}
var token=jwt.sign(data,'akash')
console.log(`Token ${token}`)
var decoded=jwt.verify(token,'akash')
console.log('Decoded', decoded)

//
// var message='This is a string'
// var hash=SHA256(message).toString()
//
// console.log(`messaage ${message}`)
// console.log(`Hash ${hash}`)
//
// var data={id:4}
//
// var token=
//         {
//           data,
//           hash:SHA256(JSON.stringify(data)+'secret').toString()
//         }
//
// var resulthash=SHA256(JSON.stringify(token.data)+'secret').toString()
//
// token.data.id=5
// token.hash=SHA256(JSON.stringify(token.data)).toString()
//
// if(token.hash===resulthash)
// {
//   console.log('Data was not changed')
// }
// else {
//     console.log('Data was changed')
//   }
