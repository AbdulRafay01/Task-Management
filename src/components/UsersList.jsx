import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost, getUserByEmail, getUserById } from '../api/Postapi'
import { account, removeaccount } from '../features/todo/TodoSlice'
import { useNavigate } from 'react-router-dom'
import UserModel from './UserModel'



function UsersList() {
  const todos = useSelector(state => state.todo.signup)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[selectedUser,setSelectedUser] = useState(null)
  const[isModalOpen,setIsModalOpen] = useState(false)

  const[email,setemail] = useState('')
  const [person, setperson] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
    try {
        const res = await getPost()
        console.log("Users API Response:", res.data)

        dispatch(account(res.data.users || res.data || []))
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message)
    }
  }
  fetchData()
}, [dispatch])

const remove = async (id) => {
  try {
    await deletePost(id)
    dispatch(removeaccount(id))
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message)
    alert("Delete failed")
  }
}

const handleUpdate = (id) => {
  navigate(`/admin/update-user/${id}`)
}

const  handleView = async(id)=>{
try{
  const res= await getUserById(id)
  setSelectedUser(res.data.user || res.data)
  setIsModalOpen(true)
}catch(err){
  console.error("Error fetching user:", err.response?.data || err.message)
  alert("Failed to fetch user details")
}

}

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handleSearch = async()=>{
    try{
    const res = await getUserByEmail(email)
    setperson(res.data.user || res.data)
    }catch(err){
      console.error("Error fetching user by email:", err.response?.data || err.message)
      alert("User not found")
    }
  }


  return (
    <div >
      <div className="flex items-center justify-center">
      <input type='email'
      placeholder='Enter Email'
      value={email}
      onChange={(e)=>setemail(e.target.value)}
      className="border px-2 py-1 "></input>

      <button className="bg-blue-700 text-white px-4 py-2 ml-2 rounded"
      onClick={handleSearch}>Search</button>
      </div>

      {person&&(
        <div className="flex items-center justify-center  ">
        <div className="bg-blue-200 p-6 rounded-lg max-w-md w-full shadow-lg">
           <p>Id: {person.id}</p>
          <h3 className="font-bold">Name: {person.name}</h3>
          <p>Email: {person.email}</p>
          <p>Email Verified: {person.email_verified_at}</p>
          <p>Department: {person.department}</p>
          <p>Designation: {person.designation}</p>
          <p>Contact: {person.phone}</p>
          <p>Address: {person.address}</p>
          <p>Role: {person.ole}</p>
          <p>Status: {person.is_active?"Yes":"No"}</p>
          <p>Created At: {person.created_at}</p>
         <p>Updated At: {person.updated_at}</p>
        </div>
        </div>
      )}

 
      <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
    <table className="min-w-full border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border px-4 py-2">ID</th>
      <th className="border px-4 py-2">Name</th>
      <th className="border px-4 py-2">Email</th>
      <th className="border px-4 py-2">Department</th>
      <th className="border px-4 py-2">Designation</th>
      <th className="border px-4 py-2">Contact</th>
      <th className="border px-4 py-2">Address</th>
      <th className="border px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {todos.map(todo => (
      <tr key={todo.id}  className="hover:bg-gray-50"  >  
      
         <td className="border ">{todo.id}</td>
        <td className="border ">{todo.name}</td>
        <td className="border ">{todo.email}</td>
        <td className="border  ">{todo.department}</td>
        <td className="border  ">{todo.designation}</td>
        <td className="border  ">{todo.phone}</td>
        <td className="border  ">{todo.address}</td>
        <td className="border  ">

        <button className="px-2 py-1 rounded  hover:text-green-500 text-green-700"
        onClick={() => handleView(todo.id)}>View</button>

        <button className="px-2 py-1 rounded  hover:text-red-500 text-blue-700"
        onClick={() => handleUpdate(todo.id)}>Update</button>

        <button className="px-2 py-1 rounded hover:text-red-500 text-red-700 ml-2"
        onClick={()=>remove(todo.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
   
   <UserModel user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />

    </div>
    </div>
  )

   
  
}

export default UsersList
