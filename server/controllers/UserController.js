import { PrismaClient } from '@prisma/client'
import { createUser, loginUser } from "../services/UserService.js";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();




export const registration = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userData = await createUser(email, name, password);
        //обработка ошибки при создании пользователя
        if (!userData) return res.status(400).json({ message: 'Не удалось создать пользователя' });

        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
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
        console.log("ЗАПРОС")
        const { login, password } = req.body;
        const user = await loginUser(login, password);
        if(!user) {
            return res.status(404).json({ message: 'Неверный логин или пароль' });
        }
        
        
        res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).json({
            userData: user,
            message: 'Авторизация успешна'
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось авторизоваться",
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
        const users = await prisma.userModel.findMany({
            include:
            {
                token: true,
            }

        });
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


