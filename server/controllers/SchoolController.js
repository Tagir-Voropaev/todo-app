// import { SchoolModel, GroupModel, LessonModel } from '../db/models/TimetableModel.js'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const getAllSchools = async (req, res) => {
    const schools = await prisma.schoolModel.findMany()
    res.json(schools)
}

export const getSchoolById = async (req, res) => {
    try {
        const { id } = req.params;
        // Проверяем, что id является числом
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID школы должен быть числом' });
        }
        // Ищем школу по id
        const school = await prisma.schoolModel.findMany({
            where: { id: Number(id) },
            include: {
                groups: true,
            },
        });
        // Если школа не найдена
        if (!school) {
            return res.status(404).json({ message: 'Школа не найдена' });
        }
        res.json(school);
    } catch (error) {
        console.error('Ошибка при получении школы:', error);
        res.status(500).json({ message: 'Ошибка при получении школы' });
    }
};

export const getAllGroups = async (req, res) => {
    const groups = await prisma.groupModel.findMany()
    res.json(groups)
}

// server/controllers/SchoolController.js
export const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        // Проверяем, что id является числом
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID группы должен быть числом' });
        }

        // Ищем группу по id вместе со связанными данными
        const group = await prisma.groupModel.findMany({
            where: { id: Number(id) },
            include: {
                school: true,
            },
        });

        // Если группа не найдена
        if (!group) {
            return res.status(404).json({ message: 'Группа не найдена' });
        }

        res.json(group);
    } catch (error) {
        console.error('Ошибка при получении группы:', error);
        res.status(500).json({ message: 'Ошибка при получении группы' });
    }
};

// server/controllers/SchoolController.js
export const getAllLessons = async (req, res) => {
    try {
        const lessons = await prisma.lessonModel.findMany({
            include: {
                group: {
                    include: {
                        school: true
                    }
                }
            }
        });
        res.json(lessons);
    } catch (error) {
        console.error('Ошибка при получении занятий:', error);
        res.status(500).json({ message: 'Ошибка при получении занятий' });
    }
}

// Добавление школы
export const addSchool = async (req, res) => {
    try {
        const { name } = req.body;


        // Проверка на существование школы с таким именем
        const existingSchool = await prisma.schoolModel.findMany({ where: { name } });
        if (existingSchool.length > 0) {
            return res.status(400).json({ message: 'Школа с таким названием уже существует' });
        }

        // Создание школы
        const school = await prisma.schoolModel.create({
            data: { name }
        });

        res.status(201).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании школы' });
    }
};


// Добавление группы
export const addGroup = async (req, res) => {
    try {
        const { name, schoolId } = req.body;

        // Проверка наличия обязательных полей
        if (!name || !schoolId) {
            return res.status(400).json({
                message: 'Название группы и ID школы обязательны'
            });
        }

        // Проверяем, что schoolId является числом
        if (isNaN(schoolId)) {
            return res.status(400).json({
                message: 'ID школы должен быть числом'
            });
        }

        // Проверяем существование школы
        const school = await prisma.schoolModel.findMany({ where: { id: Number(schoolId) } }); // Проверяем существование школы по ID
        if (!school) {
            return res.status(404).json({
                message: 'Школа не найдена'
            });
        }

        // Проверка на существование группы с таким именем в этой школе
        const existingGroup = await prisma.groupModel.findMany({
            where: {
                name,
                schoolId
            }
        });

        if (existingGroup.length > 0) {
            return res.status(400).json({
                message: 'Группа с таким названием уже существует в этой школе'
            });
        }

        // Создание группы
        const group = await prisma.groupModel.create({
            data: {
                name,
                schoolId
            }
        });

        res.status(201).json(group);
    } catch (error) {
        console.error('Ошибка при создании группы:', error);
        res.status(500).json({ message: 'Ошибка при создании группы' });
    }
};

export const addLesson = async (req, res) => {
    try {
        const { dayOfWeek, startTime, endTime, room, groupId } = req.body;

        // Проверка наличия обязательных полей
        if (!dayOfWeek || !startTime || !endTime || !room || !groupId) {
            return res.status(400).json({
                message: 'Заполните обязательные поля'
            });
        }

        // Проверяем, что groupId является числом
        if (isNaN(groupId)) {
            return res.status(400).json({
                message: 'ID группы должен быть числом'
            });
        }

        // Проверяем, что день недели в правильном диапазоне (0-6)
        if (dayOfWeek < 1 || dayOfWeek > 7) {
            return res.status(400).json({
                message: 'День недели должен быть от 1 до 7'
            });
        }

        // Проверяем существование группы
        const group = await prisma.groupModel.findMany({ where: { id: Number(groupId) } });
        if (!group) {
            return res.status(404).json({
                message: 'Группа не найдена'
            });
        }



        // Создание занятия
        const lesson = await prisma.lessonModel.create({
            data: {
                dayOfWeek: dayOfWeek,
                startTime: startTime,
                endTime: endTime,
                room: room,
                groupId: groupId
            }
        });

        res.status(201).json(lesson);
    } catch (error) {
        console.error('Ошибка при создании занятия:', error);
        res.status(500).json({ message: 'Ошибка при создании занятия' });
    }
};

export const deleteSchool = async (req, res) => {
    try {

        const schoolid = req.body.id
        await prisma.schoolModel.delete({ where: { id: schoolid } });
        res.json(schoolid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить школу.'
        })
    }
}

export const deleteGroup = async (req, res) => {
    try {

        const groupid = req.body.id
        await prisma.groupModel.delete({ where: { id: groupid } });
        res.json(groupid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить группу.'
        })
    }
}

export const deleteLesson = async (req, res) => {
    try {
        const lessonid = req.body.id
        await prisma.lessonModel.delete({ where: { id: lessonid } });
        res.json(lessonid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить занятие.'
        })
    }
}