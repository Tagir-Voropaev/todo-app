import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export const createTask = async (req, res) => {
    try {
        const { title, description} = req.body;
        const task = await prisma.mainTaskModel.create({
            data: {
                title: title,
                description: description
            },
        });
        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании задачи' });
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.mainTaskModel.findMany();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении списка задач' });
    }
}
