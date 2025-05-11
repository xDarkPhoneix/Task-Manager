import { logout } from "@/store/authSlice"
import axios from "axios"

export class AuthService{

    API_END_POINT="https://task-manager-sagg.onrender.com/api/v1"                                     

    
    async login(data){


        const config={
            headers:{
                 "Content-Type":"application/json"
            }
        }
     
        const logindata=await axios.post(`${this.API_END_POINT}/users/login`,{
            email:data.email,
            password:data.password
        },)

        return logindata.data


    }


    async logout(accessToken){
         
          
        const config={
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }
        
        const logout=axios.post(`${this.API_END_POINT}/users/logout`,{},config)

        return logout;

    }


    async signup(data){
        
        const config={
            headers:{
                "Content-Type":"multipart/form-data; boundary=<calculated when request is sent>"
            }
        }


        const userData=await axios.post(`${this.API_END_POINT}/users/signup`,{
            name:data.name,
            email:data.email,
            password:data.password,
            avatar:data.avatar?.[0]
        },config)

        if(userData){
            return await this.login(data)
        }
    
    }


}




const authService=new AuthService()

export default authService