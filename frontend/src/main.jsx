import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Login from './UserComponents/Login.jsx'
import Signup from './UserComponents/Signup'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import Home from './UserComponents/Home'
import AddTask from './UserComponents/AddTask'
import TaskCard from './UserComponents/TaskCard'
import EditTask from './UserComponents/EditTask'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      { 
         path:"/login",
         element:<Login/>

      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"add-task",
        element:<AddTask/>
      },
      {
        path:"/task/:id",
        element:<TaskCard/>
      },
      {
        path:"/edit-task/:id",
        element:<EditTask/>
      }
    ]
  } 

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
