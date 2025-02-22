import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import { registration, getAllUsers, deleteUser, login, logout } from './controllers/UserController.js';
import dotenv from 'dotenv';

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

//Формат чтения
app.use(express.json());
app.use(cors());


// ======================= User ========================
app.post('/api/registration', registration)
app.post('/api/login', login)
app.post('/api/logout', logout)
// app.get('/activate/:link', createUser)
// app.get('/refresh', createUser)
app.get('/api/users', getAllUsers)
app.delete('/api/users', deleteUser)


// ======================= TASKS ========================





//Запуск сервера
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server OK ${PORT}`)
})

