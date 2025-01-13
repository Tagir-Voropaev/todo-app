import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import { saveToken, generateToken } from './TokenService.js'
const prisma = new PrismaClient();

export const createUser = async (email, name, password) => {
    try {

        // Проверка наличия пользователя с таким же email
        const users = await prisma.userModel.findMany({ where: { OR: [{ email: email }, { name: name }] } });
        // Если пользователь с таким email/именем уже существует
        if (users.length > 0) {
            throw new Error('Email или имя пользователя уже заняты.')  // Выбрасываем исключение с сообщением об ошибке)
        }

        // хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 5);
        // Выдаем ссылку на подтверждение регистрации
        // Создание нового пользователя
        const user = await prisma.userModel.create({
            data: {
                name: name,
                password: hashedPassword,
                email: email,
            }
        });

        // Отправка email с подтверждением регистрации
        const tokens = generateToken({ id: user.id, email: user.email, name: user.name });
        await saveToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        };
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = async (login, password) => {
    try {
        const user = await prisma.userModel.findFirst({ where: { OR: [{ email: login }, { name: login }] } });
        if (!user) {
            return null
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return null
        }


        const tokens = generateToken({ id: user.id, email: user.email, name: user.name });
        await saveToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
        };
    } catch (error) {
        console.error(error);
    }
};