import React, { useState } from 'react'
import "../../../static/css/components/tasks/Tasks.css"
import "../../../static/css/components/tasks/SearchTask.css"
import "../../../static/css/components/tasks/TaskList.css"
import AddTask from './AddTask'
import SearchTask from './SearchTask'
import TaskList from './TaskList'
const Tasks = () => {

    //Стейты
    const [hideAdd, setHideAdd] = useState(false)
    //Показать/скрыть форму добавления задач
    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }
    return (
        <div className="wrapper">
            <div className="window-block">
                <h1 className='window-title'>Задачи</h1>
                <div className="task-top">
                    <SearchTask />
                    <button className='task-button-open' onClick={toggleAdd}>Добавить</button>
                </div>
                <div className="task-hide">
                    {hideAdd && (<AddTask />)}
                </div>
                <div className="tasks">
                    <TaskList />
                </div>
            </div>
        </div>
    )
}

export default Tasks;