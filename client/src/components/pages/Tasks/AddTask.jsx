import React from 'react'
import "../../../static/css/components/tasks/AddTask.css"

export default function AddTask() {
    return (
        <div className="task-add-show">
            <input type="text" className='task-input task-input-text' placeholder='Введите задачу...'/>
            <input type="time" className='task-input task-input-time'/>
            <input type="date" className='task-input task-input-date'/>
            <button className='task-button-add'><i className="fa-solid fa-plus"></i></button>
        </div>
    )
}
