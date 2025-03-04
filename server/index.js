import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { registration, login, logout, checkAuth, deleteUser, getUserInfo, updateUserRole } from './controllers/UserController.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { createTask, getAllTasks } from './controllers/TaskController.js';


dotenv.config();

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

const corsOptions = {
    origin: 'http://localhost:3000', // Укажите домен вашего фронтенда
    credentials: true, // Разрешить отправку учетных данных (куки, токены)
};

//Формат чтения
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));


// ======================= User ========================
app.post('/api/auth/registration', registration)
app.post('/api/auth/login', login)
app.post('/api/auth/logout', logout)
app.get('/api/auth/check', checkAuth)
app.delete('/api/auth/delete', deleteUser)
app.get('/api/auth/getuserinfo', getUserInfo)
app.post('/api/auth/updateuserrole', updateUserRole)
// app.get('/activate/:link', createUser)
// app.get('/refresh', createUser)


// ======================= TASKS ========================
app.post('/api/tasks/create', createTask)
app.get('/api/tasks/getall', getAllTasks)




//Запуск сервера
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server OK ${PORT}`)
})

