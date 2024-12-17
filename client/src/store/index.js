import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasks/tasksSlice'
import createTaskSlice from './tasks/createTaskSlice'
import searchTaskSlice from './tasks/searchTaskSlice'
import navscriptSlice from './scripts/scriptNavSlice'
import createTabsSlice from './scripts/createTabsSlice'
import createSubTabsSlice from './scripts/createSubTabsSlice'
import scriptsSlice from './scripts/scriptSlice'
import createScriptSlice from './scripts/createScriptSlice'
import allScriptsSlice from './scripts/allScriptsSlice'
import searchScriptSlice from './scripts/searchScriptSlice'
import allSchoolsSlice from './timetable/allSchoolsSlice'
import allGroupsSlice from './timetable/allGroupsSlice'
import timetableNavSlice from './timetable/timetableNavSlice'
import createSchoolSlice from './timetable/createSchoolSlice'
import createGroupSlice from './timetable/createGroupSlice'
import allLessonsSlice from './timetable/allLessonsSlice'
import createLessonSlice from './timetable/createLessonSlice'


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
        allschools: allSchoolsSlice,
        allgroups: allGroupsSlice,
        timetableNav: timetableNavSlice,
        createSchool: createSchoolSlice,
        createGroup: createGroupSlice,
        allLessons: allLessonsSlice,
        createLesson: createLessonSlice,
    }
})

export default index