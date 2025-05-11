import axios from "axios"


export class TaskService{

     API_END_POINT="http://localhost:8000/api/v1"

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

}


const taskService=new TaskService()

export default taskService