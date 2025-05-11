import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Dropdown from './Dropdown';
import { Textarea } from '@/components/ui/textarea';
import taskService from '@/services/taskService';

function  AddTask ({updateTask,id}) {
  const {register,handleSubmit}=useForm({
    defaultValues:{
      title: updateTask?.title || "",
      description:updateTask?.description || ""
      
     }
  })
    const userData=useSelector((state)=>state.auth.userData)
    const [status,setStatus]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()


    useEffect(()=>{
      console.log(updateTask);
      
    },[])

    const create=async(data)=>{
     try {
      setLoading(true)
      const accessToken=userData.data.accessToken

     if(updateTask){

      const task=await taskService.updateTask(id,status,accessToken,data)
      setLoading(false)
      navigate("/")

     }else{
      const task= await taskService.createTask(data,status,accessToken)
      setLoading(false)
       if(task){
        navigate("/")
       }
    }
      } catch (error) {
       setLoading(false)
        throw error 
    } 

  }

    const handleSelect=(selectedOption)=>{
      console.log("Selected Status:", selectedOption);
      if(updateTask){
        setStatus(updateTask?.status)
      }
      setStatus(selectedOption)
    }

    return (
        <div className='w-full  mt-6 flex justify-center items-center'>
        <div className="w-full m-1 md:w-full flex justify-center items-center">
         <form className="space-y-5 md:w-1/4 bg-slate-100  rounded-md p-10" onSubmit={handleSubmit(create)}>
                          
                 <div className="w-full flex items-center justify-center">
                 <Logo/>
                 </div>

                    <Input
                     label="Title"
                     placeholder="Enter Task Title"
                     {...register("title",{
                        required:true
                     })}
                    
                    
                    /> 

                   <div>
                   
                   <textarea
                    className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none align-top"
                    placeholder="Enter task description"
                    {...register("description", { required: true })}
                    />
                   
                   </div>
                   <div className="p-6">
                     <h1 className="text-2xl text-black font-bold mb-4">Enter Task Status</h1>
                        <Dropdown options={["To Do","Completed","In Progres"]} onSelect={handleSelect} />
                    </div>
                   <div> 
                   </div>
                   
                    <Button type="submit" className="w-full bg-slate-900" >{loading ? (<><Spinner/></>): (<>{updateTask ? (<>Update Task</>):(<>Create Task</>)} </>)}</Button>
                </form>
                </div>
                </div>
    )
}

export default AddTask;