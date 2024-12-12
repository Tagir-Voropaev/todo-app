import React, { useEffect } from 'react'
import "../../../static/css/components/scripts/AddScript.css"
import { useForm } from 'react-hook-form'
import { fetchCreateScripts } from '../../../store/createScriptSlice'
import { fetchScripts } from '../../../store/scriptSlice'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'





const AddScript = () => {
    const dispatch = useDispatch();
    const params = useParams('id')
    useEffect(() => {
        dispatch(fetchScripts(params.id))
    }, [dispatch, params])
    const { register, handleSubmit } = useForm({
        defaultValues: {
            text: '',
        },
        mode: 'onChange'
    })
    const onSubmit = (values) => {
        dispatch(fetchCreateScripts({id:params.id, values:values}))
        dispatch(fetchScripts(params.id))
        dispatch(fetchScripts(params.id))
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)} className="script-add-show">
                <input min={2} {...register('text', { required: "Минимум 2 символов..." })} name='text' type="text" className='script-input script-input-text' placeholder='Введите скрипт...' />
                <button type='submit' className='script-button-add'><i className="fa-solid fa-plus"></i></button>
            </form>

    )
}

export default AddScript