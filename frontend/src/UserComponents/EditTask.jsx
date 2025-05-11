import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import { useNavigate, useParams } from 'react-router-dom';
import taskService from '@/services/taskService';

function  EditTask () {
    const {id}=useParams()
    const [updateTask,setTask]=useState("")
    const navigate=useNavigate()

    const getTaskData=async()=>{
        
        const taskdata=await taskService.getTaskById(id)
        console.log(taskdata);
        setTask(taskdata.data)
        
     }

    useEffect(()=>{
        getTaskData()
    },[])
    return updateTask? (
      <div>
        <AddTask id={id} updateTask={updateTask}/>
     </div>
    ):(<>Loadin..</>)
}

export default EditTask;