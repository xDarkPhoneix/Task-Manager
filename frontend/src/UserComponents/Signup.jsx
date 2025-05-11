import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Logo from './Logo';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import { useDispatch } from 'react-redux';
import {login as authLogin} from "../store/authSlice"





function  Signup () {
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()


    const create=async(data)=>{
    try {
    setLoading(true)
    const userData= await authService.signup(data)
    console.log(userData);
 
      if(userData){
         localStorage.setItem("userData",JSON.stringify(userData))
         dispatch(authLogin({userData:userData}))
         setLoading(false)
         navigate("/")
      }
    
    } catch (error) {
        setLoading(false)
        throw error
        }   
     
}
    


    return (

        <div className='w-full mt-6 flex justify-center items-center'>
        <div className="w-full m-1 md:w-2/4 flex justify-center items-center">
         <form className="space-y-5 bg-slate-100  rounded-md p-10" onSubmit={handleSubmit(create)}>
                          
                 <div className="w-full flex items-center justify-center">
                 <Logo/>
                 </div>

                    <Input
                     label="FullName"
                     placeholder="Enter your name"
                     {...register("name",{
                        required:true
                     })}
                    
                    
                    /> 

                    <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPattern :(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                    })}
                   
                    />
                    <Input
                    type="password"
                    placeholder="Enter your password"
                    label="password"
                    {...register("password",{
                        required:true,

                    })}
                    
                    />
                   <div> 
                    <span className='text-xs pl-1 text-black font-bold'>Select Your Profile Picture</span>
                   <Input
                    type="file"
                    placeholder="Upload your pic"
                    {...register("avatar",{
                        required:true,
                    })}

                    />
                   </div>
                    <Button type="submit" className="w-full bg-slate-900" >{loading ? (<><Spinner/></>): (<> Create Account</>)}</Button>
                </form>
                </div>
                </div>
    )
}

export default Signup;