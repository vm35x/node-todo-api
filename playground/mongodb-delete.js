// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    // deleteMany
    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) =>  {
    //   console.log(result)
    // }, err => {
    //   console.log('Unable to delete records')
    // })

    // deleteOne
    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) =>  {
    //   console.log(result)
    // }, err => {
    //   console.log('Unable to delete records')
    // })

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //   console.log(result)
    // }, err => {
    //   console.log('Unable to delete records')
    // })

    // db.collection('Users').deleteMany({name: "Jane Smith"});

    // db.collection('Users').findOneAndDelete({_id: new ObjectID('5c45c96f5676342c30890306')}).then(res => {
    //   console.log(res)
    //   }, err => {
    //     console.log('Unable to delete records')
    // })
    //client.close();
  }
);
