import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import Logo from './Logo';
import LogoutBtn from './LogoutBtn';

function  Header () {
    const authStatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate()

    useEffect(()=>{
        console.log(authStatus);
        
    },[])
    
    const navitems=[
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "Add Task",
            slug: "/addtask",
            active: authStatus,
        },

       
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
         <Container>

        
        <nav className="flex">
          <div className="mr-4">
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>

          <ul className='flex ml-auto'>
            {navitems.map((item)=>
             item.active? (
                <li key={item.name}>
                 <button
                 onClick={()=>
                   
                    navigate(item.slug)
                 }
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                 >
                    {item.name}
                  
                    

                 </button>
                </li>
             ) : null
            )}

            {authStatus && (
                <li>
                <LogoutBtn/>
                </li>
            )}



          </ul>


          </nav>

         </Container>

        </header>
    )
}

export default Header;