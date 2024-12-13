import {body} from 'express-validator'



export const taskCreateValidation = [
    body('title', 'Введите задачу').isLength({min: 1}).isString(),
    body('timetask', 'Введите время').isString(),
    body('datetask', 'Введите дату').isString(),
]
export const scriptCreateValidation = [
    body('text', 'Введите минимум 1 символов.').isLength({min: 1}).isString(),
]
export const tabCreateValidation = [
    body('text', 'Введите минимум 1 символов.').isLength({min: 1}).isString(),
]

export const schoolCreateValidation = [
    body('name', 'Введите минимум 1 символов.').isLength({min: 1}).isString(),
]