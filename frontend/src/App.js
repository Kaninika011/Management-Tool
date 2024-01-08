import React, { useState, useEffect } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURL } from './utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [input, setInput] = useState({ task: '', body: '' });
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    axios.get(`${baseURL}/get?status=${filterStatus}`).then((res) => {
      setTasks(res.data);
    });
  }, [filterStatus, updateUI]);

  const addTask = () => {
    if (!input.task.trim()) {
      toast.error('Title is required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    axios.post(`${baseURL}/save`, { ...input, status: filterStatus }).then((res) => {
      console.log(res.data);
      setInput({ task: '', body: '' });
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput({ task: text, body: '' });
    setUpdateId(id);
  };

  const updateTask = () => {
    if (!input.task.trim()) {
      toast.error('Title is required', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    axios.put(`${baseURL}/update/${updateId}`, { ...input, status: filterStatus }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput({ task: '', body: '' });
    });
  };
  

  return (
    <main>
      <h1 className='title'>Management Tool</h1>
      <div className='input_holder'>
        <input
          type='text'
          value={input.task}
          onChange={(e) => setInput({ ...input, task: e.target.value })}
          placeholder='Title'
        />
        <input
          type='text'
          value={input.body}
          onChange={(e) => setInput({ ...input, body: e.target.value })}
          placeholder='Description'
        />
        <button type='submit' onClick={updateId ? updateTask : addTask}>
          {updateId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value='all'>All Tasks</option>
        <option value='pending'>Pending Tasks</option>
        <option value='done'>Completed Tasks</option>
      </select>

      <ul>
      {tasks
  .filter((task) => filterStatus === 'all' || task.status === filterStatus || (filterStatus === 'done' && task.status === 'pending'))
  .map((task) => (
    <List
      key={task._id}
      id={task._id}
      task={task.task}
      body={task.body}
      status={task.status}
      setUpdateUI={setUpdateUI}
      updateMode={updateMode}
    />
  ))}
      </ul>

      <ToastContainer />
    </main>
  );
};

export default App;
