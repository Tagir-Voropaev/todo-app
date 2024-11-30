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