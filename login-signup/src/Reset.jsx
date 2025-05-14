import React, { useState } from 'react'
import { Link ,useNavigate,useParams} from 'react-router-dom';
import { useAuthStore } from './store/authstore';
import {toast} from 'react-hot-toast';
 
const Reset = () => {
    const {reset,err}=useAuthStore();
    const navigator=useNavigate();
   const { token } = useParams();
    const [password,setPassword]=useState('');
    const handlereset=async(e)=>{
        e.preventDefault();
          try {
            await reset(token,password);
            toast.success("Reset Password Successfully");
            navigator('/login');
        
            console.log("Reset successful!");
          } catch (err) {
            console.log("Reset failed:", err);
            toast.error("Reset Failed");
          }
    }
  return (
    <>
   
    <section className="h-[100dvh] w-[100dvw] bg-gradient-to-bl from-[#123458] to-[#d4c9be]  ">
  <div className="flex items-center justify-center h-screen px-4">
     
      <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#030303]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-[#d4c9be]">
                  Reset Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handlereset}>
                 
                  <div>
                      <label htmlFor="New password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" id="password" placeholder="••••••••" className="bg-gray-50  border-white text-gray-900 rounded-lg focus:border-white  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none " required/>
                  </div>
                 {err && <p className='text-center text-red-500 text-xl'>{err}</p>}
                  <button type="submit" className="w-full text-black bg-[#d4c9be] hover:bg-[#f1efec] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset Password</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                           Back to <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                                       </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Reset
