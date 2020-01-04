# 98 3/4% Application - Backend

This is the back end API of a To do Application, built throughout the [Tech Returners](https://techreturners.com) Your Journey Into Tech course. It is consumed by a front end React application, available [here](https://github.com/AnnJBarr/ninetyeight_and_threequarters) and connects to an RDS Database.

The hosted version of the application is available here: [https://AnnJBarr.github.io/ninetyeight_and_threequarters/](https://AnnJBarr.github.io/ninetyeight_and_threequarters/).

### Technology Used

This project uses the following technology:

- Serverless Framework
- JavaScript (ES2015+)
- Express
- SQL
- Mysql library
- AWS Lambda and API Gateway
- AWS RDS
- ESLint

### Endpoints

The API exposes the following endpoints:

---

##### GET /tasks

******************.amazonaws.com/dev/tasks

Responds with JSON containing all tasks in the Database.

---

##### POST /tasks

******************.amazonaws.com/dev/tasks

Will create a new task when sent a JSON payload in the format:

```json
{
    "task_name": "Get worming tablets for dog",
    "done": 0,
    "date_added": "2020-01-03",
    "date_completed": null,
    "due_by": "2020-01-30"
  
}
```

---

##### DELETE /tasks/:taskId

******************.amazonaws.com/dev/tasks/:taskId

Deletes the task of the given ID.

---

##### PUT /tasks/:taskId

******************.amazonaws.com/dev/tasks/:taskId

Will update a task when sent a JSON payload in the format:

```json
{
  "task_name": "Get worming tablets for dog",
    "done": 1,
    "date_added": "2020-01-03",
    "date_completed": "2020-01-08",
    "due_by": "2020-01-30"
}
```