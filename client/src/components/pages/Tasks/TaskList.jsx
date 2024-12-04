import React, { useEffect } from 'react'
import "../../../static/css/components/tasks/TaskList.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../store/tasksSlice'

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.tasks);
    console.log(tasks)
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])
    return (
        <ul className="task-list">
            {tasks.status === 'loaded'
                ? (tasks.items.map(item => {
                    return (
                        <li key={item.id} className='task-elem'>
                            <input type="checkbox" className='task-checkbox' />
                            <p className='task-title'>{item.title}</p>
                            <p className='task-time'>{item.timetask}</p>
                            <p className='task-date'>{item.datetask}</p>
                            <button className='task-edit'><i className="fa-solid fa-pen-to-square"></i></button>
                            <button className='task-delete'><i className="fa-solid fa-trash"></i></button>
                        </li>
                    )
                }))
                : (<h1>Loading...</h1>)
            }

        </ul>
        
    )
}

export default TaskList