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

    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID("5c472a37291a74025109f77b")
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(
    //     res => {
    //       console.log(res);
    //     }
    //   );
    
    db.collection("Users")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5c41ec4890ab650e90ba4ecc")
        },
        {
          $set: { name: "Jen" },
          $inc: { age: +1 }
        },
        {
          returnOriginal: false
        }
      )
      .then(res => {
        console.log(res);
      });

    //client.close();
  }
);
