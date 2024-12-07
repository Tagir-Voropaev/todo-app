import React from 'react'
import "../../../static/css/components/scripts/AddScript.css"
import { useForm } from 'react-hook-form'
// import { fetchCreateTasks } from '../../../store/createTaskSlice'
// import { useDispatch } from 'react-redux'
// import { fetchTasks } from '../../../store/tasksSlice'





const AddScript = () => {
    // const dispatch = useDispatch();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            text: '',
        },
        mode: 'onChange'
    })
    const onSubmit = (values) => {
        // dispatch(fetchCreateTasks(values))
        // dispatch(fetchTasks())
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="script-add-show">
            <input min={5} {...register('text', { required: "Минимум 5 символов..." })} name='text' type="text" className='script-input script-input-text' placeholder='Введите скрипт...' />
            <button type='submit' className='script-button-add'><i className="fa-solid fa-plus"></i></button>
        </form>
    )
}

export default AddScript