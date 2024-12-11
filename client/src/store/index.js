import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice'
import createTaskSlice from './createTaskSlice'
import searchSlice from './searchSlice'
import navscriptSlice from './scriptNavSlice'
import createTabsSlice from './createTabsSlice'
import createSubTabsSlice from './createSubTabsSlice'

const index = configureStore({
    reducer: {
        tasks: tasksSlice,
        createTask: createTaskSlice,
        search: searchSlice,
        navscript: navscriptSlice,
        createTabs: createTabsSlice,
        createSubTabs: createSubTabsSlice,
    }
})

export default index