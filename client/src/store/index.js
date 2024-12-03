import {configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from './tasksSlice'
import { windowsReducer } from './windowsSlice'
const index = configureStore({
    reducer: {
        tasks: tasksReducer,
        windows: windowsReducer
    }
})

export default index