import React, { useState } from 'react'
import AddScript from './AddScript'
import '../../../static/css/components/scripts/ScriptContent.css'





const ScriptContent = () => {
    const [hideAdd, setHideAdd] = useState(false)

    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }
    return (
        <div className="script-content">
        <div className="script-content-top">
            <button className='script-button-open' onClick={toggleAdd}>Добавить</button>
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