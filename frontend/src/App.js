import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);
  }

  async function addTask() {
    await axios.post('http://localhost:3001/tasks', { id, title, date });
    setId('');
    setTitle('');
    setDate('');
    fetchTasks();
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    fetchTasks();
  }

  function editTask(id) {
    const task = tasks.find((task) => task.id === id);
    setTitle(task.title);
    setDate(task.date);
    deleteTask(id);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addTask();
  }

  return (
    <div className='space'>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={handleSubmit}>
        <label>Data: </label>
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} placeholder="Date" />
        <label className='lado'>Nome da Tarefa: </label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
        <button className='lado' type="submit">Add Task</button>
      </form>
      <br/>
      <table>
        <thead>
          <tr>
            <th className='w100'>Date</th>
            <th className='w300'>Title</th>
            <th className='w300'>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.date}</td>
              <td>{task.title}</td>
              <td>
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button className='sb' onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;