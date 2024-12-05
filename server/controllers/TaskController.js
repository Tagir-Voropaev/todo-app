import TaskModel from "../db/models/TaskModel.js";

export const createTask = async(req,res) => {
    try {
        const doc = new TaskModel({
            title: req.body.title,
            timetask: req.body.timetask,
            datetask: req.body.datetask,
            description: req.body.description,
            user: req.userId,
        });

        const task = await doc.save();

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать задачу'
        })
    }
}

export const getAllTasks = async(req, res) => {
    try {
        // const tasks = await TaskModel.findAll({ where: { user: req.userId } })// Получение задач определенного пользователя
        const tasks = await TaskModel.findAll()// Получение задач определенного пользователя
        res.json(tasks);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : 'Задачи не найдены.'
        })
    }
}



export const deleteTask = async(req, res) => {
    try {
        
        const taskId = req.body.id
        await TaskModel.destroy({ where: { id: taskId } });
        res.json(taskId);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : 'Не удалось удалить задачу.'
        })
    }
}
export const editTask = async(req, res) => {
    try {
        const taskId = req.body.id

        const selected = await TaskModel.findOne({ where: { id: taskId } });
        if(selected){
            await TaskModel.update(
                {
                    title: req.body.title,
                    timetask: req.body.timetask,
                    datetask: req.body.datetask,
                    description: req.body.description 
                }, 
                {
                    where: {
                        id: taskId,
                    },
                })
        }
        else{
            return res.status(404).json({
                message: "Задача не найдена"
            })
        }
        const tasks = await TaskModel.findAll({ where: { user: req.userId } });

        res.json(tasks)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Задача не найденааа"
        })
    }
}