import React from 'react'
import SearchTask from '../Tasks/SearchTask'
import '../../../static/css/components/scripts/Scripts.css'
import ScriptNav from './ScriptNav'
import ScriptContent from './ScriptContent'

const Scripts = () => {
  
    return (
        <div className='wrapper'>
            <div className="window-block">
                <h1 className='window-title'>Скрипты</h1>
                <div className="script-top">
                    <SearchTask />
                </div>

                <div className="script-block">
                    <ScriptNav />
                    <ScriptContent />


                </div>
            </div>
        </div>
    )
}

export default Scripts