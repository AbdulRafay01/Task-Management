import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getTask, specificTask } from '../../api/Postapi'
import { removeTask, setTask } from '../../features/todo/TaskSlice'
import Home from '../Home'
import { useNavigate } from 'react-router-dom'

function Tasklist() {
    const tasks = useSelector((state)=>state.task.tasks)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [pid,setid] = useState({ input: "", data: null })


    useEffect(()=>{

        const fetchTask = async()=>{
            try{
            const res = await getTask()
            console.log("Task is :", res.data)
             dispatch(setTask(res.data))
            }catch(err){
                console.log("Fetch Error:", err.response?.data || err.message)
            }
        }
        fetchTask()
    },[dispatch])


    const delTask =async(id)=>{
      try{
      const res = await deleteTask(id)
      dispatch(removeTask(res.data))
      }catch(err){
       console.log("Delete Error:", err.response?.data || err.message)
      }
    }

  const editTask = (id)=>{
  navigate(`/taskupdate/${id}`)
}

 const handleid = async () => {
  try {
    const res = await specificTask(pid.input)
    console.log("Search Result:", res.data)
    setid({ ...pid, data: res.data })   
  } catch (err) {
    console.error("Error fetching task by id:", err.response?.data || err.message)
  }
}


   
  return (
    
    <div>
      <>
      <Home/>

      
         
     
      <button className='bg-blue-700  hover:bg-blue-800 p-2  text-white font-semibold rounded float-right  mr-2'
       onClick={()=>navigate("/createtask")}>CreateTask</button>


    <div className="flex items-center justify-center">
  <input 
    type="number"
    placeholder="Enter id"
    value={pid.input}
    onChange={(e) => setid({ ...pid, input: e.target.value })}
    className="border px-2 py-1"
  />

  <button 
    className="bg-blue-700 text-white px-4 py-2 ml-2 rounded"
    onClick={handleid}
  >
    Search
  </button>
</div>

    {pid && (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100 w-80 shadow">
    <p><strong>Id:</strong> {pid.id}</p>
    <p><strong>Title:</strong> {pid.title}</p>
    <p><strong>Status:</strong> {pid.status}</p>
    <p><strong>Assigned To:</strong> {pid.assigned_to_user?.name}</p>
    <p><strong>Email:</strong> {pid.assigned_to_user?.email}</p>
    </div>
    )}

    
     <div className="m-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
  {tasks.map((task) => (
    <div key={task.id}  className="border p-4 rounded-lg shadow bg-white"  >
      
       <button className='bg-blue-700 hover:bg-blue-800  p-1 mt-2 text-white font-semibold rounded float-right'
      onClick={()=>editTask(task.id)}>Update</button><br/>

      <h3 className="mt-2 text-sm"><strong>Id:</strong> {task.id}</h3>
      <h2 className='font-semibold mt-2'>{task.title}</h2>

    <p className="whitespace-pre-line mt-1">
    <strong>Description:</strong> {task.description}
    </p>

        <p className=" mt-1"><strong>Priority:</strong>   {task.priority}</p>
        <p className=" mt-1"><strong>Status:</strong>     {task.status}</p>

<div className="mt-2 text-sm">
        <p><strong>Id:</strong> {task.assigned_to.id} </p>
        <p><strong>Assigned To:</strong> {task.assigned_to.name} </p>
        <p><strong>Email:</strong> {task.assigned_to.email}</p>
        <p><strong>Designation:</strong> {task.assigned_to.designation}</p>
        <p><strong>Department:</strong> {task.assigned_to.department}</p>
        <p><strong>Role:</strong> {task.assigned_to.role}</p>
        <p><strong>Phone:</strong> {task.assigned_to.phone}</p>
             
      </div>

      <div className=" text-xs text-gray-500 border-t pt-2">
      <p>Created At: {new Date(task.created_at).toISOString()}</p>
      <p>Updated At: {new Date(task.updated_at).toISOString()}</p>
      </div>

      <button className='bg-red-700 hover:bg-red-800 p-1 text-white font-semibold rounded float-right relative'
      onClick={()=>delTask(task.id)}>Delete</button>
    </div>
  ))}
</div>

    </>
   </div>
  )
}

export default Tasklist