import React, { useEffect, useState } from 'react'
import AddScript from './AddScript'
import '../../../static/css/components/scripts/ScriptContent.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchScripts } from '../../../store/scriptSlice'
import axios from '../../../axios'
import { fetchAllScripts } from '../../../store/allScriptsSlice'
import SearchScript from './SearchScript'


const ScriptContent = () => {
    const dispatch = useDispatch()

    const [hideAdd, setHideAdd] = useState(false)
    const [hideWarning, setHideWarning] = useState(false)
    const [warningVal, setWarningVal] = useState(false)
    const params = useParams('id')

    useEffect(() => {
        dispatch(fetchScripts(params.id))
        dispatch(fetchAllScripts())
    }, [dispatch, params.id])
    const scripts = useSelector(state => state.scripts);
    const allscripts = useSelector(state => state.allscripts);
    const { filtered, searchValue } = useSelector(state => state.searchScripts);



    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }

    const onDeleteButtton = async (value) => {
        setHideWarning(true)
        await axios.delete(`/scripts/subtab/${params.id}`, { data: { id: value.id }, })
        dispatch(fetchScripts(params.id))
    }

    return (
        <div className="script-content">
            <div className="script-content-top">
                <div className="script-top-buttons">
                    <SearchScript />
                    {params.id && <button className='script-button-open' onClick={toggleAdd}>Добавить</button>}

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
                                <p>{item.text}</p>
                                <button onClick={(e) => onDeleteButtton(item)} className='script-content-delete'><i className="fa-solid fa-trash"></i></button>
                            </li>
                        )
                    })))
                    : (params.id
                        ? (scripts.status === 'loaded'
                            ? (scripts.scripts.map((item) => {
                                return (
                                    <li key={item.id} className="script-content-elem">
                                        <p>{item.text}</p>
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
                                        <p>{item.text}</p>
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