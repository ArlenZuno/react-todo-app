const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.argv[2] || 5050;
const Todo = require('./models/Todo')

mongoose.connect("mongodb://localhost:27017/todoapp");
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    done: false
  })
    .save()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

app.get("/", (req, res) => {
  Todo.find({})
    .then(todoObj => {
      res.json(todoObj);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

app.get("/:todoId", (req, res) => {
  Todo.findOne({ _id: req.params.todoId })
    .then(todo => {
      res.json(todo);
      console.log("found");
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

app.put("/:todoId", (req, res) => {
  let update = {
    done: true
  };

  let query = { _id: req.params.todoId };

  Todo.findOneAndUpdate(query, update, { new: true, runValidators: true })
    .then(updatedtodo => {
      res.json(updatedtodo);
      console.log("updated");
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

app.delete("/:todoId", (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.todoId })
    .then(todo => {
      res.json({ deleted: true });
      console.log("deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ err });
    });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to db at /todoapp");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
