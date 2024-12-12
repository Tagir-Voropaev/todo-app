import express from 'express'
import sequelize from './db/database.js'
import cors from 'cors'
import validationError from './utils/validationError.js';
import { scriptCreateValidation, tabCreateValidation, taskCreateValidation } from './validations/validations.js';
import { createTask, getAllTasks, deleteTask, editTask } from './controllers/TaskController.js';
import { createScript, createSubTab, createTab, deleteScript, deleteSubTab, deleteTab, getAllScripts, getAllTabs, getScripts} from './controllers/ScriptController.js';
const PORT = 5000;

//Проверка подключения бд
try {
    //Dev-mode: пересоздание таблицы при запуске сервера
    // (async () => { await sequelize.sync({ force: true }) })() 
    //Dev-mode: Проверка наличия таблицы при запуске сервера
    (async () => { await sequelize.sync({}) })()
    await sequelize.authenticate()
    console.log('DB is OK')
} catch (e) {
    console.log('DB is BAD ', e)
}

//Инициализация сервера
const app = express();

//Формат чтения
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send("Hello") })




// ======================= TASKS ========================
app.get('/tasks', getAllTasks)
app.post('/tasks', taskCreateValidation, validationError, createTask)
app.delete('/tasks', deleteTask)
app.patch('/tasks', taskCreateValidation, validationError, editTask)

// ======================= SCRIPTS ========================
app.get('/scripts/tabs', getAllTabs)
app.post('/scripts/tabs', tabCreateValidation, validationError,  createTab);
app.delete('/scripts/tabs', deleteTab)

app.post('/scripts/subtabs', tabCreateValidation, validationError,  createSubTab);
app.delete('/scripts/subtabs', deleteSubTab)

app.get('/scripts/subtab/', getAllScripts)
app.get('/scripts/subtab/:id', getScripts)
app.post('/scripts/subtab/:id', tabCreateValidation, validationError, createScript);
app.delete('/scripts/subtab/:id', deleteScript)







//Запуск сервера
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server OK ${PORT}`)

})
