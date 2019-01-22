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

    // db.collection("Todos").insertOne(
    //   {
    //     text: "Something to do",
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert todo");
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );

    // Insert new doc into Users {name, age, location}

    // db.collection("Users").insertOne(
    //   {
    //     name: "Jane Smith",
    //     age: 48,
    //     location: "Tampa"
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //   }
    // );

    client.close();
  }
);

// db.mongoConnect = () => {
//   mongoose.Promise = global.Promise
//   mongoose.connect(config.mongo.mongodb_url, {useNewUrlParser: true})
//   .then(() => {
//   console.log('mongoDB is connected...')
//   })
//   .catch((err) => {
//   throw err
//   })
//   }
