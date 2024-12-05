import React, { useState, useEffect } from 'react'
import "../../../static/css/components/tasks/Tasks.css"
import "../../../static/css/components/tasks/SearchTask.css"
import "../../../static/css/components/tasks/TaskList.css"

import AddTask from './AddTask'
// import TaskList from './TaskList'
import axios from '../../../axios'
import { fetchTasks } from '../../../store/tasksSlice';
import { useDispatch, useSelector } from 'react-redux'

const Tasks = () => {

    //Получение списка задач
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.tasks);
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])
    
    //Стейты
    const [hideAdd, setHideAdd] = useState(false)
    const [searchValue, setSearchValue] = useState('')


    //Показать/скрыть форму добавления задач
    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }
    
    //Кнопка удаления задачи
    const onDeleteButtton = async (value) => {
        await axios.delete('/tasks', { data: { id: value.id }, })
        dispatch(fetchTasks())
    }

    //Поиск задач
    console.log(tasks)
    const filteredTasks = tasks.items.filter(task => {
        return task.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    })

    return (
        <div className="wrapper">
            <div className="windows">
                <div className="window-block">
                    <h1 className='window-title'>Задачи</h1>
                    <div className="task-top">

                        <div className="task-search-show">
                            <input onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder='Поиск...' />
                        </div>

                        <button className='task-button-open' onClick={toggleAdd}>Добавить</button>
                    </div>
                    <div className="task-hide">
                        {hideAdd && (<AddTask />)}
                    </div>
                    <div className="tasks">
                        <ul className="task-list">
                            {tasks.status === 'loaded'
                                ? (filteredTasks.map(item => {
                                    return (
                                        <li key={item.id} className='task-elem'>
                                            <p className='task-title'>{item.title}</p>
                                            <p className='task-time'>{item.timetask}</p>
                                            <p className='task-date'>{item.datetask}</p>
                                            <button className='task-delete' onClick={e => onDeleteButtton(item)}><i className="fa-solid fa-trash"></i></button>
                                        </li>
                                    )
                                }))
                                : (<h1>Loading...</h1>)
                            }

                        </ul>
                        {/* <TaskList /> */}
                    </div>

                </div>
            </div>
        </div>

    )
}


export default Tasks;