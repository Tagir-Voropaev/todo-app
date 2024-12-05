import React from 'react'
import "../../../static/css/components/tasks/AddTask.css"
import { useForm } from 'react-hook-form'
import { fetchCreateTasks } from '../../../store/createTaskSlice'
import {useDispatch} from 'react-redux'
import { fetchTasks } from '../../../store/tasksSlice'





export default function AddTask() {
    const dispatch = useDispatch();

    const { register, handleSubmit} = useForm({
        defaultValues: {
            title: '',
            timetask: '',
            datetask: '',
        },
        mode: 'onChange'
    })
    const onSubmit = (values) => {
        dispatch(fetchCreateTasks(values))
        dispatch(fetchTasks())
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-add-show">
            <input min={5} {...register('title', { required: "Минимум 5 символов..."} )} name='title'  type="text" className='task-input task-input-text' placeholder='Введите задачу...'/>
            <input {...register('timetask', { required: "Введите время..."} )} name='timetask' type="time" className='task-input task-input-time'/>
            <input {...register('datetask', { required: "Введите дату..."} )} name='datetask' type="date" className='task-input task-input-date'/>
            <button type='submit' className='task-button-add'><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}
