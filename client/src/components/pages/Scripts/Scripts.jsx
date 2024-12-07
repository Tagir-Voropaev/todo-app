import React, { useState } from 'react'
import SearchTask from '../Tasks/SearchTask'
import AddScript from './AddScript'
import '../../../static/css/components/scripts/Scripts.css'
import '../../../static/css/components/scripts/ScriptList.css'
import '../../../static/css/components/scripts/ScriptNav.css'

const Scripts = () => {
    const [hideAdd, setHideAdd] = useState(false)

    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }
    return (
        <div className='wrapper'>
            <div className="window-block">
                <h1 className='window-title'>Скрипты</h1>
                <div className="script-top">
                    <SearchTask />
                </div>

                <div className="script-block">
                    <div className="script-nav">
                        <ul className="script-nav-list">
                            <li className="script-nav-elem">
                                <p className='script-nav-elem-text'>Вкладка 1</p>
                                <ul className="script-nav-sublist">
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                </ul>
                            </li>
                            <li className="script-nav-elem">
                                <p className='script-nav-elem-text'>Вкладка 1</p>
                                <ul className="script-nav-sublist">
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                </ul>
                            </li>
                            <li className="script-nav-elem">
                                <p className='script-nav-elem-text'>Вкладка 1</p>
                                <ul className="script-nav-sublist">
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                </ul>
                            </li>
                            <li className="script-nav-elem">
                                <p className='script-nav-elem-text'>Вкладка 1</p>
                                <ul className="script-nav-sublist">
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                </ul>
                            </li>
                            <li className="script-nav-elem">
                                <p className='script-nav-elem-text'>Вкладка 1</p>
                                <ul className="script-nav-sublist">
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                    <li className="script-nav-subelem">
                                        <p className='script-nav-subelem-text'>Подвкладка 1</p>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default Scripts