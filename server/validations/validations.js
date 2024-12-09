import {body} from 'express-validator'



export const taskCreateValidation = [
    body('title', 'Введите задачу').isLength({min: 5}).isString(),
    body('timetask', 'Введите время').isString(),
    body('datetask', 'Введите дату').isString(),
]
export const scriptCreateValidation = [
    body('text', 'Введите минимум 5 символов.').isLength({min: 5}).isString(),
]
export const tabCreateValidation = [
    body('text', 'Введите минимум 2 символов.').isLength({min: 2}).isString(),
]