import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import s from './App.module.scss';
import Auth from './components/auth/Auth';
import Home from './components/home/Home';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <Router>
            <div className={s.app}>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
                    <Route path="auth" element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
