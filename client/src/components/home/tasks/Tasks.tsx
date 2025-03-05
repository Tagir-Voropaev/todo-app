import React, { useEffect, useState } from 'react';
import s from './Tasks.module.scss';
import Header from '../header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { fetchTasks } from '../../../store/taskSlice';

const Tasks = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector((state: RootState) => state.task); // Получаем список задач из стора
    const [openTaskId, setOpenTaskId] = useState<number | null>(null); // Состояние для отслеживания открытой задачи

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Обработчик клика по задаче
    const handleTaskClick = (taskId: number) => {
        setOpenTaskId(openTaskId === taskId ? null : taskId); // Если задача уже открыта, закрываем её, иначе открываем
    };

    // Если данные загружаются
    if (loading) {
        return <div className={s.tasks}>Загрузка задач...</div>;
    }

    // Если произошла ошибка
    if (error) {
        return <div className={s.tasks}>Ошибка: {error}</div>;
    }

    return (
        <div className={s.tasks}>
            <Header />
            <p className={s.mainTasksTitle}>Основные задачи</p>
            <ul className={s.tasksBlock}>
                <div className={s.taskMainBlock}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`${s.taskItem} ${openTaskId === task.id ? s.taskItemOpen : ''}`}
                            onClick={() => handleTaskClick(task.id)} // Обработчик клика по задаче
                        >
                            <h3 className={s.taskTitle}>{task.title}</h3>
                            <p className={s.taskDescription}>{task.description}</p>

                        </li>
                    ))}
                </div>
                <div className={s.taskDetailsBlock}>
                    {tasks.map((task) => (
                         openTaskId === task.id && ( // Показываем подробности, если задача открыта
                            <div className={s.taskDetails}>
                                <p>Статус: {task.status}</p>
                                <p>Приоритет: {task.priority}</p>
                                <p>Клуб: {task.club}</p>
                                <p>Дата создания: {new Date(task.createdAt).toLocaleDateString()}</p>
                                <p>Дата обновления: {new Date(task.updatedAt).toLocaleDateString()}</p>
                            </div>
                        )
                        
                    ))}
                </div>
            </ul>
            <button className={s.createTaskButton}>
                <i className={`fa-solid fa-plus`}></i>
            </button>
        </div>
    );
};

export default Tasks;