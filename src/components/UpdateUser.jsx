import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../api/Postapi'
import { updateaccount } from '../features/todo/TodoSlice'
import { useSelector } from 'react-redux'

function UpdateUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const[input,setInput] = useState({name:"",email:"",department:"",designation:"",phone:"",address:"",role:"",is_active:true})
 
    // const user = useSelector(state => state.todo.signup.find(u => u.id == id)) 
    const user = useSelector((state) =>
    state.todo.signup.find((u) => u.id === Number(id))
  )
    useEffect(()=>{
        if(user){
        setInput({
         name: user.name ||"",
         email: user.email || "",
         department: user.department || "",
         designation: user.designation || "",
         phone: user.phone || "",
         address: user.address || "",
         role : user.role || "",
         is_active: user.is_active ?? true
        
        })
    }
    },[user])


    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await updatePost(id,input)
            console.log(res.data)
            dispatch(updateaccount(res.data))
            navigate("/admin")
        }catch(err){
          console.error("Update User Error:", err.response?.data || err.message)
          alert(err.response?.data?.message || "Update failed")
        }
    }

 

     

    return (
    <div>
        <form onSubmit={handleSubmit}  className="bg-blue-200 max-w-md mx-auto  p-6 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update User</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={input.name}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={input.email}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3"
        />

        <input
          type="text"
          placeholder="Department"
          name="department"
          value={input.department}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3"
        />

        <input
          type="text"
          placeholder="Designation"
          name="designation"
          value={input.designation}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3"
        />

        <input
          type="tel"
          placeholder="Phone"
          name="phone"
          value={input.phone}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3"
        />

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={input.address}
        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3"
        />


        <select
          name="role"
          value={input.role}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-3">
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
        

        

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={input.is_active}
           onChange={(e) => setInput({ ...input, is_active: e.target.checked })}
                className="mr-2"
          />
          Active
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Update
        </button>
        </form>
    </div>
  )
}

export default UpdateUser