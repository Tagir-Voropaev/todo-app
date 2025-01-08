import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import validationError from './utils/validationError.js';
import { taskCreateValidation, } from './validations/validations.js';
import { createTask, getAllTasks, deleteTask } from './controllers/TaskController.js';
import { registration, getAllUsers, deleteUser, login, logout } from './controllers/UserController.js';
import cookieParser from 'cookie-parser';



const PORT = 5000; // В production используем случайный порт

//Проверка подключения бд
const prisma = new PrismaClient();

try {
    // Установите соединение с базой данных
    await prisma.$connect();
    console.log('Подключение к базе данных успешно!');
} catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
}



//Инициализация сервера
const app = express();

//Формат чтения
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// ======================= User ========================
app.post('/registration', registration)
app.post('/login', login)
app.post('/logout', logout)
// app.get('/activate/:link', createUser)
// app.get('/refresh', createUser)
app.get('/users', getAllUsers)
app.delete('/users', deleteUser)


// ======================= TASKS ========================
app.get('/tasks', getAllTasks)
app.post('/tasks', taskCreateValidation, validationError, createTask)
app.delete('/tasks', deleteTask)




//Запуск сервера
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server OK ${PORT}`)
})

