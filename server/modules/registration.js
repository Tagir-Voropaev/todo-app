import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'

import UserModel from '../db/models/UserModel.js'



const registration = async (req, res) => {
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

export default registration