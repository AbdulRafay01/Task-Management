import React, { useState } from 'react'
import { createTask } from '../../api/Postapi'
import { useDispatch } from 'react-redux'
import { addTask } from '../../features/todo/TaskSlice'
import { useNavigate } from 'react-router-dom'
import Home from '../Home'

function CreateTask() {
    const dispatch = useDispatch()
    const[input, setinput] = useState({title:"", description:"", priority:"", status:"", assigned_to:""})
    const navigate = useNavigate()


    const handleTask =  async(e)=>{
        e.preventDefault()
    try{
        const taskData = { ...input,   assigned_to: parseInt(input.assigned_to, 10) }
      const res = await createTask(taskData)
      console.log(res)
      dispatch(addTask(res.data))
      setinput({title:"", description:"", priority:"", status:"", assigned_to:""})
      navigate("/task")
    }catch(err){
        console.error(" Error:", err.response?.data || err.message)

    }
    }

  return (
    <>
    <Home/>
    <div>
    
        <div className="w-full max-w-2xl bg-white mt-10 mx-auto p-6 rounded-lg shadow-xl">
        <h2 className='text-3xl font-bold text-center'>Create Task</h2>
        <form onSubmit={handleTask}   className="mt-2 space-y-4" >

           
        
            <label className=" block  font-semibold mb-2">Title</label>
            <input type='text'
            placeholder='Title'
            name='title'
            value={input.title}
            onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
            className="w-full mb-1 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow"/>
           
            <label className= "block  font-semibold mb-2">Description</label>      
            <textarea
            placeholder='Description'
            name='description'
            value={input.description}
            onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
            rows="5"
            cols="50"
              className="w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow"/>
              
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">    
            <div>     
            <label className= "block  font-semibold mb-2">Priority</label>
            <input type='text'
            placeholder='Priority'
            name='priority'
            value={input.priority}
            onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
            className="  px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow"/>
            </div>

            <div>
            <label className= "block  font-semibold mb-2">Status</label>
            <input type='text'
            placeholder='Status'
            name='status'
            value={input.status}
            onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
            className=" px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow"/>
            </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className= "block  font-semibold mb-2">Assisgned To</label>
            <input type='number'
            placeholder='Assigned Id'
            name='assigned_to'
            value={input.assigned_to}
            onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
            className="  px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow"/>
            </div>

            <div>
            <button type='submit'
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg mt-6">
            Add Task</button>
            </div>
            </div>


        </form>
        </div>
    </div>
    
    </>
  )
  
}

export default CreateTask