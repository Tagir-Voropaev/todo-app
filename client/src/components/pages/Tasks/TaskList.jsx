import React, { useEffect, useCallback, useMemo } from 'react'
import "../../../static/css/components/tasks/TaskList.css"
import "../../../static/css/components/tasks/TaskSort.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks } from '../../../store/tasks/tasksSlice'
import axios from '../../../axios'
import Warning from '../../Warning'

const TaskList = () => {
    const dispatch = useDispatch();
    const { filtered, searchValue } = useSelector(state => state.searchTask);
    const { tasks } = useSelector(state => state.tasks);
    const [sortedTasks, setSortedTasks] = React.useState([]);
    const [sortConfig, setSortConfig] = React.useState({
        field: null,
        direction: 'asc'
    });
    const [warningState, setWarningState] = React.useState({
        show: false,
        itemToDelete: null
    });

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    useEffect(() => {
        if (searchValue) {
            setSortedTasks(filtered);
        } else if (tasks.status === 'loaded') {
            setSortedTasks(tasks.items);
        }
    }, [tasks, filtered, searchValue]);

    const handleScriptDelete = useCallback(async () => {
        if (warningState.itemToDelete) {
            await axios.delete('/tasks', { 
                data: { id: warningState.itemToDelete.id } 
            });
            setWarningState({ show: false, itemToDelete: null });
            dispatch(fetchTasks());
        }
    }, [warningState.itemToDelete, dispatch]);

    const handleSort = useCallback((field) => {
        const direction = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ field, direction });

        const sortFunctions = {
            title: (a, b) => direction === 'asc' 
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title),
            time: (a, b) => {
                const [hoursA, minsA] = a.timetask.split(':').map(Number);
                const [hoursB, minsB] = b.timetask.split(':').map(Number);
                const timeCompare = hoursA === hoursB ? minsA - minsB : hoursA - hoursB;
                return direction === 'asc' ? timeCompare : -timeCompare;
            },
            date: (a, b) => {
                const dateA = new Date(a.datetask.split('.').reverse().join('-'));
                const dateB = new Date(b.datetask.split('.').reverse().join('-'));
                return direction === 'asc' ? dateA - dateB : dateB - dateA;
            }
        };

        setSortedTasks(prev => [...prev].sort(sortFunctions[field]));
    }, [sortConfig]);

    const getSortArrow = useCallback((field) => 
        sortConfig.field === field ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : '', 
    [sortConfig]);

    const sortButtons = useMemo(() => (
        <div className="tasks-sort-controls">
            {['title', 'time', 'date'].map(field => (
                <button 
                    key={field}
                    className={`sort-button ${sortConfig.field === field ? 'active' : ''}`}
                    onClick={() => handleSort(field)}
                >
                    {field === 'title' ? 'Имя' : field === 'time' ? 'Время' : 'Дата'}
                    {getSortArrow(field)}
                </button>
            ))}
        </div>
    ), [sortConfig, handleSort, getSortArrow]);

    const taskItems = useMemo(() => 
        tasks.status === 'loaded' && sortedTasks.map(item => (
            <li key={item.id} className="task-item">
                <div className="task-content">
                    <h3 className="task-title">{item.title}</h3>
                </div>
                <span className="task-time">{item.timetask}</span>
                <span className="task-date">{item.datetask}</span>
                <button 
                    className="delete-button"
                    onClick={() => setWarningState({ show: true, itemToDelete: item })}
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </li>
        )),
    [sortedTasks, tasks.status]);

    return (
        <div className="tasks-container">
            <header className="tasks-header">
                {sortButtons}
            </header>
            <ul className="tasks-list">
                {warningState.show && (
                    <Warning
                        message="Вы действительно хотите удалить эту задачу?"
                        onConfirm={handleScriptDelete}
                        onCancel={() => setWarningState({ show: false, itemToDelete: null })}
                    />
                )}
                {tasks.status === 'loaded' ? taskItems : <h1>Loading...</h1>}
            </ul>
        </div>
    );
};

export default React.memo(TaskList);