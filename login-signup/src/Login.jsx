import React from 'react'
import { useState } from 'react';
import { useAuthStore } from './store/authstore';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
const navigator=useNavigate();
 const { login, err } = useAuthStore();
 const [email, setEmail] =useState('');
 const [password, setPassword] = useState('');
 const handleLogin=async(e)=>{
e.preventDefault();
  try {
    await login(email, password);
    toast.success("Signup Successfully");
    navigator('/home');

    console.log("login successful!");
  } catch (err) {
    console.log("login failed:", err);
    toast.error("Login Failed");
  }
}
  return (
    <>
   
    <section className="h-[100dvh] w-[100dvw] bg-gradient-to-bl from-[#123458] to-[#d4c9be]">
  <div className="flex items-center justify-center h-screen px-4">
     
      <div className="w-full bg-[#030303] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl text-center font-bold leading-tight tracking-tight  md:text-2xl text-[#d4c9be]">
                  Log-in
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email" id="email" className="bg-gray-50 border border-white text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" required/>
                  </div>
                   {err && <p className="text-red-600 text-center">{err}</p>}
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300" required>Remember me</label>
                          </div>
                      </div>
                      <Link to='/forget-page' className="text-sm font-medium text-white text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                  </div>
                  <button type="submit" className="w-full text-black bg-[#d4c9be] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-[#f1efec]">
                      Don’t have an account yet? <Link to='/reg' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default Login
