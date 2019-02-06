const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash)
//   })
// })

var hashedPassword = '$2a$10$Xe8hKkIfXD.56Ph4A.m5gOdbFKz.vwPLzWJYzRBxno4r3pqDgLLcm';

bcrypt.compare(password, hashedPassword, (err, res ) => {
  console.log(res);
})

// var data = {
//   id: 10
// }

// var token = jwt.sign(data, 'abc123');
// console.log(token)

// var decoded = jwt.verify(token, 'abc123')
// console.log('decoded', decoded)

// var message = 'I am user number 3'
// var hash = SHA256(message).toString();
// console.log(message) 
// console.log(hash) 

// var data = {
//   id: 4
// }

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'abc123').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'abc123').toString()

// if(resultHash === token.hash){
//   console.log('Data was not changed')
// }else{
//   console.log('Data was changed')
// }
