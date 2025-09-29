import { useState } from "react"
import { useDispatch } from "react-redux"
import { createPost } from "../api/Postapi"
import { addaccount } from "../features/todo/TodoSlice"
import { useNavigate } from "react-router-dom"


function AdminNewUser() {

     const dispatch = useDispatch()
      const navigate = useNavigate()
     const[input,setinput] = useState({name:"",email:"",password:"",department:"",designation:"",phone:"",address:"",role:""})
     
     const handleInput = async(e)=>{
          e.preventDefault()
      try{
          const res = await createPost(input)
          console.log(res)
          
          dispatch(addaccount(res.data.user || res.data))
         setinput({name:"", email:"", password:"", department:"", designation:"", phone:"", address:"", role:""})
          navigate("/admin")
      }catch(err){
          console.error("Create User Error:", err.response?.data || err.message)
      }
          
     }

 

  return (
    <div className="bg-gray-800">
        <form onSubmit={handleInput} className="bg-blue-200 max-w-md mx-auto  p-6 border rounded-lg shadow-lg">
         <h2 className="text-xl font-bold mb-4">Create User</h2>  
     
        <input type='text'
        placeholder='Name'
        name='name'
        value={input.name}
         onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
         className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

        <input type='email' 
        placeholder='Email'
        name='email'
         value={input.email} 
         onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

        <input type='password'
        placeholder='SetPassword'
        name='password'
        value={input.password} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
       </input><br/><br/>

        <input type='text'
        placeholder='Department' 
        name='department'
        value={input.department} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })} 
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

        <input type='text'
        placeholder='Designation'
        name='designation'
        value={input.designation}
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

        <input type='tel'
        placeholder='Contact' 
        name='phone'
        value={input.phone} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

        <input type='text'
        placeholder='Address' 
        name='address'
        value={input.address} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

       <input type='text'
        placeholder='Role' 
        name='role'
        value={input.role} 
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="  w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl  bg-gray-50 placeholder-gray-400 
        text-gray-800 focus:outline-none   focus:ring-4 focus:ring-blue-200   focus:border-blue-500 shadow-md   transition duration-300">
        </input><br/><br/>

      
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

export default AdminNewUser