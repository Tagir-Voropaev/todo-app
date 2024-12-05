import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from './tasksSlice'
import { createTaskReducer } from './createTaskSlice'
const index = configureStore({
    reducer: {
        tasks: tasksReducer,
        createTask: createTaskReducer,
    }
})

export default index