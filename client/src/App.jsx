import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Home from "./components/pages/Home/Home";
import './static/css/main.css'
import Tasks from './components/pages/Tasks/Tasks';
import Scripts from './components/pages/Scripts/Scripts';
import Timetable from './components/pages/Timetable/Timetable';


const App = () => {
    return (
            <div className='App'>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path='/scripts/subtab/' element={<Scripts />} />
                        <Route path='/scripts/subtab/:id' element={<Scripts />} />
                        <Route path='/timetable' element={<Timetable />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;