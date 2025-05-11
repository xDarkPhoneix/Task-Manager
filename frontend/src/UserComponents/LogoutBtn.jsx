import authService from '@/services/authService';
import { logout } from '@/store/authSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function  LogoutBtn () {
    const userData=useSelector((state)=>state.auth.userData)
    const dispatch=useDispatch()
 
    const logoutHandler=async()=>{
          const log=await authService.logout(userData.data.accessToken)
         if(log){
            dispatch(logout())
         }
    }
    


    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >Logout</button>
    )
    
}

export default LogoutBtn;