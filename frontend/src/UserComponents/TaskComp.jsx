import React from 'react';

function  TaskComp ({title="hola",}) {
     


    return (
        <div className='flex  mt-2  items-center justify-center text-white'>
        <button 
        className='w-full flex items-center justify-center'
        onClick={()=>{
         navigate(`/hackthons/${_id}`)
        }}
        >
        <div className='bg-slate-600  w-full m-2 gap-2  md:w-1/2 md:m-0 rounded-lg h-14 flex items-center justify-evenly '>
         <div >
         { title ? (<>
            <span className='sm:text-[18px]' >{title}</span>
           </>) : (null) }
         </div>
         
        
         {/* <div> {active ? (<div  className='bg-green-500 rounded-full h-3 w-3'></div>) : (<div className='bg-red-600 rounded-full h-3 w-3'></div>)} </div> */}
         
         </div>
        
        </button>
      </div>
    )
}

export default TaskComp;