import React, { useEffect, useState } from 'react'
import { getUserByProfile } from '../api/Postapi'
import Home from './Home'

function Profile() {

    const [user,setuser] = useState(null)

    useEffect(()=>{
        const UserProfile = async()=>{
        try{
            const res = await getUserByProfile()
            setuser(res.data)
        }catch(err){
            console.error("Error fetching profile:", err)
        }
        }
        UserProfile()
    },[])
  return (
    <>
    <Home/>
    <div >
    <div className='justify-center text-center mt-10 bg-slate-100'>
        {user&&(
            <div className="space-y-3 text-gray-800">
            <p className="text-gray-600"><strong>Id: </strong>{user.id}</p>
            <p className="text-gray-600"><strong>Name: </strong>{user.name}</p>
            <p className="text-gray-600"><strong>Email: </strong>{user.email}</p>
            <p className="text-gray-600"><strong>Verified Email: </strong>{user.email_verified_at}</p>
            <p className="text-gray-600"><strong>Department: </strong>{user.department}</p>
            <p className="text-gray-600"><strong>Designation: </strong>{user.designatio}</p>
            <p className="text-gray-600"><strong>Contact: </strong>{user.phone}</p>
            <p className="text-gray-600"><strong>Address: </strong>{user.address}</p>
            <p className="text-gray-600"><strong>Role: </strong>{user.role}</p>
            <p className={user.is_active ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}><strong>Status: </strong>{user.is_active?"Yes":"No"}</p>
            <p className= "text-gray-600"><strong>Created: </strong>{user.created_at}</p>
            <p className="text-gray-600"><strong>Updated: </strong>{user.updated_at}</p>
            </div>
          

        )}

    </div>
    </div>
    </>
  )
}

export default Profile