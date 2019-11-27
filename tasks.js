const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : 'todo_app'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/tasks", function(req, response) {
  connection.query("SELECT * FROM task", function (err, data){
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.status(200).json(data);
    }
  });
  
});

app.delete("/tasks/:taskID", function (request, response){
// Delete task with given ID from the database
const taskToBeDeletedID = request.params.taskID;
let deleteResponse = {message: "You issued a delete request for ID: " + taskToBeDeletedID}

if(taskToBeDeletedID > 4){
  response.status(404)
  deleteResponse = {message: "Task: " + taskToBeDeletedID + " does not exist"}
}
response.send(deleteResponse);
});

app.post("/tasks", function (request, response){
  //Create the new task in the database
  const task = request.body; 
  // {text: "hoover the car", completed: false, date: "2019-11-20"}
  response.status(201).send(`Successfully created ${task.text} with date ${task.date}`);
});

app.put("/tasks/:taskID", function(request, response){
  //Update task in database
  const taskID = request.params.taskID;
  const task = request.body;
  const updateMessage = {
    "message" : "You issued a put request for ID: " + taskID + task.text
  };
  // {"text" : "buy cat food", "completed" : true, "date" : "2019-10-07", "id" : 4}
  //response.status(205).json(updateMessage);
  response.status(205).send(`You issued a PUT request for task ${taskID} with task ${JSON.stringify(task)}`);

});

module.exports.handler = serverlessHttp(app);
