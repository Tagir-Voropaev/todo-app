import React, { useState } from 'react'
import AddScript from './AddScript'
import '../../../static/css/components/scripts/ScriptContent.css'
import SearchTask from '../Tasks/SearchTask'
import { useParams } from 'react-router-dom'




const ScriptContent = () => {
    const [hideAdd, setHideAdd] = useState(false)
    const params = useParams();
    console.log(params)
    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }
    return (
        <div className="script-content">
            <div className="script-content-top">
                <div className="script-top-buttons">
                    <SearchTask />
                    <button className='script-button-open' onClick={toggleAdd}>Добавить</button>
                </div>
                <div className="script-hide">
                    {hideAdd && (<AddScript />)}
                </div>
            </div>
            <ul className="script-content-list">
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>
                <li className="script-content-elem">Скриптфывлаофылвдаофдыжваол</li>

            </ul>
        </div>
    )
}

export default ScriptContent