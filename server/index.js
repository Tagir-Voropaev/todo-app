import express from 'express'
import sequelize from './db/database.js'
import cors from 'cors'
import validationError from './utils/validationError.js';
import {
    scriptCreateValidation,
    tabCreateValidation,
    taskCreateValidation,
    schoolCreateValidation,
} from './validations/validations.js';
import { createTask, getAllTasks, deleteTask, editTask } from './controllers/TaskController.js';
import { createScript, createSubTab, createTab, deleteScript, deleteSubTab, deleteTab, getAllScripts, getAllTabs, getScripts } from './controllers/ScriptController.js';
import { getAllSchools, getAllGroups, getAllLessons, getSchoolById, getGroupById } from './controllers/SchoolController.js';
import { addSchool, addGroup, addLesson, deleteSchool, deleteGroup, deleteLesson } from './controllers/SchoolController.js';



const PORT = 5000; // В production используем случайный порт

// //Проверка подключения бд
// try {
//     // Dev-mode: пересоздание таблицы при запуске сервера
//     // (async () => { await sequelize.sync({ force: true }) })() 
//     //Dev-mode: Проверка наличия таблицы при запуске сервера
//     (async () => { await sequelize.sync({}) })()
//     await sequelize.authenticate()
//     console.log('DB is OK')
// } catch (e) {
//     console.log('DB is BAD ', e)
// }



//Инициализация сервера
const app = express();

//Формат чтения
app.use(express.json());
app.use(cors());



// // ======================= TASKS ========================
// app.get('/tasks', getAllTasks)
// app.post('/tasks', taskCreateValidation, validationError, createTask)
// app.delete('/tasks', deleteTask)
// app.patch('/tasks', taskCreateValidation, validationError, editTask)

// // ======================= SCRIPTS ========================
// app.get('/scripts/tabs', getAllTabs)
// app.post('/scripts/tabs', tabCreateValidation, validationError, createTab);
// app.delete('/scripts/tabs', deleteTab)

// app.post('/scripts/subtabs', tabCreateValidation, validationError, createSubTab);
// app.delete('/scripts/subtabs', deleteSubTab)

// app.get('/scripts/subtab/', getAllScripts)
// app.get('/scripts/subtab/:id', getScripts)
// app.post('/scripts/subtab/:id', scriptCreateValidation, validationError, createScript);
// app.delete('/scripts/subtab/:id', deleteScript)

// // ======================= SCHOOL ========================
// app.get('/schools', getAllSchools)
// app.get('/schools/:id', getSchoolById);
// app.get('/groups', getAllGroups)
// app.get('/groups/:id', getGroupById)
// app.get('/lessons', getAllLessons)
// app.post('/schools', schoolCreateValidation, validationError, addSchool)
// app.post('/groups', schoolCreateValidation, validationError, addGroup)
// app.post('/lessons', validationError, addLesson)
// app.delete('/schools', deleteSchool)
// app.delete('/groups', deleteGroup)
// app.delete('/lessons', deleteLesson)



//Запуск сервера
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server OK ${PORT}`)
})

