import React, { useEffect, useState } from 'react'
import AddScript from './AddScript'
import '../../../static/css/components/scripts/ScriptContent.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchScripts } from '../../../store/scripts/scriptSlice'
import axios from '../../../axios'
import { fetchAllScripts } from '../../../store/scripts/allScriptsSlice'
import SearchScript from './SearchScript'
import Warning from '../../Warning'
const ScriptContent = () => {
    const dispatch = useDispatch()

    const [hideAdd, setHideAdd] = useState(false)
    const [hideWarning, setHideWarning] = useState(false)
    const params = useParams('id')
    const [item, setItem] = useState({})
    useEffect(() => {
        setHideAdd(false);
        if (params.id) {
            dispatch(fetchScripts(params.id))
        } else {
            dispatch(fetchAllScripts())
        }
        // dispatch(fetchScripts(params.id))
        // dispatch(fetchAllScripts())
    }, [dispatch, params.id])
    const scripts = useSelector(state => state.scripts);
    const allscripts = useSelector(state => state.allscripts);
    const { filtered, searchValue } = useSelector(state => state.searchScripts);



    const toggleAdd = () => {
        if (hideAdd) {
            setHideAdd(false)
        } else {
            setHideAdd(true)
        }
    }
    const hideWarningHandler = async (value) => {
        setHideWarning(false)
    }
    const handleScriptDelete = async () => {
        await axios.delete((`/scripts/subtab/${params.id}`), { data: { id: item.id }, })
        setHideWarning(false)
        if (params.id) {
            dispatch(fetchScripts(params.id))
        } else {
            dispatch(fetchAllScripts())
        }
    }
    const onDeleteButtton = async (value) => {
        setHideWarning(true)
        setItem(value)
    }

    const copyToClipboard = async (text, element) => {
        try {
            await navigator.clipboard.writeText(text);


        } catch (err) {
            console.error('Ошибка при копировании:', err);
        }
    };


    return (
        <div className="script-content">
            {hideWarning && <Warning
                message={"Вы действительно хотите удалить этот скрипт?"}
                onConfirm={handleScriptDelete}
                onCancel={hideWarningHandler}
            />}
            <div className="script-content-top">
                <div className="script-top-buttons">
                    <SearchScript />
                    {params.id &&
                        <button className='script-button-open' onClick={toggleAdd}>
                            {hideAdd ? 'Закрыть' : 'Добавить'}
                        </button>
                    }
                </div>
                <div className="script-hide">
                    {hideAdd && (<AddScript />)}
                </div>
            </div>
            <ul className="script-content-list">
                {searchValue
                    ? ((filtered.map(item => {
                        return (
                            <li key={item.id} className="script-content-elem">
                                <div onClick={() => copyToClipboard(item.text)} className="script-content-elem-clipborad">
                                    <p>{item.text}</p>
                                </div>
                                <button onClick={(e) => onDeleteButtton(item)} className='script-content-delete'><i className="fa-solid fa-trash"></i></button>
                            </li>
                        )
                    })))
                    : (params.id
                        ? (scripts.status === 'loaded'
                            ? (scripts.scripts.map((item) => {
                                return (
                                    <li key={item.id} className="script-content-elem">
                                        <div onClick={() => copyToClipboard(item.text)} className="script-content-elem-clipborad">
                                            <p>{item.text}</p>
                                        </div>
                                        <button onClick={(e) => onDeleteButtton(item)} className='script-content-delete'><i className="fa-solid fa-trash"></i></button>
                                    </li>
                                )
                            }))
                            : <h1>Loading...</h1>
                        )
                        : (allscripts.status === 'loaded'
                            ? (allscripts.allscripts.map((item) => {
                                return (
                                    <li key={item.id} className="script-content-elem">
                                        <div onClick={() => copyToClipboard(item.text)} className="script-content-elem-clipborad">
                                            <p>{item.text}</p>
                                        </div>
                                        <button onClick={(e) => onDeleteButtton(item)} className='script-content-delete'><i className="fa-solid fa-trash"></i></button>
                                    </li>
                                )
                            }))
                            : <h1>Loading...</h1>
                        ))
                }

            </ul>
        </div>
    )
}

export default ScriptContent