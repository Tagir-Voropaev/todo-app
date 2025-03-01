import React, { useState } from 'react';
import s from './Auth.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { loginUser } from '../../store/authSlice'; // Импортируем action для входа

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Вызываем action для входа
            await dispatch(loginUser({ login, password })).unwrap();
            console.log("Успешный вход");
            navigate('/'); // Перенаправляем на главную страницу после успешного входа
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <form className={s.authFormLogin} onSubmit={handleLogin}>
            <input
                id='login'
                onChange={(e) => setLogin(e.target.value)}
                className={s.authInput}
                type="username"
                placeholder="Логин"
                value={login}
            />
            <input
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                className={s.authInput}
                type="password"
                placeholder="Пароль"
                value={password}
            />
            <button type="submit" className={s.authButton}>
                Войти
            </button>
            <div className={s.authLinkBlock}>
                <a className={s.authLink} href="#">
                    Забыли пароль?
                </a>
            </div>
            <div className={s.authSocial}></div>
        </form>
    );
};

export default Login;