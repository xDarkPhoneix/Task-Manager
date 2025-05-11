import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import taskService from '@/services/taskService';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

function  TaskCard () {
      const {id}=useParams()
      const [task,setTask]=useState({})
      const navigate=useNavigate()
      const userData=useSelector((state)=>state.auth.userData)
      const date=new Date(task.createdAt)
      const formatted = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        });
      const onDelete=async()=>{

       const deleted= await taskService.deleteTask(id,userData.data.accessToken)
       if(deleted){
        navigate("/")
       }

      }

     const getTaskData=async()=>{
        
        const taskdata=await taskService.getTaskById(id)
        console.log(taskdata);
        setTask(taskdata.data)
        
     }

     useEffect(()=>{
        getTaskData()
     },[])

    const getStatusStyle = () => {
       if(task){
        if (task.status === "Completed") return "bg-green-100 text-green-700";
        if (task.status === "In Progres") return "bg-yellow-100 text-yellow-700";
        return "bg-gray-100 text-gray-600";

       }
      };
    return  task?  (
    <div className='w-full flex items-center justify-center m-2 md:m-5'> 
         <Card className="w-full md:w-max m-4 md:m-0 md: rounded-2xl shadow-sm border border-muted p-4 mb-4">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-primary">{task.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{task.description}</p>
            <div className='w-full flex  flex-col md:flex-row  mt-2 justify-between'>
            <span
              className={`w-full text-xs rounded-md p-2 ${getStatusStyle()}`}
            >
              Status : {task.status}
            </span>
            <div className=' mt-2 md:ml-5 md:mt-0'><span >Date : {formatted}</span></div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" 
             onClick={()=>{
                navigate(`/edittask/${id}`)
               }}
            >
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
    ):(<>Loading.....</>)
}

export default TaskCard;