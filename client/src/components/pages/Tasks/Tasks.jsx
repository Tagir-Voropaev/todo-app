import React, { useState, useEffect } from 'react'
import "../../../static/css/components/tasks/Tasks.css"
import AddTask from './AddTask'
import SearchTask from './SearchTask'
import TaskList from './TaskList'
import { fetchTasks } from '../../../store/tasksSlice';
import { useDispatch } from 'react-redux'

const Tasks = () => {
    const [hideAdd, setHideAdd] = useState(false)
    const toggleAdd = () => {
        return setHideAdd(s => (!s));
    }

    const dispatch = useDispatch();
    // const { tasks } = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])
    return (
        <div className="wrapper">
            <div className="windows">
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
        </div>

    )
}


export default Tasks;