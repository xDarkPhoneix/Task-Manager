import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function  TaskComp ({title="hola",status="To Do",id="",createdAt=""}) {
     const navigate=useNavigate()
     

    return (
        <div className='flex  mt-2  items-center justify-center text-white'>
        <button 
        className='w-full flex items-center justify-center'
        onClick={()=>{
         navigate(`/task/${id}`)
        }}
        >
        <div className='bg-slate-600  w-full m-2 gap-2  md:w-1/2 md:m-0 rounded-lg h-14 flex items-center justify-evenly '>
         <div >
         { title ? (<>
            <span className='sm:text-[18px]' >{title}</span>
           </>) : (null) }
         </div>
         
        
         <div> {status ? (<div  className='font-semibold '>{status}</div>) : (<div className=''></div>)} </div>
         
         </div>
        
        </button>
      </div>
    )
}

export default TaskComp;