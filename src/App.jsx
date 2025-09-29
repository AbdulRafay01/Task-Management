import { store } from './store.js'   
import { Provider } from 'react-redux'
import Signup from './components/Signup.jsx'
import UsersList from './components/UsersList.jsx'
import Login from './components/Login.jsx'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Admin from './components/Admin.jsx'
import Manager from './components/Manager.jsx'
import Employee from './components/Employee.jsx'
import AdminNewUser from './components/AdminNewUser.jsx'
import UpdateUser from './components/UpdateUser.jsx'
import Profile from './components/Profile.jsx'
import CreateTask from './components/task/CreateTask.jsx'
import Tasklist from './components/task/Tasklist.jsx'
import UpdateTask from './components/task/UpdateTask.jsx'

function App() {
 

  return (
    <Provider store={store}>
     <Routes>
      <Route path="/signup" element={ <Signup/>}/>
      <Route path="/" element={ <Login/>}/>
      <Route path="/admin" element={ <Admin/>}/>
      <Route path="/admin/new-user" element={ <AdminNewUser/>}/>
      <Route path="/admin/update-user/:id" element={<UpdateUser/>} />


      <Route path="/manager" element={ <Manager/>}/>
      <Route path="/employee" element={ <Employee/>}/>

      <Route path="/profile" element={<Profile/>}/>
      <Route path="/home" element={ <Home/>}/>

      <Route path="/userlist" element={ <UsersList/>}/>

 
     <Route path='/task' element={<Tasklist/>}/>
      <Route path="/createtask" element={ <CreateTask/>}/>
      <Route path='/taskupdate/:id' element={<UpdateTask/>}/>

    </Routes>
    </Provider>
    
  )
}

export default App
