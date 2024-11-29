import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import UserModel from '../db/models/UserModel.js'


const authorization = async (req, res) => {
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

export default authorization