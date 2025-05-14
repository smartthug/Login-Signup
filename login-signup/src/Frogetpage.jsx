import React, { useState } from 'react'
import { useAuthStore } from './store/authstore';
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
const Frogetpage = () => {
    const {forgot,err}=useAuthStore();
    const navigator=useNavigate();
    const [email,setEmail]=useState();
    const handleLogin=async(e)=>{
e.preventDefault();
  try {
    await forgot(email);
    toast.success("Password Resend mail Send  Successfully");
    navigator('/reset-password/:token');

    console.log("login successful!");
  } catch (err) {
    console.log("login failed:", err);
    toast.error("Reset Failed");
  }
}
  return (
   <>
     <section className="w-[100dvw] h-[100dvh] bg-gradient-to-bl from-[#123458] to-[#d4c9be]">
      <div className="flex  items-center justify-center px-4  h-screen">
         
          <div className="w-full bg-[#030303] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-3xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-[#d4c9be]">
                      Forget Password ?
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                      <div>
                          <label for="email" className="block mb-2 text-sm text-center font-medium text-gray-900 dark:text-white">No worries, we'll send your reset instruction </label>
                          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email" id="email" className="bg-transparent border border-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="name@company.com" required/>
                      </div>
                     
                     {err&&<p className='text-xl text-center text-red-500'>{err}</p>}
                      <button type="submit" className="w-full text-black bg-[#d4c9be] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-grey-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-grey-700 dark:focus:ring-primary-800">Reset Password</button>
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

export default Frogetpage
