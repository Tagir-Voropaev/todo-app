import express from 'express'
import sequelize from './db/database.js'
import checkAuth from './utils/checkAuth.js';
import validationError from './utils/validationError.js';
import { authValidation, registerValidation, taskCreateValidation } from './validations/validations.js';
import { authorization, registration, getMe } from './controllers/UserController.js';
import { createTask, getAllTasks, deleteTask, editTask } from './controllers/TaskController.js';
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


app.get('/', (req, res) => { res.send("Hello") })


// ======================= AUTH ========================
app.get('/auth/login', (req, res) => { res.send("auth/login") })
app.get('/auth/register', (req, res) => { res.send("auth/register") })
app.get('/auth/me', checkAuth, getMe)

app.post('/auth/login', authValidation, validationError, authorization)
app.post('/auth/register', registerValidation, validationError, registration)

// ======================= TASKS ========================
app.get('/tasks', checkAuth, getAllTasks)
app.post('/tasks', checkAuth, taskCreateValidation, validationError, createTask)
app.delete('/tasks', checkAuth, deleteTask)
app.patch('/tasks', checkAuth, taskCreateValidation, validationError, editTask)


//Запуск сервера
app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`Server OK ${PORT}`)

})
