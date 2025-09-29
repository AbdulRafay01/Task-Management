import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addaccount } from '../features/todo/TodoSlice'
import { signupPost } from '../api/Postapi'
import Cookies from "js-cookie"

function Signup() {
    const todos = useSelector(state=>state.todo.signup)
    console.log("Redux signup state:", todos);
    const dispatch = useDispatch()
    const[input,setinput] = useState({name:"",email:"",password:"",department:"",designation:"",phone:"",address:""})


    const handleSubmit =((e)=>{
        e.preventDefault()
        signin()
    })

    const signin = async()=>{
    try{
        const ref = await signupPost(input)
        console.log(ref)

         // token ko 1 saal ke liye cookie me save karo
      if(ref.data.access_token){
      Cookies.set("token", ref.data.access_token, { expires: 365 })  
        }


          dispatch(addaccount(ref.data.user || ref.data))
     //    dispatch(addaccount(ref.data))

     setinput({ name: "", email: "",  password: "",department: "", designation: "",phone: "",address: ""
      })
    }catch(err) {
      console.error("Signup Error:", err.response?.data || err.message)
    }
    }
  return (
       <div>
    <form onSubmit={handleSubmit}className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">SignUp</h2>

  
     
        <input type='text'
        placeholder='Name'
        name='name'
        value={input.name}
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full  max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>

        <input type='email' 
        placeholder='Email'
        name='email'
        value={input.email} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>

        <input type='password'
        placeholder='SetPassword'
        name='password'
        value={input.password} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>

        <input type='text'
        placeholder='Department' 
        name='department'
        value={input.department} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })} 
        className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>

        <input type='text'
        placeholder='Designation'
        name='designation'
        value={input.designation}
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>

        <input type='tel'
        placeholder='Contact' 
        name='phone'
        value={input.phone} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>

        <input type='text'
        placeholder='Address' 
        name='address'
        value={input.address} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-blue-500 shadow-sm"/><br/><br/>


        <button
        type="submit"
        className="w-full max-w-md bg-blue-600 text-white font-semibold py-2 px-4 
             rounded-lg shadow-md hover:bg-blue-700 focus:outline-none 
             focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition">  Submit
         </button>




  
    </form>
      </div>
  )
}

export default Signup