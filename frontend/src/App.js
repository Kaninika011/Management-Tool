// Import React and necessary dependencies
import React, { useState, useEffect } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURL } from './utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main App Component
const App = () => {
  // State variables
  const [input, setInput] = useState({ task: '', body: '' });
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/get?status=${filterStatus}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect to run fetchData when component mounts or when filterStatus or updateUI changes
  useEffect(() => {
    fetchData();
  }, [fetchData, filterStatus, updateUI]);

  // Function to add a new task
  const addTask = async () => {
    if (!input.task.trim()) {
      // Show an error toast if the title is empty
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

    try {
      // Make a POST request to save the new task
      const response = await axios.post(`${baseURL}/save`, { ...input, status: filterStatus });
      console.log(response.data);
      // Clear input and trigger updateUI to refresh the task list
      setInput({ task: '', body: '' });
      setUpdateUI((prevState) => !prevState);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Function to update an existing task
  const updateTask = async () => {
    if (!input.task.trim()) {
      // Show an error toast if the title is empty
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

    try {
      // Make a PUT request to update the task
      const response = await axios.put(`${baseURL}/update/${updateId}`, { ...input, status: filterStatus });
      console.log(response.data);
      // Clear input, reset updateId, and trigger updateUI to refresh the task list
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput({ task: '', body: '' });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to set update mode for a specific task
  const updateMode = (id, text) => {
    console.log(text);
    setInput({ task: text, body: '' });
    setUpdateId(id);
  };

  // Render the UI
  return (
    <main>
      <h1 className='title'>Management Tool</h1>
      <div className='input_holder'>
        {/* Input fields for task title and description */}
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
        {/* Button to add or update a task based on updateId */}
        <button type='submit' onClick={updateId ? updateTask : addTask}>
          {updateId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      {/* Dropdown to filter tasks based on status */}
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value='all'>All Tasks</option>
        <option value='pending'>Pending Tasks</option>
        <option value= 'done'>Completed Tasks</option>
      </select>

      {/* Display the list of tasks */}
      <ul>
      {tasks
  .filter((task) => filterStatus === 'all' || task.status === filterStatus)
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
