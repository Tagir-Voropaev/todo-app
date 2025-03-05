import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import s from './App.module.scss';
import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import { checkAuth } from './store/authSlice'; // Импортируем action для проверки авторизации
import Profile from './components/home/profile/Profile';
import Tasks from './components/home/tasks/Tasks';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    // Восстанавливаем авторизацию при загрузке приложения
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
   
    // Если идет загрузка, показываем индикатор загрузки
    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Router>
            <div className={s.app}>
                <Routes>
                    {/* Если пользователь авторизован, перенаправляем с /auth на / */}
                    <Route
                        path="/auth"
                        element={user ? <Navigate to="/" /> : <Auth />}
                    />
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile />}
                    />
                    <Route
                        path="/tasks"
                        element={<Tasks />}
                    />
                        {/* Если пользователь не авторизован, перенаправляем с / на /auth */}
                    <Route
                        path="/"
                        element={user ? <Home /> : <Navigate to="/auth" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;