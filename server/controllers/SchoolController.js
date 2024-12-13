import { SchoolModel, GroupModel, LessonModel } from '../db/models/TimetableModel.js'

export const getAllSchools = async (req, res) => {
    const schools = await SchoolModel.findAll()
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
        const school = await SchoolModel.findOne({
            where: { id },
            include: [{
                model: GroupModel,
                include: [{
                    model: LessonModel
                }]
            }]
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
    const groups = await GroupModel.findAll()
    res.json(groups)
}

export const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        // Проверяем, что id является числом
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID группы должен быть числом' });
        }

        // Ищем группу по id вместе со связанными данными
        const group = await GroupModel.findOne({
            where: { id },
            include: [
                {
                    model: SchoolModel,  // включаем данные о школе
                    attributes: ['id', 'name'] // выбираем только нужные поля школы
                },
                {
                    model: LessonModel,  // включаем данные о занятиях
                    attributes: ['id', 'startTime', 'endTime', 'room', 'groupId']
                }
            ]
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

export const getAllLessons = async (req, res) => {
    const lessons = await LessonModel.findAll()
    res.json(lessons)
}

// Добавление школы
export const addSchool = async (req, res) => {
    try {
        const { name } = req.body;


        // Проверка на существование школы с таким именем
        const existingSchool = await SchoolModel.findOne({ where: { name } });
        if (existingSchool) {
            return res.status(400).json({ message: 'Школа с таким названием уже существует' });
        }

        // Создание школы
        const school = await SchoolModel.create({ name });
        
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
        const school = await SchoolModel.findByPk(schoolId);
        if (!school) {
            return res.status(404).json({ 
                message: 'Школа не найдена' 
            });
        }

        // Проверка на существование группы с таким именем в этой школе
        const existingGroup = await GroupModel.findOne({
            where: { 
                name,
                schoolId 
            }
        });

        if (existingGroup) {
            return res.status(400).json({ 
                message: 'Группа с таким названием уже существует в этой школе' 
            });
        }

        // Создание группы
        const group = await GroupModel.create({
            name,
            schoolId
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
        if (dayOfWeek < 0 || dayOfWeek > 6) {
            return res.status(400).json({ 
                message: 'День недели должен быть от 0 до 6' 
            });
        }

        // Проверяем существование группы
        const group = await GroupModel.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ 
                message: 'Группа не найдена' 
            });
        }

      

        // Создание занятия
        const lesson = await LessonModel.create({
            dayOfWeek,
            startTime,
            endTime,
            room,
            groupId
        });

        res.status(201).json(lesson);
    } catch (error) {
        console.error('Ошибка при создании занятия:', error);
        res.status(500).json({ message: 'Ошибка при создании занятия' });
    }
};
