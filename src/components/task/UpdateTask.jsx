import React, { useState, useEffect } from 'react'
import { useNavigate,  useParams} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { editTask } from '../../api/Postapi'
import { updateTask } from '../../features/todo/TaskSlice'
import Home from '../Home'

function UpdateTask() {

    const [input,setinput]= useState({title:"",description:"",priority:"",status:"",assigned_to:""})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
     const task = useSelector((state) =>state.task.tasks.find((u) => u.id === Number(id)))

     useEffect(()=>{
        if(task){
            setinput({
            title: task.title || "",
            description: task.description || "",
            priority: task.priority || "",
            status: task.status || "",
            assigned_to: task.assigned_to?.id || ""
            })
        }
     },[task])


    const handleUpdate = async(e)=>{
        e.preventDefault()
         try{
            const taskData = { ...input,   assigned_to: parseInt(input.assigned_to, 10) }
            const res = await editTask(id,taskData)
            console.log(res.data)
            dispatch(updateTask(res.data))
            navigate("/task")
        }catch(err){
         console.error("Update Task Error:", err.response?.data || err.message)    
        }
    }

  return (
    <>
    <Home/>
    <div>

      <form 
  onSubmit={handleUpdate} 
  className="max-w-2xl mx-auto bg-white  p-2 rounded-2xl shadow-2xl space-y-6"
>
  <h2 className="text-3xl font-bold text-center mb-6">Update Task</h2>

  <div>
    <label className="block text-sm font-semibold mb-2">Title</label>
    <input 
      type="text"
      placeholder="Title"
      name="title"
      value={input.title}
      onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
      className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none shadow"
    />
  </div>

  <div>
    <label className="block  font-semibold mb-2">Description</label>
    <textarea
      placeholder="Description"
      name="description"
      value={input.description}
      onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
      rows="5"
      className="w-full p-3 rounded-lg  border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none shadow"
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block  font-semibold mb-2">Priority</label>
      <input 
        type="text"
        placeholder="Priority"
        name="priority"
        value={input.priority}
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none shadow"
      />
    </div>
    <div>
      <label className="block font-semibold mb-2">Status</label>
      <input 
        type="text"
        placeholder="Status"
        name="status"
        value={input.status}
        onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
        className="w-full p-3 rounded-lg  border focus:ring-2 focus:ring-blue-500 focus:outline-none shadow"
      />
    </div>
  </div>
    
  
    <label className="block font-semibold mb-2">Assigned User ID</label>
    <input 
      type="number"
      placeholder="Assigned Id"
      name="assigned_to" 
      value={input.assigned_to}
      onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })}
      className=" p-3 rounded-lg  border  focus:ring-2 focus:ring-blue-500 focus:outline-none shadow"
    />
  

  <button 
    type="submit"
    className=" p-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 rounded-lg font-semibold shadow-lg ml-5"
    >
    Confirm
  </button>
</form>




    </div>
    </>
  )
}

export default UpdateTask