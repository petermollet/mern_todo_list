const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const Schema = mongoose.Schema;
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());


// Connect Server
app.listen(4000, () => {
  console.log("server is up and running on port 4000");
});


// I'm using my own data base via mongodb.com, pass you own to make it work
const db = process.env.MDB_ITEMS_TODO;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("successfully connected to db"))
        .catch((err) => console.log(err));


//Task Schema
const todoSchema = new Schema({
  text: String,
  isCompleted: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);


//Routes
app.use("/todos", router);

//get all todos
router.route("/").get((_,res) => {
  Todo.find((err, items) => {
    if (err) res.send(400).send(`ERROR ${err}`);
    else res.status(200).send(items);
  });
});

//create a new todo
router.route("/add").post((req, res) => {
  const todo = new Todo(req.body);
  todo.save()
      .then((response) =>  res.status(200).send(response))
      .catch((err) => res.status(400).send({ error: `error adding document ${err}` }) );
});

//update a todo
router.route("/:id").put((req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
      .then((todo) => {
            todo.isCompleted = !todo.isCompleted;
            todo.save();
            res.status(200).send({ message: `${todo.text} is successfully updated` });
      })
      .catch((err) => res.status(400).send({ error: `error updating todo ${err}` }) );
});

//delete a todo
router.route("/:id").delete(function (req, res) {
  Todo.findByIdAndRemove(req.params.id, { useFindAndModify: false }, () =>  res.status(200).send({ message: `todo is successfully deleted` }) )
      .catch((err) => res.status(400).send({ error: `error deleting todo ${err}` }) );
});