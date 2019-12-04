const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todo_app'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/tasks", function (req, response) {
  connection.query("SELECT * FROM task", function (err, data) {
    if (err) {
      response.status(500).json({ error: err });
    } else {
      response.status(200).json(data);
    }
  });

});

app.delete("/tasks/:taskID", function (request, response) {
  // Delete task with given ID from the database
  const taskID = request.params.taskID;
  //Escape user provided values
  connection.query("DELETE from task WHERE task_id = ?", [taskID], function (err, data) {
    if (err) {
      response.status(500).json({ error: err });
    } else {
      response.sendStatus(200)
    }
  });
});
// let deleteResponse = {message: "You issued a delete request for ID: " + taskToBeDeletedID}

// if(taskToBeDeletedID > 4){
//   response.status(404)
//   deleteResponse = {message: "Task: " + taskToBeDeletedID + " does not exist"}
// }
// response.send(deleteResponse);
// });

app.post("/tasks", function (request, response) {
  //Create the new task in the database
  const task = request.body;
  task.done = false;
  // {text: "hoover the car", completed: false, date: "2019-11-20"}
  const query = "INSERT INTO task SET ?;"
  // const query = "INSERT INTO task (task_name,due_by,done,date_added,date_completed,owner_id) VALUES(task_name = ?,due_by = ?,done = ?,date_added = ?,date_completed = ?,owner_id = ?);"
  connection.query(query, task, function (err, data) {
    if (err) {
      response.status(500).json({ error: err });
    } else {
      task.task_id = data.insertId
      response.status(201).json(task);
    }
  });
});
//   response.status(201).send(`Successfully created ${task.task_name} with date ${task.date_added}`);
// });

app.put("/tasks/:taskID", function (request, response) {
  //Update task in database
  const taskID = request.params.taskID;
  const task = request.body;
  //{"task_name": "Homework Lizzie", "due_by": "2019-11-16T00:00:00.000Z", "done": 1, "date_added": "2019-10-16T00:00:00.000Z", "date_completed": "0000-00-00"}
  const q = "UPDATE task SET task_name = ?, due_by = ?, done = ?, date_completed = ? WHERE task_id = ?"
  connection.query(q, [task.task_name, task.due_by, task.done, task.date_completed, taskID], function (err, data) {
    if (err) {
      response.status(500).json({ error: err })
    } else {
      response.sendStatus(205);
    }
  });
});
// const updateMessage = {
//   "message" : "You issued a put request for ID: " + taskID + task.text
// };
// {"text" : "buy cat food", "completed" : true, "date" : "2019-10-07", "id" : 4}
//response.status(205).json(updateMessage);
//   response.status(205).send(`You issued a PUT request for task ${taskID} with task ${JSON.stringify(task)}`);

// });

module.exports.handler = serverlessHttp(app);
