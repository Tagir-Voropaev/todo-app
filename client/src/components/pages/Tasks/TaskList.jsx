import React, { useEffect, useState } from 'react'
import "../../../static/css/components/tasks/TaskList.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../store/tasksSlice'
import WarningTask from './WarningTask'
const TaskList = () => {

    // Существующие задачи
    const dispatch = useDispatch();
    //Получение задач
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    const { filtered, searchValue } = useSelector(state => state.searchTask);
    const { tasks } = useSelector(state => state.tasks);

    const [hideWarning, setHideWarning] = useState(false)
    const [warningVal, setWarningVal] = useState({})

    const onDeleteButtton = async (value) => {
        setHideWarning(true)
        setWarningVal({ propurl: (`/tasks`), propdata: { data: { id: value.id }, }, hide: setHideWarning, fetchupdate: fetchTasks })

    }

    return (
        <ul className="task-list">
            {hideWarning && <WarningTask warningVal={warningVal} />}
            {tasks.status === 'loaded'
                ? (searchValue
                    ? (filtered.map(item => {
                        return (
                            <li key={item.id} className='task-elem'>
                                <p className='task-title'>{item.title}</p>
                                <p className='task-time'>{item.timetask}</p>
                                <p className='task-date'>{item.datetask}</p>
                                <button className='task-delete' onClick={e => onDeleteButtton(item)}><i className="fa-solid fa-trash"></i></button>
                            </li>
                        )
                    }))
                    : (tasks.items.map(item => {
                        return (
                            <li key={item.id} className='task-elem'>
                                <p className='task-title'>{item.title}</p>
                                <p className='task-time'>{item.timetask}</p>
                                <p className='task-date'>{item.datetask}</p>
                                <button className='task-delete' onClick={e => onDeleteButtton(item)}><i className="fa-solid fa-trash"></i></button>
                            </li>
                        )
                    })))
                : (<h1>Loading...</h1>)
            }
        </ul>
    )
}

export default TaskList