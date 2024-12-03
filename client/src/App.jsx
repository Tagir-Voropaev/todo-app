import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header"
import Home from "./components/pages/Home";
import Tasks from "./components/pages/Tasks";
import Auth from "./components/pages/Auth";
import './static/css/main.css'
import Register from './components/pages/Register';



const App = () => {
    return (
        <>
            <Header />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Auth />} />
                <Route path="/auth/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;