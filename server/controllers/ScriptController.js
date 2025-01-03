// import ScriptModel from "../db/models/ScriptModel.js";
// import { ScriptModel, SubTabModel, TabModel } from '../db/models/ScriptModel.js'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const getAllTabs = async (req, res) => {
    try {
        // const tasks = await TaskModel.findAll({ where: { user: req.userId } })// Получение задач определенного пользователя
        const tabs = await prisma.tabModel.findMany()// Получение всех задач
        const subtabs = await prisma.subTabModel.findMany()// Получение всех задач
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
        const scripts = await prisma.scriptModel.findMany()// Получение задач определенного пользователя
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
        const scripts = await prisma.scriptModel.findMany({ where: {subtabId: req.params.id}})// Получение задач определенного пользователя
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
        const existingTab = await prisma.tabModel.findMany({ where: { text: req.body.text } });
        if (existingTab.length > 0) {
            return res.status(400).json({ message: 'Вкладка с таким текстом уже существует.' });
        }

        // Создание нового таба
        const newTab = await prisma.tabModel.create({
            data: {
                text: req.body.text
            }, });

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
        const existingSubTab = await prisma.subTabModel.findMany({ where: { text: req.body.text, tabId: req.body.tabid } });
        if (existingSubTab.length > 0) {
            return res.status(400).json({ message: 'Подвкладка с таким текстом уже существует в данной вкладке.' });
        }

        // Проверка на наличие таба с указанным ID
        const existingTab = await prisma.tabModel.findMany({where: { id: tabid }});
        if (!existingTab) {
            return res.status(404).json({ message: 'Вкладки с таким ID не существует' });
        }

        // Создание нового сабтаба
        await prisma.subTabModel.create({
            data: {
                text: text,
                tabId: tabid
            },
        });

        // Получаем все сабтабы, принадлежащие этому табу
        const subtabs = await prisma.subTabModel.findMany({ where: { tabId:tabid } });

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
        const subtabId = Number(req.params.id)
        const { text } = req.body;

        // Проверка на наличие сабтаба с таким же текстом в указанном табе
        const existingScript = await prisma.scriptModel.findMany({ where: { text, subtabId } });
        if (existingScript.length>0) {
            return res.status(400).json({ message: 'Скрипт с таким текстом уже существует в данной вкладке.' });
        }

        // Проверка на наличие таба с указанным ID
        const existingSubTab = await prisma.subTabModel.findMany({where: { id: subtabId }});
        if (existingSubTab.length === 0) {
            return res.status(404).json({ message: 'Подвкладки с таким ID не существует' });
        }

        // Создание нового сабтаба
        const newScript = await prisma.scriptModel.create({
            data: {
                text: text,
                subtabId: subtabId
            }, });

       

        // Возвращаем таб и все его сабтабы
        res.json({
            newscript: newScript
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось создать скрипт' });
    }
};


export const deleteTab = async (req, res) => {
    try {

        const tabid = req.body.id
        await prisma.tabModel.delete({ where: { id: tabid } });
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
        await prisma.subTabModel.delete({ where: { id: subtabid } });
        res.json(v);
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
        await prisma.scriptModel.delete({ where: { id: scriptid } });
        res.json(scriptid);
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: 'Не удалось удалить скрипт.'
        })
    }
}