import React from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import { IoCheckmarkDone} from 'react-icons/io5'; 
import { MdOutlinePendingActions } from "react-icons/md";
import { baseURL } from '../utils/constant';
import axios from 'axios';

// List component to display individual tasks
const List = ({ id, task, body, status, setUpdateUI, updateMode }) => {
  // Function to remove a task
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      // Trigger updateUI to refresh the task list
      setUpdateUI((prevState) => !prevState);
    });
  };

  // Function to toggle the status of a task (done/pending)
  const toggleTaskStatus = (newStatus) => {
    axios.put(`${baseURL}/toggle/${id}`, { newStatus }).then((res) => {
      console.log(res.data);
      // Trigger updateUI to refresh the task list
      setUpdateUI((prevState) => !prevState);
    });
  };

  // Render each task as a list item
  return (
    <li>
      <div>
        <h3>{task}</h3>
        <p>{body}</p>
      </div>
      <div className='icon-holder'>
        {/* Edit icon to update a task */}
        <TbEdit className='icon' onClick={() => updateMode(id, task)} />
        
        {/* Delete icon to remove a task */}
        <RiDeleteBinFill className='icon' onClick={removeTask} />

        {/* Checkmark icon to mark a task as done */}
        {status === 'pending' ? (
          <IoCheckmarkDone className='icon' onClick={() => toggleTaskStatus('done')} />
        ) : (
          
          <MdOutlinePendingActions  className='icon' onClick={() => toggleTaskStatus('pending')} />
        )}
      </div>
    </li>
  );
};

export default List;
