import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Home from "./components/pages/Home";
import './static/css/main.css'
import Tasks from './components/pages/Tasks/Tasks';
import Scripts from './components/pages/Scripts/Scripts';

const App = () => {
    return (
        <div className='App'>
            <Header />
            <div className="content">

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/scripts" element={<Scripts />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;