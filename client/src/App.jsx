import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Nav from "./components/Nav"
import Home from "./components/pages/Home/Home";
import s from './App.module.scss'
import Tasks from './components/pages/Tasks/Tasks';
import Scripts from './components/pages/Scripts/Scripts';
import Timetable from './components/pages/Timetable/Timetable';
import Header from './components/Header';
import Auth from './components/pages/Auth/Auth';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const isAuthenticated = false;

    const location = useLocation();
    const getHeaderText = () => {
        let pageText = 'Главная';
        let searchText = 'Поиск';
        switch (location.pathname) {
            case '/':
                return [pageText, searchText];
            case '/tasks':
                pageText = 'Задачи';
                searchText = 'Поиск задач';
                return [pageText, searchText];

            case '/scripts/subtab/':
                pageText = 'Скрипты';
                searchText = 'Поиск скриптов';
                return [pageText, searchText];

            case '/timetable':
                pageText = 'Расписание';
                searchText = 'Поиск школы, группы, занятия';
                return [pageText, searchText];
            default:
                return 'Неизвестный маршрут'; // Текст по умолчанию для всех других маршрутов
        }

    };

    return (

        <div className={s.App}>
            {/* Если пользователь не авторизован, перенаправляем на страницу авторизации */}
            {!isAuthenticated &&
                (
                    <>
                        <Navigate to='/login' />
                        <Routes>
                            <Route path='/login' element={<Auth />} />
                        </Routes>
                    </>
                )
            }
            {isAuthenticated &&
                (
                    <>
                        <header className={s.header}>
                            <Header text={getHeaderText()} />
                        </header>
                        <aside className={s.aside}>
                            <Nav />
                        </aside>
                        <main className={s.content}>
                            <Routes>
                                <Route path="/" element={<ProtectedRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
                                <Route path="/tasks" element={<ProtectedRoute element={<Tasks />} isAuthenticated={isAuthenticated} />} />
                                <Route path='/scripts/subtab/' element={<ProtectedRoute element={<Scripts />} isAuthenticated={isAuthenticated} />} />
                                <Route path='/scripts/subtab/:id' element={<ProtectedRoute element={<Scripts />} isAuthenticated={isAuthenticated} />} />
                                <Route path='/timetable' element={<ProtectedRoute element={<Timetable />} isAuthenticated={isAuthenticated} />} />
                            </Routes>
                        </main>
                    </>
                )
            }

        </div>
    );
}

export default App;