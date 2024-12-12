import React from 'react'
import '../../../static/css/components/scripts/Scripts.css'
import ScriptNav from './ScriptNav'
import ScriptContent from './ScriptContent'

const Scripts = () => {

    return (
        <div className='wrapper'>
            <div className="window-block">
                <h1 className='window-title'>Скрипты</h1>
                <div className="script-block">
                    <ScriptNav />
                    <ScriptContent />
                </div>
            </div>
        </div>
    )
}

export default Scripts