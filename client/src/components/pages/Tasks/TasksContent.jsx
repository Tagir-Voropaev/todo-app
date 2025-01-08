import React, { useState } from 'react'
import s from '../../../static/css/components/tasks/tasksContent.module.scss'
const TasksContent = () => {
    const tasksCategory1 = ['Задача 1', 'Задача 2', 'Задача 3', 'Задача 4', 'Задача 5'];
    const [taskDetails, setTaskDetails] = useState(tasksCategory1[0]);
    return (
        <div className={s.tasksContent}>
            <div className={s.taskList}>
                {tasksCategory1.map((task, index) => (
                    <button key={index} className={s.taskItem}>
                        <p>{task}</p>

                    </button>
                ))}
            </div>
            <div className={s.taskDetails}>
                <p>{taskDetails}</p>
            </div>
        </div>
    )
}

export default TasksContent