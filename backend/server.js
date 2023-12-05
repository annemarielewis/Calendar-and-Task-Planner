//purpose = make all of the info on our backend able to be easily processed/read by the front end/client side
//we will need express for this!
//In this file, we will create routes and perform CRUD

const express = require("express");
const db = require("./db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// require() imports here: importing the Task model
const { Task } = require("./models");
// const { User } = require("./models");
// const { Partner } = require("./models");

const PORT = process.env.PORT || 3001;

const app = express();

//middleware:
app.use(logger("dev")); //morgan (logger) prints our requests in terminal)
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//middleware here ^//

//We will want to update our database to include a new task every time a task is added on the front end
//CRUD: CREATE
app.post("/newtask", async function createTask(req, res) {
  try {
    // formdata from Main= what's in the body here
    const taskData = await new Task(req.body);
    await taskData.save();
    console.log(taskData);
    return res.status(201).json({ taskData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

//An index route (shows all tasks) for the user
//CRUD: READ
app.get("/tasks", async function (req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
