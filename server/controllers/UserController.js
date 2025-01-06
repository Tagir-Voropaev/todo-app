import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const createUser = async (req, res) => {
    try {
        const user = await prisma.ModelUser.create({
            data: {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
            }
        });
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось создать пользователя",
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const user = await prisma.userModel.findMany();
        if (user.lenght === 0) {
            res.status(404).json({
                message: 'Пользователь не найден',
                user
            });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Ошибка соединения',
        });
    }
};

export const deleteUser = async (req, res) => {
    try {

        const userId = req.body.id
        await prisma.userModel.delete({ where: { id: userId } });
        res.json(userId);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить аккаунт.'
        })
    }
}


