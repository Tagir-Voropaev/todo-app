import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import s from './App.module.scss';
import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import { restoreAuth } from './store/authSlice';

function App() {
    const user = useSelector((state: RootState) => state.auth.user);
    const isLoading = useSelector((state: RootState) => state.auth.loading);
    const dispatch = useDispatch<AppDispatch>();
    // Проверяем авторизацию при загрузке приложения

    useEffect(() => {
      dispatch(restoreAuth());
    }, [dispatch]);
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Router>
            <div className={s.app}>
                <Routes>
                    {/* Если пользователь авторизован, перенаправляем на главную страницу */}
                    <Route
                        path="/auth"
                        element={user ? <Navigate to="/" /> : <Auth />}
                    />
                    {/* Главная страница доступна только авторизованным пользователям */}
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