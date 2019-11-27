const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/tasks", function(req, response) {
  response.send({ tasks: [{"text" : "water plants", "completed" : false, "date" : "2019-10-29", id : 1},
  {"text" : "do dishes", "completed" : false, "date" : "2019-10-29", id : 2}, {"text" : "buy oats", "completed" : false, "date" : "2019-10-29", id : 3}, 
  {"text" : "buy cat food", "completed" : false, "date" : "2019-10-07", "id" : 4}] });
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
    "message" : "You issued a put request for ID: " + taskID
  };
  // {"text" : "buy cat food", "completed" : true, "date" : "2019-10-07", "id" : 4}
  response.status(200).json(updateMessage);

});

module.exports.handler = serverlessHttp(app);
