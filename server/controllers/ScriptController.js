// import ScriptModel from "../db/models/ScriptModel.js";
import { ScriptModel, SubTabModel, TabModel } from '../db/models/ScriptModel.js'


export const getAllTabs = async (req, res) => {
    try {
        // const tasks = await TaskModel.findAll({ where: { user: req.userId } })// Получение задач определенного пользователя
        const tabs = await TabModel.findAll()// Получение задач определенного пользователя
        const subtabs = await SubTabModel.findAll()// Получение задач определенного пользователя
        const alltabs = { tabs, subtabs }
        res.json(alltabs);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Вкладки не найдены.'
        })
    }
}
export const getAllScripts = async (req, res) => {
    try {
        const scripts = await ScriptModel.findAll()// Получение задач определенного пользователя
        res.json(scripts);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Скрипты не найдены.'
        })
    }
}
export const getScripts = async (req, res) => {
    try {
        // const tasks = await TaskModel.findAll({ where: { user: req.userId } })// Получение задач определенного пользователя
        const scripts = await ScriptModel.findAll({ where: {subtabid: req.params.id}})// Получение задач определенного пользователя
        res.json(scripts);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Скрипты не найдены.'
        })
    }
}

export const createTab = async (req, res) => {
    try {
        // Проверка на наличие таба с таким же текстом
        const existingTab = await TabModel.findOne({ where: { text: req.body.text } });
        if (existingTab) {
            return res.status(400).json({ message: 'Вкладка с таким текстом уже существует.' });
        }

        // Создание нового таба
        const newTab = await TabModel.create({ text: req.body.text });

        // Возвращаем созданный таб без сабтабов
        res.json(newTab);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось создать вкладку' });
    }
};


export const createSubTab = async (req, res) => {
    try {
        const { text, tabid } = req.body;

        // Проверка на наличие сабтаба с таким же текстом в указанном табе
        const existingSubTab = await SubTabModel.findOne({ where: { text, tabid } });
        if (existingSubTab) {
            return res.status(400).json({ message: 'Подвкладка с таким текстом уже существует в данной вкладке.' });
        }

        // Проверка на наличие таба с указанным ID
        const existingTab = await TabModel.findByPk(tabid);
        if (!existingTab) {
            return res.status(404).json({ message: 'Вкладки с таким ID не существует' });
        }

        // Создание нового сабтаба
        const newSubTab = await SubTabModel.create({ text, tabid });

        // Получаем все сабтабы, принадлежащие этому табу
        const subtabs = await SubTabModel.findAll({ where: { tabid } });

        // Возвращаем таб и все его сабтабы
        res.json({
            tab: existingTab,
            subtabs: subtabs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось создать сабтаб' });
    }
};

export const createScript = async (req, res) => {
    try {
        const subtabid = req.params.id
        const { text } = req.body;

        // Проверка на наличие сабтаба с таким же текстом в указанном табе
        const existingScript = await ScriptModel.findOne({ where: { text, subtabid } });
        if (existingScript) {
            return res.status(400).json({ message: 'Скрипт с таким текстом уже существует в данной вкладке.' });
        }

        // Проверка на наличие таба с указанным ID
        const existingSubTab = await SubTabModel.findByPk(subtabid);
        if (!existingSubTab) {
            return res.status(404).json({ message: 'Подвкладки с таким ID не существует' });
        }

        // Создание нового сабтаба
        const newScript = await ScriptModel.create({ text, subtabid });

        // Получаем все сабтабы, принадлежащие этому табу
        const scripts = await ScriptModel.findAll({ where: { subtabid } });

        // Возвращаем таб и все его сабтабы
        res.json({
            newscript: newScript,
            scripts: scripts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось создать скрипт' });
    }
};


export const deleteTab = async (req, res) => {
    try {

        const tabid = req.body.id
        await TabModel.destroy({ where: { id: tabid } });
        res.json(tabid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить вкладку.'
        })
    }
}
export const deleteSubTab = async (req, res) => {
    try {

        const subtabid = req.body.id
        await SubTabModel.destroy({ where: { id: subtabid } });
        res.json(subtabid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить подвкладку.'
        })
    }
}
export const deleteScript = async (req, res) => {
    try {

        const scriptid = req.body.id
        await ScriptModel.destroy({ where: { id: scriptid } });
        res.json(scriptid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить скрипт.'
        })
    }
}