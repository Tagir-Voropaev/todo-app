import {body} from 'express-validator'



export const taskCreateValidation = [
    body('title', 'Введите задачу').isLength({min: 5}).isString(),
    body('timetask', 'Введите время').isString(),
    body('datetask', 'Введите дату').isString(),
]