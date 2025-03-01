import { PrismaClient } from '@prisma/client'
import { createUser } from "../services/UserService.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();




export const registration = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // Проверка, существует ли пользователь с таким email или именем
        const existingUser = await prisma.userModel.findFirst({
            where: { OR: [{ email }, { name }] },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email или именем уже существует' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя
        const user = await prisma.userModel.create({
            data: { email, name, password: hashedPassword },
        });

        // Создание JWT токена
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Установка токена в куки
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 дней
            sameSite: 'strict',
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
};

export const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        // Ищем пользователя по email или имени
        const user = await prisma.UserModel.findFirst({
            where: {
                OR: [
                    { email: login },
                    { name: login },
                ],
            },
        });

        // Если пользователь не найден
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        // Создаем JWT токен
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Возвращаем данные пользователя и токен
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
            isAuth: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при авторизации' });
    }
};

export const checkAuth = async (req, res) => {
    try {
        // Получаем токен из заголовков
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

        // Если токен отсутствует
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        // Проверяем токен
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ищем пользователя в базе данных
        const user = await prisma.userModel.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        // Если пользователь не найден
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Возвращаем данные пользователя
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token, // Возвращаем токен для обновления срока действия
            isAuth: true,
        });
    } catch (error) {
        console.error(error);

        // Если токен недействителен
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Недействительный токен' });
        }

        // Обработка других ошибок
        res.status(500).json({ message: 'Ошибка при проверке авторизации' });
    }
};
export const logout = async (req, res) => {
    try {
        // Очищаем куки с токеном
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        // Возвращаем успешный ответ
        res.json({ message: 'Успешный выход из аккаунта' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при выходе из аккаунта' });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.userModel.delete({ where: { id } });
        res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при удалении пользователя' });
    }
};