const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.send(e);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
  //res.send(req.params)
});

app.delete("/todos/:id", (req, res) => {
  //get id
  var id = req.params.id;

  // validate id -> if not valid return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
  // remove todo by id
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.patch("/todos/:id", (req, res) => {
  //get id
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  // validate id -> if not valid return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  //Started up at port 3000
// (node:19040) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
  Todo.findOneAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if(!todo){
        return res.status(404).send()
      }
      res.status(200).send({todo})
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
