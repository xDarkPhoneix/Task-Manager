import taskService from '@/services/taskService';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskComp from './TaskComp';
import Dropdown from './Dropdown';

function  Home () {
  
  const authStatus=useSelector((state)=>state.auth.status)
  const userData=useSelector((state)=>state.auth.userData)
  const [task,setTask]=useState([])
   const [status,setStatus]=useState("All")
   const [filtered,setFiltered]=useState(false)
   
  

const getTask=async()=>{

   if(userData){
    const taskData= await taskService.getTask(userData)
   console.log(taskData);
   setTask(taskData.data)
   }
   

  }

  const handleSelect=(selectedOption)=>{
    console.log("Selected Status:", selectedOption);
    if(selectedOption!=="All"){
        setFiltered(true)
    }else{
      setFiltered(false)
    }
    setStatus(selectedOption)
    console.log(filtered);
    
  }

  useEffect(()=>{
        getTask()

  },[])

    return authStatus? (
      <>
       <div className='flex items-center justify-center'>
       <div className=' text-center text-2xl font-semibold m-4'>My Tasks : <span className='w-1/2'><Dropdown options={["All","To Do","Completed","In Progres"]}  onSelect={handleSelect}  /></span></div>
       </div>
        {task ? (<>
          
          {(filtered ? task.filter((t)=>t.status===status) : task)
          .map((t)=>(
              <div key={t._id}>
              <TaskComp key={t._id} status={t.status} title={t.title} id={t._id}  createdAt={t.createdAt} />
             </div>
          ))}

        </>) : (<></>)}


      
     </>
    ):(<>
        <div className='font-semibold text-center m-4 text-2xl'>Login to See and Create Task</div>
    </>)
}

export default Home;