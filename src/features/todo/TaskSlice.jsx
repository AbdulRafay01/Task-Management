import { createSlice } from "@reduxjs/toolkit";

const initialState={
tasks:[],
}

export const TaskSlice = createSlice({
      name:"task",
      initialState,
      reducers:{
 
      setTask: (state, action) => {  state.tasks = Array.isArray(action.payload) ? action.payload : [action.payload]
    },
          
    
    addTask: (state, action) => {
      const newAccounts = Array.isArray(action.payload)  ? action.payload : [action.payload];
      state.tasks.push(...newAccounts);
    },

    removeTask:(state,action)=>{
      const userId = action.payload
      state.tasks = state.tasks.filter(a => a.id !== userId )
    },

     updateTask:(state,action)=>{
    state.tasks = state.tasks.map(a=> a.id == action.payload.id?{...a,...action.payload}:a)
  }
     
    
  }
   
  
})

export const {setTask, addTask,removeTask,updateTask}  = TaskSlice.actions
export default TaskSlice.reducer