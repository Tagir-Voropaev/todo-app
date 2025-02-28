import React, { useEffect, useState } from 'react';
import s from './Auth.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';




const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/'); // Перенаправляем на главную страницу, если пользователь авторизован
        }
    }, [user, navigate]);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({ login, password }));
            console.log(resultAction);
            if (loginUser.fulfilled.match(resultAction)) {
                localStorage.setItem('token', resultAction.payload.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${resultAction.payload.token}`;
                navigate('/');
            } else {
                console.error('Ошибка авторизации:', resultAction.payload);
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <form className={s.authFormLogin} onSubmit={handleLogin}>
            {/* login form */}
            <input
                onChange={(e) => setLogin(e.target.value)}
                className={s.authInput}
                type="username"
                placeholder="Логин"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className={s.authInput}
                type="password"
                placeholder="Пароль"
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