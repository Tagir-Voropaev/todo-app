import { PrismaClient } from '@prisma/client'
import { createUser } from "../services/UserService.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();




export const registration = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userData = await createUser(email, name, password);
        //обработка ошибки при создании пользователя
        if (!userData) return res.status(400).json({ message: 'Не удалось создать пользователя' });

        return res.json(userData);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось создать пользователя",
        })
    }
}

export const login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const userData = await prisma.userModel.findFirst({ where: { OR: [{ email: login }, { name: login }] } });

        console.log(userData, req.body)

        if (!userData) return res.status(404).json({ message: 'Неверный логин или пароль' });
        
        //проверка пароля
        const validPassword = await bcrypt.compare(password, userData.password);
        if (!validPassword) return res.status(400).json({ message: 'Неверный логин или пароль' });

        const token = jwt.sign(
            { id: userData.id, email: userData.email }, // Данные, которые будут храниться в токене
            process.env.JWT_SECRET, // Секретный ключ
            { expiresIn: '1h' } // Время жизни токена (например, 1 час)
        );
        
        res.cookie('token', token, {
            httpOnly: true, // Куки недоступны через JavaScript
            secure: true,   // Куки передаются только по HTTPS
            maxAge: 1000 * 60 * 60 * 24 * 7, // Срок жизни куки (например, 7 дней)
            sameSite: 'strict' // Защита от CSRF-атак
          });
        return res.json({
            user: userData,
            token, // Отправляем токен клиенту
            success: true,
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось авторизоваться",
            success: false,
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken');
        await prisma.tokenModel.deleteMany({ where: { userId: req.body.id } });
        return res.json({ message: 'Вы вышли из системы' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось выйти",
        })
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.userModel.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ошибка соединения',
        });
    }
};

export const deleteUser = async (req, res) => {
    try {

        const userid = req.body.id

        await prisma.userModel.delete({ where: { id: userid } });
        res.json(userid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить аккаунт.'
        })
    }
}


