const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (request, response) {
// Get all tasks from database
response.status(200).send("You requested all the tasks!");
});

app.delete("/tasks/:taskID", function (request, response){
// Delete task with given ID from the database
const taskID = request.params.taskID;
response.status(200).send(`Successfully deleted task ${taskID}`);
});

app.post("/tasks", function (request, response){
  //Create the new task in the database
  const task = request.body; 
  // {text: "hoover the car", completed: true, date: "2019-11-20"}
  response.status(201).send(`Successfully created ${task.text}`);
})

module.exports.tasks = serverlessHttp(app);
