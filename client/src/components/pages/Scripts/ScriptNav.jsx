import React, { useEffect, useState } from 'react'
import '../../../static/css/components/scripts/ScriptNav.css'
import ScriptNavList from './ScriptNavList'
import { fetchNavScripts } from '../../../store/scriptNavSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../axios'
import { useForm } from 'react-hook-form'
import { fetchCreateTabs } from '../../../store/createTabsSlice'
import WarningScriptNav from './WarningScriptNav'


const ScriptNav = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchNavScripts())
    }, [dispatch])
    const { tabs, status } = useSelector(state => state.navscript);

    const [hideWarning, setHideWarning] = useState(false)
    const [warningVal, setWarningVal] = useState({})
    const [tabToggle, setTabToggle] = useState("")
    const [inputToggle, setInputToggle] = useState(false)


    const { register, handleSubmit } = useForm({
        defaultValues: {
            text: '',
        },
        mode: 'onChange'
    })

    const onSubmit = (values) => {
        dispatch(fetchCreateTabs(values))
        dispatch(fetchNavScripts())
        dispatch(fetchNavScripts())
    }

    const tabToggleHandler = (id) => {
        if (tabToggle === id) {
            setTabToggle(false)
            setInputToggle(false)
        }
        else {
            setInputToggle(false)
            return setTabToggle(id);
        }
    }
    const inputToggleHandler = (id) => {
        if (tabToggle === id) {
            setInputToggle((e) => !e)
        }
        else {
            setInputToggle(true)
            return setTabToggle(id);
        }
    }
    const onDeleteButtton = async (value) => {
        setHideWarning(true)
        setWarningVal({ propurl: (`/scripts/tabs`), propdata: { data: { id: value.id }, }, hide: setHideWarning, fetchupdate: fetchNavScripts })

        // await axios.delete('/scripts/tabs', { data: { id: value.id }, })
        // dispatch(fetchNavScripts())
    }



    return (
        <div className="script-nav">
             {hideWarning && <WarningScriptNav warningVal={warningVal} />}
            <form onSubmit={handleSubmit(onSubmit)} className="script-nav-add">
                <input min={2} maxLength={20} {...register('text', { required: "Минимум 2 символа..." })} name='text' type="text" placeholder='Добавить вкладку...' />
                <button type='submit'><i className="fa-solid fa-plus"></i></button>
            </form>
            <ul className="script-nav-list">
                {status === 'loaded'
                    ? (tabs.map((item) => {
                        return (
                            <li key={item.id} className="script-nav-elem">
                                <div className="script-nav-elem-top">
                                    <div className="script-nav-elem-buttons">
                                        <button onClick={(e) => inputToggleHandler(item.id)} className='script-nav-elem-button'><i className="fa-solid fa-plus"></i></button>
                                        <button onClick={(e) => onDeleteButtton(item)} className='script-nav-elem-button'><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                    <div onClick={(e) => tabToggleHandler(item.id)} className="script-nav-elem-title">
                                        <p className='script-nav-elem-open'>{item.text}</p>
                                    </div>
                                </div>

                                <ScriptNavList
                                    tabid={item.id}
                                    tabToggle={tabToggle}
                                    inputToggle={inputToggle}
                                />
                            </li>
                        )
                    }))
                    : (<h1>Loading...</h1>)
                }
            </ul>
        </div>
    )
}

export default ScriptNav