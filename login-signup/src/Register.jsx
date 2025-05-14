import React from 'react'
import { useState } from 'react'
import{Link,useNavigate} from 'react-router-dom'

import './App.css'
import { useAuthStore } from './store/authstore';
import {toast} from 'react-hot-toast'


const Register = () => {

    const navigator=useNavigate();
     const {signup,err}=useAuthStore();
     const [name,setname]=useState('');
     const [email,setemail]=useState('');
     const [psd,setpsd]=useState('');
     
const handleSubmitform=async(e)=>{
e.preventDefault();
  try {
    await signup(email, psd, name);
    toast.success("Signup Successfully");
    navigator('/otp');

    console.log("Signup successful!");
  } catch (err) {
    console.log("Signup failed:", err);
    toast.error("Signup Failed");
  }
}
  return (
    <>
    <section  className="w-[100dvw] h-[100dvh] bg-gradient-to-bl from-[#123458] to-[#d4c9be] ">
  <div className="flex  items-center justify-center h-screen px-4">
    
      <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#030303]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-center  md:text-2xl text-[#d4c9be]">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmitform}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" value={email}  id="email" className="bg-gray-50  text-white text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 border border-white focus:outline-none focus:ring-1 focus:ring-white focus:border-white" placeholder="name@company.com" onChange={(e)=>{setemail(e.target.value)}} required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" value={psd} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:outline-none focus:ring-1 focus:ring-white focus:border-white "onChange={(e)=>{setpsd(e.target.value)}} required />
                  </div>
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="name" value={name} id="name" placeholder="user_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:outline-none focus:ring-1 focus:ring-white focus:border-white" onChange={(e)=>{setname(e.target.value)}} required />
                  </div>
                 {err && <p className='text-red-500'>{err}</p>}
                  <button type="submit" className="w-full  text-black bg-[#d4c9be] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    SignUp
                    </button>
                  <p className="text-sm font-light text-[#f1efec]">
                      Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
       
    </>
  )
}

export default Register
