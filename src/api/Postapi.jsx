import axios from "axios";
import Cookies from "js-cookie";  

const api = axios.create({
    baseURL:"https://hrmis-api.devfamz.com/api",

        
})

//Add token
api.interceptors.request.use((config) => {                 //Ye Axios ko bolta hai: “Jab bhi koi request server ko bhejna ho, is function ko pehle chalao.”
  const token = Cookies.get("token")                       //Hum browser ke cookies me token check kar rahe hain. 
    console.log("Token is", token)                               
  if(token){
    config.headers.Authorization = `Bearer ${token}`       //Agar token hai, hum request ke headers me Authorization add kar dete hain.
  }
  return config                                            //Ye modified request wapas Axios ko bhejta hai taake wo server ko ja sake.
}) 

// Response interceptor → agar 401 mila to refresh token use karo
api.interceptors.response.use((response) => response,  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = Cookies.get("refreshToken")
        if (!refreshToken) {
          throw new Error("No refresh token found")
        }

        // refresh_token se naya access_token lo
        const refreshRes = await api.post("/auth/refresh", {
          refresh_token: refreshToken,
        })

        const newToken = refreshRes.data.access_token
        if (newToken) {
          Cookies.set("token", newToken, { expires: 1 }) // 1 din
          error.config.headers.Authorization = `Bearer ${newToken}`
          // ❗️ failed request dobara bhejo
          return api.request(error.config)
        }
      } catch (refreshErr) {
        // Refresh bhi fail → logout
        Cookies.remove("token")
        Cookies.remove("refreshToken")
        window.location.href = "/"
      }
    }
    return Promise.reject(error)
  }
)

//Authentication
export const signupPost =(register)=>{
    return api.post("/auth/register",register)
}
export const loginPost =(login)=>{
  return api.post("/auth/login",login)
}
export const logoutPost =()=>{
  return api.post("/auth/logout")
}
export const refreshPost =()=>{
  return api.post("/auth/refresh")
}


//Users

export const getPost = ()=>{
  return api.get("/users")   
}
export const createPost =(data)=>{
  return api.post("/users",data)
}
export const getUserById= (userId)=>{
  return api.get(`/users/${userId}`)
}
export const updatePost= (userid,data)=>{
  return api.put(`/users/${userid}`,data)
}
export const deletePost =(userId)=>{
  return api.delete(`/users/${userId}`)
}
export const getUserByEmail = (email)=>{
    return api.get(`/users/email/${email}`)
}
export const getUserByProfile = ()=>{
  return api.get("/users/profile")
}


//Task Management

export const getTask = ()=>{
  return api.get("/tasks")
}
export const createTask = (data)=>{
  return api.post("/tasks",data)
}
export const specificTask = (id)=>{
  return api.get(`/tasks/${id}`)
}
export const editTask = (id,data)=>{
  return api.put(`/tasks/${id}`,data)
}
export const deleteTask = (id)=>{
  return api.delete(`/tasks/${id}`)
}


