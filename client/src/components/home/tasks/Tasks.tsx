import React, { useState } from 'react'
import s from './Tasks.module.scss'
const Tasks = () => {
    // <i className="fa-solid fa-sort"></i>
    // <i className="fa-solid fa-sort-up"></i>
    // <i className="fa-solid fa-sort-down"></i>
    interface SortOrder {
        title: 'asc' | 'desc' | null;
        status: 'asc' | 'desc' | null;
        date: 'asc' | 'desc' | null;
        time: 'asc' | 'desc' | null;
        priority: 'asc' | 'desc' | null;
    }
    const [sortOrder, setSortOrder] = useState<SortOrder>({
        title: null,
        status: null,
        date: null,
        time: null,
        priority: null,
    });

    const [activeSortKey, setActiveSortKey] = useState<keyof SortOrder | null>(null)

    // Обработчик клика для сортировки
    const handleSort = (key: keyof SortOrder) => {
        setSortOrder((prev) => {
            const newOrder = prev[key] === 'asc' ? 'desc' : 'asc';
            const resetOrder = Object.keys(prev).reduce((acc, curr) => {
                acc[curr as keyof SortOrder] = curr === key ? newOrder : null;
                return acc;
            }, {} as SortOrder);
            return resetOrder;
        });
        setActiveSortKey(key);
    };


    const renderSortIcon = (key: keyof SortOrder) => {
        if (activeSortKey === key) {
            return sortOrder[key] === 'asc'
                ? <i className="fa-solid fa-sort-up"></i>
                : <i className="fa-solid fa-sort-down"></i>;
        }
        return <i className="fa-solid fa-sort"></i>; // Иконка по умолчанию
    };


    interface Task {
        id: number;
        title: string;
        status: string;
        date: string;
        time: string;
        priority: string;
    }
    const tasks: Task[] = [
        { id: 1, title: 'Протереть столы', status: 'В процессе', date: '01.01.2022', time: '10:00', priority: 'Высокий' },
        { id: 2, title: 'Сделать уборку', status: 'Завершено', date: '02.01.2022', time: '11:00', priority: 'Низкий' },
        { id: 3, title: 'Купить продукты', status: 'Не начато', date: '03.01.2022', time: '12:00', priority: 'Средний' },
        { id: 4, title: 'Сделать обход', status: 'Не начато', date: '03.01.2022', time: '12:00', priority: 'Средний' },
        { id: 5, title: 'Почистить компы', status: 'Не начато', date: '03.01.2022', time: '12:00', priority: 'Средний' },
        { id: 6, title: 'Пересчитать кассу', status: 'Не начато', date: '03.01.2022', time: '12:00', priority: 'Средний' },
        // Добавьте больше задач по мере необходимости
    ];

    return (
        <div className={s.tasks}>
            <ul className={s.sortBlocks}>
                <li className={s.sortButton} onClick={() => handleSort('title')}>
                    <p>Название</p>
                    {renderSortIcon('title')}
                </li>
                <li className={s.sortButton} onClick={() => handleSort('status')}>
                    <p>Статус</p>
                    {renderSortIcon('status')}
                </li>
                <li className={s.sortButton} onClick={() => handleSort('date')}>
                    <p>Дата</p>
                    {renderSortIcon('date')}
                </li>
                <li className={s.sortButton} onClick={() => handleSort('time')}>
                    <p>Время</p>
                    {renderSortIcon('time')}
                </li>
                <li className={s.sortButton} onClick={() => handleSort('priority')}>
                    <p>Приоритет</p>
                    {renderSortIcon('priority')}
                </li>
            </ul>
            <ul className={s.tasksBlock}>
            {tasks.map(task => (
                    <li key={task.id} className={s.tasksItem}>
                        <p className={s.tasksTitle}>{task.title}</p>
                        <div className={s.tasksStatus}>
                            <span>{task.status}</span>
                        </div>
                        <div className={s.tasksDate}>{task.date}</div>
                        <div className={s.tasksTime}>{task.time}</div>
                        <div className={s.tasksPriority}>{task.priority}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tasks