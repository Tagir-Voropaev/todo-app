import {body} from 'express-validator'


export const authValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('username', 'Укажите имя').isLength({min: 3}),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
]

export const taskCreateValidation = [
    body('title', 'Введите задачу').isLength({min: 2}).isString(),
    body('timetask', 'Введите время').isString(),
    body('datetask', 'Введите дату').isString(),
    body('description', 'Введите задачу').optional().isLength({min: 2}).isString(),
    body('description', 'Введите задачу').optional().isLength({min: 2}).isString(),

]