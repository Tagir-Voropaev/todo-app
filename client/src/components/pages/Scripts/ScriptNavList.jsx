import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchCreateSubTabs } from '../../../store/scripts/createSubTabsSlice'
import { fetchNavScripts } from '../../../store/scripts/scriptNavSlice'
import axios from '../../../axios'
import { Link } from 'react-router-dom';
import Warning from '../../Warning'


const ScriptNavList = ({ tabid, tabToggle, inputToggle }) => {
    const dispatch = useDispatch()
    const { subtabs, status } = useSelector(state => state.navscript);

    const [hideWarning, setHideWarning] = useState(false)
    const [item, setItem] = useState({})

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
    const onSubmit = async (values, id) => {
        values.tabid = id
        await dispatch(fetchCreateSubTabs(values))
        await dispatch(fetchNavScripts())
    }
    const hideWarningHandler = async (value) => {
        setHideWarning(false)
    }
    const handleScriptDelete = async () => {
        await axios.delete((`/scripts/subtabs`), { data: { id: item.id }, })
        setHideWarning(false)
        dispatch(fetchNavScripts())
    }
    const onDeleteButtton = async (value) => {
        setHideWarning(true)
        setItem(value)
    }


    if (tabToggle === tabid) {
        return (
            <ul className="script-nav-sublist">
                {hideWarning && <Warning
                    message={"Вы действительно хотите удалить эту подвкладку?"}
                    onConfirm={handleScriptDelete}
                    onCancel={hideWarningHandler}
                />}
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