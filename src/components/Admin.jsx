import React from 'react'
import Home from './Home'
import UsersList from './UsersList'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()

  const handleCreateUser = () => {
  navigate("/admin/new-user")
  }

  return (
    <>
    <Home />
    <div className="bg-gray-100 min-h-screen p-6">
   
    <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-center flex-1">Admin Dashboard</h2>
          <button onClick={handleCreateUser}
           className="ml-4 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow" > Create User
            </button>
          </div>
    <div className="bg-white shadow rounded p-4">
     <UsersList />
   </div>
</div> 
  </>
  )
}

export default Admin
