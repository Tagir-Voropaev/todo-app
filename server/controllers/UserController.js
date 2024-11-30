import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'


import UserModel from '../db/models/UserModel.js'



export const registration = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        //Шифрование пароля
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Получение данных пользователя
        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            passwordHash: hash
        })

        const user = await doc.save();
        const { passwordHash, ...docs } = user.dataValues
        const token = jwt.sign({
            _id: user.id,
        }, 'secret123',
            {
                expiresIn: '30d',
            })
        // Ответ ()
        res.json({
            ...docs,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500)
        res.json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}

export const authorization = async (req, res) => {
    try {
        //Поиск пользователя по почте
        const user = await UserModel.findOne({ where: { email: req.body.email } })
        
        if (!user) { //Почта пользователя не совпадает с ответом
            return res.status(404).json({
                message: "Не верный логин или пароль.",
            })
        }

        //Проверка пароля
        const isValidPass = await bcrypt.compare(req.body.password, user.dataValues.passwordHash);

        if (!isValidPass){
            return res.status(404).json({
                message: "Не верный логин или пароль.",
            })
        }

        //Создаем токен пользователю
        const token = jwt.sign({
            _id : user.id,   
        }, 
        'secret123', 
        {
             expiresIn: '30d',
        });


        //Вытаскиваем пароль
        const {passwordHash, ...docs} = user.dataValues
        //Отдаем данные
        res.json({
            ... docs,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500)
        res.json({
            message: 'Не удалось авторизоваться',
            data: req.body,
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const { passwordHash, ...docs } = user.dataValues
        
        
        
        res.json({
            success: true,
            user: docs,
        })
    } catch (error) {
        console.log(error);
        res.status(403)
        res.json({
            message: 'Нет доступа',
            data: req.body,
        });
    }
}