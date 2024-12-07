import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice'
import { createTaskReducer } from './createTaskSlice'
import searchSlice from './searchSlice'
const index = configureStore({
    reducer: {
        tasks: tasksSlice,
        createTask: createTaskReducer,
        search: searchSlice,
    }
})

export default index