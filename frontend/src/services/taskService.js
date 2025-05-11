import axios from "axios"

export class TaskService{

     API_END_POINT="https://task-manager-sagg.onrender.com/api/v1"

     async getTask(userData){
        
        const accessToken=userData.data.accessToken
        

        const config={
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }

        const task=await axios.post(`${this.API_END_POINT}/task/getTask`,{},config)

        console.log(task);
        return task.data
        

     }

     async createTask(data,status,accessToken){

        const config={
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }

        const task=await axios.post(`${this.API_END_POINT}/task`,{
            title:data.title,
            description:data.description,
            status:status    


        },config)

        
        return task.data

     }

     async getTaskById(id){
        
      
        const config={
            headers:{
                 "Content-Type":"application/json"
            }
        }
        const data=await axios.post(`${this.API_END_POINT}/task/getTaskById`,{id},config)

        return data.data
     }
    
     async deleteTask(id,accessToken){
        const config={
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }

        const task=await axios.post(`${this.API_END_POINT}/task/deleteTask`,{id},config)

        return task;

     }


     async updateTask(id,status,accessToken,data){

        const config={
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }

        const task=await axios.post(`${this.API_END_POINT}/task/updateTask`,{
            id,
            title:data.title,
            description:data.description,
            status:status
        
        },config)

        return task.data;

     }

}


const taskService=new TaskService()

export default taskService