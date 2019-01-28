const { ObjectID } = require("mongodb");
const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

// var id = "5c4b7ed5c3d50c5618a0156e";

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid')
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos", todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("Todo", todo);
// });

// Todo.findById({
//   _id: id
// })
//   .then(todo => {
//     if (!todo) {
//       return console.log("ID not found");
//     }
//     console.log("Todo by id", todo);
//   })
//   .catch(e => console.log(e));

var id = "5c4b22e992ec2a439cc4549f";

User.findById({
  _id: id
})
  .then(user => {
    if (!user) {
      return console.log("User not found");
    }
    console.log("User by id", JSON.stringify(user, undefined, 2));
  })
  .catch(e => console.log(e));
