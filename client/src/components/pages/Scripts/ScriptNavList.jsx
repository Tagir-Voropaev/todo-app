import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchCreateSubTabs } from '../../../store/createSubTabsSlice'
import { fetchNavScripts } from '../../../store/scriptNavSlice'
import axios from '../../../axios'
import { Link } from 'react-router-dom';


const ScriptNavList = ({ tabid, tabToggle, inputToggle }) => {
    const dispatch = useDispatch()
    const { subtabs, status } = useSelector(state => state.navscript);
    
    const subtabsSorted = []
    for (let index = 0; index < subtabs.length; index++) {
        if (subtabs[index].tabid === tabid) {
            subtabsSorted.push(subtabs[index])
        }

    }

    const { register, handleSubmit } = useForm({
        defaultValues: {
            text: '',
            tabid: '',
        },
        mode: 'onChange'
    })
    const onSubmit = (values, id) => {
        values.tabid = id
        dispatch(fetchCreateSubTabs(values))
        dispatch(fetchNavScripts())
        dispatch(fetchNavScripts())
    }
    const onDeleteButtton = async (value) => {
        await axios.delete('/scripts/subtabs', { data: { id: value.id }, })
        dispatch(fetchNavScripts())
    }

    if (tabToggle === tabid) {
        return (
            <ul className="script-nav-sublist">
                {inputToggle && (
                    <form onSubmit={handleSubmit(data => onSubmit(data, tabid))} className="script-nav-subelem script-nav-subelem-form">
                        <input min={2} maxLength={18} {...register('text', { required: "Минимум 2 символа..." })} name='text' type='text' className='script-nav-subelem-input' placeholder='Имя подвкладки...' />
                        <button type='submit' className='script-add-tab-button'><i className="fa-solid fa-plus"></i></button>
                    </form>
                )}

                {status === 'loaded'
                    ? (subtabsSorted.map((item) => {
                        return (
                            <Link key={item.id} draggable="false" to={`/scripts/subtab/${item.id}`} className='script-link'>
                                <li className="script-nav-subelem">
                                    <button onClick={(e) => onDeleteButtton(item)} className='script-nav-elem-button'><i className="fa-solid fa-minus"></i></button>
                                    <p className='script-nav-subelem-text'>{item.text}</p>
                                </li>
                            </Link>
                        )
                    }))
                    : (<h1>Loading...</h1>)
                }
            </ul>

        )
    }
}

export default ScriptNavList