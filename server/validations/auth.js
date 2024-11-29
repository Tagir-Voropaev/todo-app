import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('username', 'Укажите имя').isLength({min: 3}),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),

]