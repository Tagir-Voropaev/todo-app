import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Home from "./components/pages/Home";
import Tasks from "./components/pages/Tasks";
import Auth from "./components/pages/Auth";
import './static/css/main.css'
import Register from './components/pages/Register';
// import Home from "./components/pages/home/Home"
// import Tasks from "./components/pages/tasks/Tasks"



const App = () => {
    let isAuth = false
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/registration" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;