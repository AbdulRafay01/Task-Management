import { createSlice } from "@reduxjs/toolkit";

const initialState={
signup:[],
}

export const TodoSlice = createSlice({
      name:"todo",
      initialState,
      reducers:{
    //    account:(state,action)=>{
    //     state.signup = action.payload
    //    },
      account: (state, action) => {  state.signup = Array.isArray(action.payload) ? action.payload : [action.payload]
    },
          
    //    addaccount:(state,action)=>{
    //     state.signup.push(action.payload)
    //    },

    addaccount: (state, action) => {
      const newAccounts = Array.isArray(action.payload)  ? action.payload : [action.payload];
      state.signup.push(...newAccounts);
    },

    removeaccount:(state,action)=>{
      const userId = action.payload
      state.signup = state.signup.filter(a => a.id !== userId )
    },

     updateaccount:(state,action)=>{
    state.signup = state.signup.map(a=> a.id == action.payload.id?{...a,...action.payload}:a)
  }
     
    
  }
   
  
})

export const {account, addaccount,removeaccount,updateaccount}  = TodoSlice.actions
export default TodoSlice.reducer