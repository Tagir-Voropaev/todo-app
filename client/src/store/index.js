import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice'
import createTaskSlice from './createTaskSlice'
import searchTaskSlice from './searchTaskSlice'
import navscriptSlice from './scriptNavSlice'
import createTabsSlice from './createTabsSlice'
import createSubTabsSlice from './createSubTabsSlice'
import scriptsSlice from './scriptSlice'
import createScriptSlice from './createScriptSlice'
import allScriptsSlice from './allScriptsSlice'
import searchScriptSlice from './searchScriptSlice'
import warningSlice from './warningSlice'
const index = configureStore({
    reducer: {
        tasks: tasksSlice,
        createTask: createTaskSlice,
        searchTask: searchTaskSlice,
        searchScripts: searchScriptSlice,
        navscript: navscriptSlice,
        createTabs: createTabsSlice,
        createSubTabs: createSubTabsSlice,
        scripts: scriptsSlice,
        createScripts: createScriptSlice,
        allscripts: allScriptsSlice,
        warning: warningSlice,
    }
})

export default index