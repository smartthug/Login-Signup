import React from 'react'
import { Link } from 'react-router-dom'
const Openpage = () => {
  return (
    <div className='text-center h-[100dvh] w-[100dvw] bg-gradient-to-bl from-[#123458] to-[#d4c9be] flex flex-col gap-3 justify-center items-center text-[#030303] '>
      
      <h1 className='text-9xl font-bold sm:text-4xl md:text-6xl'>Hello, Friend!</h1>
      <p className='text-3xl sm:text-xl md:text-2xl'>Enter your personal details and start journey with us</p>
      <div className='flex gap-4'>
      <Link to="/reg" className='text-xl border-2 rounded-xl px-4 py-2'>Sign Up</Link>
      <Link to="/login" className='text-xl border-2 rounded-xl px-4 py-2'>Login</Link>
      </div>
    </div>
  )
}

export default Openpage
