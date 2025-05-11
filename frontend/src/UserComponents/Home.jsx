import taskService from '@/services/taskService';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TaskComp from './TaskComp';

function  Home () {
  
  const authStatus=useSelector((state)=>state.auth.status)
  const userData=useSelector((state)=>state.auth.userData)

const getTask=async()=>{

   const taskData= await taskService.getTask(userData)
   console.log(taskData);
   

  }

  useEffect(()=>{
        getTask()

  },[])

    return authStatus? (
      <div>
       <TaskComp/>
     </div>
    ):(<>
        <div className='font-semibold text-center m-4 text-2xl'>Login to See and Create Task</div>
    </>)
}

export default Home;