const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

Todo.remove({}).then(result => {
  console.log(result);
});

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

// (node:5076) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
// (node:5076) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.

// Todo.findOneAndRemove({_id: '5c5075c10c59aa141a06b025'}).then((todo) => {
//   console.log(todo)
// })

Todo.findByIdAndRemove('5c5075c10c59aa141a06b025').then((todo) => {
  console.log(todo)
})