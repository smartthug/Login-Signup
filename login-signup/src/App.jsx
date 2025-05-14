import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './Register';
import Login from './Login';
import Frogetpage from './Frogetpage';
import Otpverify from './Otpverify';
import Reset from './Reset';
import Openpage from './Openpage';
import Home from './Home';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast notifier */}
      <Routes>
        <Route path='/reg' element={<Register />} />
        <Route path='/otp' element={<Otpverify />} />
        <Route path='/forget-page' element={<Frogetpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password/:token' element={<Reset />} />
        <Route path='/' element={<Openpage />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
