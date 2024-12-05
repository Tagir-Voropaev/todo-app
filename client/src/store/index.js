import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice'
import { createTaskReducer } from './createTaskSlice'

const index = configureStore({
    reducer: {
        tasks: tasksSlice,
        createTask: createTaskReducer,
    }
})

export default index