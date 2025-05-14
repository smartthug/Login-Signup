import React, { Children } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useAuthStore } from './store/authstore';
import {toast} from 'react-hot-toast';
const Home = () => {
  const { logout, err } = useAuthStore();
  const navigator=useNavigate();
 const handleSubmitform=async(e)=>{
 e.preventDefault();
   try {
     await logout();
     toast.success("Logout Successfully");
     navigator('/');
 
     
   } catch (err) {
     console.log("Signup failed:", err);
     toast.error("Logout Failed");
   }
 }
  

  return (
    <div className='text-center w-[100dvw] h-[100dvh] bg-gradient-to-bl from-[#123458] to-[#d4c9be] flex flex-col gap-3 justify-center items-center text-[#030303]'>
      <h1 className='text-6xl font-bold sm:text-4xl md:text-6xl'>Welcome to Home Page</h1>
      <p className='text-3xl sm:text-xl md:text-2xl'>This is the home page of the application.</p>
     {err&& <p className='text-xl text-red-500 text-center'>{err}</p>}
      <Link to='/' onClick={handleSubmitform} className='text-xl border-2 rounded-xl px-4 py-2'>Log Out</Link>
    </div>
  )
}

export default Home
