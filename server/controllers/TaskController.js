// import TaskModel from "../db/models/TaskModel.js";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const createTask = async (req, res) => {
    try {
        const task = await prisma.taskModel.create({
            data: {
                title: req.body.title,
                timetask: req.body.timetask,
                datetask: req.body.datetask,
            },
        });
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось создать задачу',
        });
    }
};



export const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma.taskModel.findMany();

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Задачи не найдены.',
        });
    }
};


export const deleteTask = async(req, res) => {
    try {
        
        const taskId = req.body.id
        await prisma.taskModel.delete({ where: { id: taskId } });
        res.json(taskId);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : 'Не удалось удалить задачу.'
        })
    }
}
