import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from './components/ui/button'
import Header from './UserComponents/Header'
import Footer from './UserComponents/Footer'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'


function App() {
  const [count, setCount] = useState(0)
  const dispatch=useDispatch()
  const userData=JSON.parse(localStorage.getItem("userData"))


  useEffect(()=>{
   
    if(userData){
      dispatch(login({userData:userData}))
    }

  },[])

  return (
   
    
    <div className='min-h-screen w-full flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
     <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
    
  )
}

export default App
