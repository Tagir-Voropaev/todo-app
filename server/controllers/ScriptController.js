// import ScriptModel from "../db/models/ScriptModel.js";
import {SubTabModel, TabModel} from '../db/models/ScriptModel.js'


export const getAll = async(req, res) => {
    try {
        // const tasks = await TaskModel.findAll({ where: { user: req.userId } })// Получение задач определенного пользователя
        const tab = await TabModel.findAll()// Получение задач определенного пользователя
        res.json(tab);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : 'Вкладки не найдены.'
        })
    }
}

export const createTab = async(req,res) => {
    try {
        const doc = new TabModel({
            text: req.body.text,
        });

        const tab = await doc.save();

        res.json(tab);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать вкладку'
        })
    }
}

// export const createScript = async(req,res) => {
//     try {
//         const doc = new ScriptModel({
//             text: req.body.text,
//         });

//         const script = await doc.save();

//         res.json(script);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Не удалось создать скрипт'
//         })
//     }
// }


// export const getAllScripts = async(req, res) => {
//     try {
//         // const tasks = await TaskModel.findAll({ where: { user: req.userId } })// Получение задач определенного пользователя
//         const scripts = await ScriptModel.findAll()// Получение задач определенного пользователя
//         res.json(scripts);
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({
//             message : 'Скрипты не найдены.'
//         })
//     }
// }