import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from './components/ui/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <h1 className='bg-slate-800 w-full text-4xl'>Mai hu gyan</h1>
    <Outlet/>
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
    </>
  )
}

export default App
