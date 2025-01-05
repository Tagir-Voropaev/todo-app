import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Nav from "./components/Nav"
import Home from "./components/pages/Home/Home";
import s from './App.module.scss'
import Tasks from './components/pages/Tasks/Tasks';
import Scripts from './components/pages/Scripts/Scripts';
import Timetable from './components/pages/Timetable/Timetable';
import Header from './components/Header';

const App = () => {
    const location = useLocation();
    console.log(location.pathname)
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

    console.log(getHeaderText())

    return (
        <div className={s.App}>
            <header className={s.header}>
                <Header text={getHeaderText()} />
            </header>
            <aside className={s.aside}>
                <Nav />
            </aside>
            <main className={s.content}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path='/scripts/subtab/' element={<Scripts />} />
                    <Route path='/scripts/subtab/:id' element={<Scripts />} />
                    <Route path='/timetable' element={<Timetable />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;