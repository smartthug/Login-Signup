import { create } from 'zustand';
import axios from 'axios';

const Server_url = "http://localhost:5000/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isauthenticated: false,
  err: null,
  isloading: false,
  ischecking: true,

  signup: async (email, password, name) => {
    set({ isloading: true, err: null });
    try {
      const res = await axios.post(`${Server_url}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: res.data.user,
        isauthenticated: true,
        isloading: false,
      });
    } catch (err) {
      set({
        err: err.response?.data?.message || "Error signing up",
        isloading: false,
      });
      throw err;
    }
  },
  verify: async (code)=>{
    set({ isloading: true, err: null });
    try{
      const response = await axios.post(`${Server_url}/otp-verify`, {code});
      console.log("Verification response:", response.data);
      set({
        user: response.data.user,
        isauthenticated: true,
        isloading: false,
      });
      
    }
    catch(err){
      const message = err.response.data.message || err.message || "Error verifying email";
    console.error("OTP Verify Error:", message); // Debug line
    set({ err: message, isloading: false });
    throw err;
    }
  },
   login: async (email, password) => {
    set({ isloading: true, err: null });
    try {
      const res = await axios.post(`${Server_url}/login`, {
        email,
        password,
        
      });
      set({
        user: res.data.user,
        isauthenticated: true,
        isloading: false,
      });
    } catch (err) {
      set({
        err: err.response.data.message || "Error Loging in",
        isloading: false,
      });
      throw err;
    }
  },
  checkAuth:async()=>{
    set({ isloading: true, err: null });
    try {
      const res = await axios.get(`${Server_url}/check-auth`, { withCredentials: true });
      set({
        user: res.data.user,
        isauthenticated: true,
        isloading: false,
      });
    } catch (err) {
      set({
        err: err.response?.data?.message || "Error checking authentication",
        isloading: false,
      });
    }
  },
  logout:async()=>{
    set({err: null});
     try {
      const res = await axios.post(`${Server_url}/logout`)
      set({user: res.data.user,
        isauthenticated: false});
  }
  catch(err)
  {
 set({
        err: err.response.data.message || "Log Out Error"
        
      });
      throw err;
  }
},
  forgot:async(email)=>{
    set({ isloading: true, err: null });
    try {
      const res = await axios.post(`${Server_url}/forgot`, {
        email
      });
      set({
        user: res.data.user,
        isauthenticated: true,
        isloading: false,
      });
    } catch (err) {
      set({
        err: err.response.data.message || "User not Found",
        isloading: false,
      });
      throw err;
    }
  },
  reset:async(token,password)=>
  {
    console.log(token);
    set({ isloading: true, err: null });
    try {
      const res = await axios.post(`${Server_url}/reset-password/${token}`, {
        password
      });
      set({
        user: res.data.user,
        isauthenticated: true,
        isloading: false,
      });
    } catch (err) {
      set({
        err: err.response.data.message || "Error Reset",
        isloading: false,
      });
      throw err;
    } 
  }
    
}));
