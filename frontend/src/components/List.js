import React from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { IoCheckmarkDone } from "react-icons/io5";
import { baseURL } from '../utils/constant';
import axios from 'axios';

const List = ({ id, task, body, status, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const markTaskAsDone = () => {
    axios.put(`${baseURL}/toggle/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  return (
    <li>
      <div>
        <h3>{task}</h3>
        <p>{body}</p>
      </div>
      <div className='icon-holder'>
        <TbEdit className='icon' onClick={() => updateMode(id, task)} />
        
        
        <RiDeleteBinFill className='icon' onClick={removeTask} />

       <IoCheckmarkDone className='icon' onClick={markTaskAsDone}/>
           
       
      </div>
    </li>
  );
};

export default List;
