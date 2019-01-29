const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
// const {User} = require('./../models/user')

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("Should create a new todo", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
    //.end(done)
  });

  it("Should not create todo with invalid body data", done => {
    var text = {};

    request(app)
      .post("/todos")
      .send(text)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /todos", () => {
  it("Should get todos from ", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("Should get todo doc ", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("Should return 404 if todo not found", done => {
    var newId = new ObjectID().toHexString();
    //console.log(newId)
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

  it("Should return 404 if object id is invalid", done => {
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("Should delete a todo doc ", done => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId)
          .then(todo => {
            //expect(todo).toBe(null);
            expect(todo).toBeFalsy();
            done();
          })
          .catch(e => done(e));
      });
  });

  it("Should return 404 if todo not found", done => {
    var newId = new ObjectID().toHexString();
    //console.log(newId)
    request(app)
      .delete(`/todos/${newId}`)
      .expect(404)
      .end(done);
  });

  it("Should return 404 if object id is invalid", done => {
    request(app)
      .delete(`/todos/123abc`)
      .expect(404)
      .end(done);
  });
});

describe("PATCH /todos", () => {
  it("Should update a todo", done => {
    // get id of first item
    var hexIdOne = todos[0]._id.toHexString();
    var text = "This should be new text";

    request(app)
    .patch(`/todos/${hexIdOne}`)
    .send({
      completed: true,
      text
    })
    .expect(200)
    .expect(res => {
      expect(res.body.todo.completed).toBeTruthy();
      expect(res.body.todo.text).toBe(text);
      expect(typeof res.body.todo.completedAt).toBe('number');
    })
    .end(done)
    
  });

  it("Should clear completedAt when todo is not completed", done => {
    // get id of second item
    var hexId2 = todos[1]._id.toHexString();

      var text = "Updated text two";  
      var completed = false 

    request(app)
    .patch(`/todos/${hexId2}`)
    .send({
      completed,
      text
    })
    .expect(200)
    .expect(res => {
      expect(res.body.todo.completed).toBeFalsy();
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completedAt).toBe(null);
    })
    .end(done)
});
});
// it("Should update a todo", done => {
//   // get id of first item
//   var hexIdOne = todos[0]._id.toHexString();
//   var body = { 
//     text: "Updated text one",  
//     completed: true 
//   };

//   request(app)
//     .patch(`/todos/${hexIdOne}`)
//     .expect(200)
//     .expect(res => {
//       //console.log('res.body.todo ', res.body.todo)
//       expect(res.body.todo.completed).toBeFalsy();
//     })
//     .end((err, res) => {
//       if (err) {
//         return done(err);
//       }
//       Todo.findOneAndUpdate(hexIdOne, { $set: body }, { new: true })
//         .then(todo => {
//           console.log('todo ', todo)
//           expect(todo.completed).toBeTruthy();
//           done();
//         })
//         .catch(e => done(e));
//     });
// });
