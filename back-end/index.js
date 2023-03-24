const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, date } = req.body;
  const task = {id: uuid.v4(), title, date };
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { title, date } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    task.title = title;
    task.date = date;
    res.json(task);
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    res.status(404).send('Task not found');
  } else {
    tasks.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
