import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addaccount } from '../features/todo/TodoSlice'
import { loginPost } from '../api/Postapi'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"

function Login() {
    const [input,setinput] = useState({email:"",password:""})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Login= async(e)=>{
     e.preventDefault()

     try{
      const res = await loginPost(input)
      console.log("Login Response",res)
 
    
    if (res.data.access_token) {
        Cookies.set("token", res.data.access_token, { expires: 1 }) }

  
    if (res.data.refresh_token) {
    Cookies.set("refreshToken", res.data.refresh_token, { expires: 7 }) 
    }
           
    const decoded = jwtDecode(res.data.access_token)
    console.log("Decoded Token:", decoded)
    console.log("User Role:", decoded.role)          //"Employee" / "Manager" / "Admin" 
          
     dispatch(addaccount(res.data.user || res.data))
     setinput({email:"",password:""})

    const role = decoded.role?.toLowerCase()
    if (role === "admin") {
      navigate("/admin")
    } else if (role === "manager") {
      navigate("/manager")
    } else if (role === "employee") {
     navigate("/employee")
    } else {
     navigate("/")
}
  }catch(err){
       if (err.response?.status === 401) {
        alert("Invalid credentials! Please signup first.")
      } else {
        alert("Login failed. Try again later.")
      }
      console.log("Login Error:", err.response?.data || err.message)
    }   
}

  return (
    

    <div>
     <form onSubmit={Login} className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Login Form</h2>
        <input type='email'
        placeholder='Enter valid Email...'
        name='email'
        value={input.email}
        onChange={(e)=>setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full px-4 py-2 border border-gray-400 rounded mb-4"/>
        
         <input type='password'
        placeholder='Enter Password.'
        name='password'
        value={input.password}
        onChange={(e)=>setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full px-4 py-2 border border-gray-400 rounded mb-4"/>

        <button type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        

    </form>
      <p className="text-center mt-4">
      Create Account <Link to="/signup" className="text-blue-800 font-semibold">Signup</Link>
     </p>

       
        
    </div>
    
  )
}

export default Login