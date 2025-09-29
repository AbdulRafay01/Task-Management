import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { getUserByProfile, logoutPost } from '../api/Postapi'

function Home() {
  const navigate = useNavigate()

  const [user,setuser] = useState(null)

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])


  const logout = async () => {
    try {
      await logoutPost()
      Cookies.remove("token")
      Cookies.remove("refreshToken")
      navigate('/')
    } catch (err) {
      console.error("Logout Error:", err.response?.data || err.message)
    }
  }
  
   const fetchCurrentUser = async()=>{
    try{
    const res = await getUserByProfile()
    setuser(res.data)
    }catch(err){
      console.error("Error fetching profile:", err)
    } 
   }

   useEffect(()=>{
    fetchCurrentUser()
   },[])

   const goToRoleHome = ()=>{
    if (!user) return
    const role = user.role?.toLowerCase()
    if (role === "admin") {
      navigate("/admin")
    } else if (role === "manager") {
      navigate("/manager")
    } else if (role === "employee") {
      navigate("/employee")
    } else {
      navigate("/")
    }
   }
  return (
    <div>

      <ul className="flex gap-6 p-4 bg-gray-600">

         <li>
          {user&&(
          <p className=" font-bold"> { user.name} </p>
          )}
        </li>
        
         <li >
          <button
            onClick={goToRoleHome}
            className="text-white font-bold  hover:text-red-800" >
           Home
          </button>
          </li>

          <li >
            {(user?.role==="Admin"||user?.role==="Manager")&&(           
          <button
            onClick={()=>navigate('/task')}
            className="text-white font-bold  hover:text-red-800" >
           Task
          </button>
           )}
          </li>

         <li >
          <button
             onClick={()=>navigate("/profile")}
            className="text-white font-bold  hover:text-red-800" >
            Profile
          </button>
          </li>

            <li >
          <button onClick={logout}
            className="text-red-700 font-bold hover:text-red-800" >
            Logout
          </button>
        </li>

      </ul>

    </div>
  )
}

export default Home
