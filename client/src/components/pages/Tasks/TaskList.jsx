import React, { useEffect, useState } from 'react'
import "../../../static/css/components/tasks/TaskList.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../store/tasks/tasksSlice'
import axios from '../../../axios'
import Warning from '../../Warning'
import "../../../static/css/components/tasks/TaskSort.css"
const TaskList = () => {

    // Существующие задачи
    const dispatch = useDispatch();
    //Получение задач
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])
    const { filtered, searchValue } = useSelector(state => state.searchTask);
    const { tasks } = useSelector(state => state.tasks);

    useEffect(() => {
        if (searchValue) {
            setSortedTasks(filtered)
        } else if (tasks.status === 'loaded') {
            setSortedTasks(tasks.items)
        }
    }, [tasks, filtered, searchValue])


    const [sortedTasks, setSortedTasks] = useState([])
    const [sortConfig, setSortConfig] = useState({
        field: null,
        direction: 'asc'
    })

    const [hideWarning, setHideWarning] = useState(false)
    const [item, setItem] = useState({})
    const hideWarningHandler = async (value) => {
        setHideWarning(false)
    }
    const handleScriptDelete = async () => {
        await axios.delete((`/tasks`), { data: { id: item.id }, })
        setHideWarning(false)
        dispatch(fetchTasks())

    }
    const onDeleteButtton = async (value) => {
        setHideWarning(true)
        setItem(value)

    }

    // Общая функция сортировки
    const handleSort = (field) => {
        let direction = 'asc';
        if (sortConfig.field === field && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ field, direction });

        const sorted = [...sortedTasks].sort((a, b) => {
            if (field === 'title') {
                return direction === 'asc' 
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            
            if (field === 'time') {
                const timeA = a.timetask.split(':').map(Number);
                const timeB = b.timetask.split(':').map(Number);
                
                if (timeA[0] === timeB[0]) {
                    return direction === 'asc' 
                        ? timeA[1] - timeB[1] 
                        : timeB[1] - timeA[1];
                }
                return direction === 'asc' 
                    ? timeA[0] - timeB[0] 
                    : timeB[0] - timeA[0];
            }
            
            if (field === 'date') {
                const dateA = new Date(a.datetask.split('.').reverse().join('-'));
                const dateB = new Date(b.datetask.split('.').reverse().join('-'));
                return direction === 'asc' 
                    ? dateA - dateB 
                    : dateB - dateA;
            }
            return 0;
        });
        
        setSortedTasks(sorted);
    }


    // Получаем стрелку для кнопки сортировки
    const getSortArrow = (field) => {
        if (sortConfig.field === field) {
            return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    }
    
     return (
        <>
            <div className="task-header">
                <div className="task-header-block">
                    <button 
                        className={`task-sort-btn ${sortConfig.field === 'title' ? 'active' : ''}`}
                        onClick={() => handleSort('title')}
                    >
                        Имя{getSortArrow('title')}
                    </button>
                    <button 
                        className={`task-sort-btn ${sortConfig.field === 'time' ? 'active' : ''}`}
                        onClick={() => handleSort('time')}
                    >
                        Время{getSortArrow('time')}
                    </button>
                    <button 
                        className={`task-sort-btn ${sortConfig.field === 'date' ? 'active' : ''}`}
                        onClick={() => handleSort('date')}
                    >
                        Дата{getSortArrow('date')}
                    </button>
                </div>
            </div>

            <ul className="task-list">
                {hideWarning && <Warning
                    message={"Вы действительно хотите удалить эту задачу?"}
                    onConfirm={handleScriptDelete}
                    onCancel={hideWarningHandler}
                />}
                {tasks.status === 'loaded'
                    ? sortedTasks.map(item => (
                        <li key={item.id} className='task-elem'>
                            <p className='task-title'>{item.title}</p>
                            <p className='task-time'>{item.timetask}</p>
                            <p className='task-date'>{item.datetask}</p>
                            <button className='task-delete' onClick={e => onDeleteButtton(item)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    ))
                    : (<h1>Loading...</h1>)
                }
            </ul>
        </>
    )
}

export default TaskList