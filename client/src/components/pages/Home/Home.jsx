import React from 'react'
import "../../../static/css/home.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../store/tasks/tasksSlice';
import { useEffect } from 'react';
import { fetchAllScripts } from '../../../store/scripts/allScriptsSlice'; // Добавить импорт
import { Link } from 'react-router-dom';
import { fetchAllLessons } from '../../../store/timetable/allLessonsSlice';
const Home = () => {

    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.tasks);
    const { allscripts } = useSelector(state => state.allscripts); // Добавить селектор
    const { items } = useSelector(state => state.allLessons);
    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchAllScripts()); // Добавить загрузку шаблонов
        dispatch(fetchAllLessons());
    }, [dispatch]);

    console.log(items)

    const getTodayLessons = () => {
        const today = new Date();
        const dayOfWeek = today.getDay() || 7;
    
        // Проверяем загружены ли данные и есть ли занятия на сегодня
        if (items && items.length >= 0) {
            const todayLessons = items.filter(lesson =>
                lesson.dayOfWeek === dayOfWeek
            );
    
            // Если нет занятий на сегодня
            if (todayLessons.length === 0) {
                return <div className="no-lessons">Нет занятий на сегодня</div>;
            }
    
            return todayLessons
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map(lesson => (
                    <div key={lesson.id} className="timeline-item">
                        <div className="timeline-content">
                            <h4>{lesson.GroupModel?.SchoolModel?.name}</h4>
                            <p>{lesson.GroupModel?.name}</p>
                        </div>
                        <span className="timeline-room">Кабинет: {lesson.room}</span>
                        <div className="timeline-time">
                            <span>{lesson.startTime} - {lesson.endTime}</span>
                        </div>
                    </div>
                ));
        }
        return <div className="loading">Загрузка...</div>;
    };

    // Обновим также функцию подсчета количества занятий
    const getTodayLessonsCount = () => {
        if (items.length > 0) {
            const today = new Date();
            const dayOfWeek = today.getDay() || 7;
            return items.filter(lesson => lesson.dayOfWeek === dayOfWeek).length;
        }
        return '-';
    };

    const getRecentTemplates = () => {
        if (allscripts.length > 0) {
            return allscripts
                .slice()
                .slice(0, 4) // Берем последние 4 шаблона
                .map(script => (
                    <li key={script.id} className="preview-task-item">
                        <div className="preview-task-content">
                            <h4 className="preview-task-title">{script.text}</h4>
                            <div className="preview-task-details">
                                <span className="preview-task-time">{script.type}</span>
                            </div>
                        </div>
                    </li>
                ));
        }
        return <li className="no-tasks">Нет шаблонов</li>;
    };

    const getRecentTasks = () => {
        if (tasks.status === 'loaded' && tasks.items.length > 0) {
            return tasks.items
                .slice() // Создаем копию массива, чтобы не мутировать оригинал
                .sort((a, b) => {
                    // Преобразуем строки даты в объекты Date для сравнения
                    const [dayA, monthA, yearA] = a.datetask.split('.').map(Number);
                    const [hoursA, minutesA] = a.timetask.split(':').map(Number);
                    const dateA = new Date(yearA, monthA - 1, dayA, hoursA, minutesA);

                    const [dayB, monthB, yearB] = b.datetask.split('.').map(Number);
                    const [hoursB, minutesB] = b.timetask.split(':').map(Number);
                    const dateB = new Date(yearB, monthB - 1, dayB, hoursB, minutesB);

                    // Получаем текущую дату
                    const now = new Date();

                    // Вычисляем разницу между датами задач и текущей датой
                    const diffA = Math.abs(dateA - now);
                    const diffB = Math.abs(dateB - now);

                    // Сортируем по возрастанию разницы (ближайшие даты будут первыми)
                    return diffA - diffB;
                })
                .slice(0, 4) // Берем первые 4 задачи
                .map(task => (
                    <li key={task.id} className="preview-task-item">
                        <div className="preview-task-content">
                            <h4 className="preview-task-title">{task.title}</h4>
                            <div className="preview-task-details">
                                <span className="preview-task-time">{task.timetask}</span>
                                <span className="preview-task-date">{task.datetask}</span>
                            </div>
                        </div>
                    </li>
                ));
        }
        return <li className="no-tasks">Нет активных задач</li>;
    };

    return (
        <div className="wrapper">
            <div className="dashboard-container">
                {/* Блок статистики */}
                <section className="stats-section">
                    <div className="stat-card">
                        <h3>Активные задачи</h3>
                        <p className="stat-number">
                            {tasks.status === 'loaded' ? tasks.items.length : '-'}
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Шаблоны</h3>
                        <p className="stat-number">
                            {allscripts.length > 0 ? allscripts.length : '-'}
                        </p>
                    </div>

                    <div className="stat-card">
                        <h3>Занятия сегодня</h3>
                        <p className="stat-number">{getTodayLessonsCount()}</p>
                    </div>
                </section>

                {/* Блок с последними задачами */}
                <section className="quick-access-grid">
                    <div className="tasks-preview panel">
                        <div className="panel-header">
                            <h2>Последние задачи</h2>
                            <Link to="/tasks" className="view-all">Все задачи →</Link>
                        </div>
                        <ul className="preview-list">
                            {tasks.status === 'loading' ? (
                                <li className="loading">Загрузка...</li>
                            ) : (
                                getRecentTasks()
                            )}
                        </ul>
                    </div>

                    {/* Блок с шаблонами */}
                    <div className="templates-preview panel">
                        <div className="panel-header">
                            <h2>Шаблоны рассылок</h2>
                            <Link to="/scripts/subtab/" className="view-all">Все шаблоны →</Link>
                        </div>
                        <ul className="preview-list">
                            {allscripts.status === 'loading' ? (
                                <li className="loading">Загрузка...</li>
                            ) : (
                                getRecentTemplates()
                            )}
                        </ul>
                    </div>

                    {/* Расписание на сегодня */}
                    <div className="schedule-preview panel">
                        <div className="panel-header">
                            <h2>Расписание на сегодня</h2>
                            <Link to="/timetable" className="view-all">Полное расписание →</Link>
                        </div>
                        <div className="timeline">
                            {getTodayLessons()}
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default Home;