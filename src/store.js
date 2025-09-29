import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./features/todo/TodoSlice"
import TaskReducer from "./features/todo/TaskSlice"


export const store = configureStore({
    reducer:{
     todo : TodoReducer,
     task: TaskReducer,
    }
})