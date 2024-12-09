import React, { useState } from 'react'
import '../../../static/css/components/scripts/ScriptNav.css'
import ScriptNavElem from './ScriptNavElem'



const ScriptNav = () => {

    const [tabToggle, setTabToggle] = useState(false)

    const tabToggleHandler = () => {
        return setTabToggle(s => (!s));
    }


    return (
        <div className="script-nav">
            <ul className="script-nav-list">
                <li className="script-nav-elem">
                    <button onClick={tabToggleHandler} className='script-nav-elem-button'>Вкладка 1</button>
                    {tabToggle && (<ScriptNavElem />)}
                </li>

            </ul>
        </div>
    )
}

export default ScriptNav