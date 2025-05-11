import React, { useState } from 'react';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import {login as authLogin} from "../store/authSlice"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';

function  Login () {

    const {handleSubmit,register,control,setValue}=useForm(
        {
            defaultValues:{
                email:"",
                password:""
                
               }
    }
    )
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const login=async(data)=>{

     try {
      setLoading(true)
      const userData=await authService.login(data)
      console.log((userData));
      
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
      <div className="w-full m-3 mt-6 flex justify-center items-center">

      <div className="w-full flex justify-center items-center">
      <form className="space-y-5 bg-slate-100  rounded-md p-10" onSubmit={handleSubmit(login)}>
                  
                  
               <div className="w-full flex items-center justify-center">
               <Logo/>
               </div>
                 
                 <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  className="text-black"
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
                   className="text-black"
                  {...register("password",{
                      required:true,

                  })}
                  
                  />

                 <Button
                    className="w-full bg-slate-900"
                     onClick={() => {
                     setValue("email","queen@gmail.com");
                     setValue("password","lola");
                     }}
                      >
                     Get Guest User Credentials
                    
                    </Button>
               

               <Button type="submit" className="w-full bg-slate-900" >{loading ? (<><Spinner/></>): (<> Login</>)}</Button>

             <p className="mt-2 text-center text-base text-black/60">
                      Don&apos;t have any account?&nbsp;
                      <Link
                          to="/signup"
                          className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                          Sign Up
                      </Link>
              </p>

            </form>
      </div>
     
      </div>
    )
}

export default Login;